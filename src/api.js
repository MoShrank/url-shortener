import { db } from "./firebase";
import {
  collection,
  doc,
  runTransaction,
  query,
  where,
  getDocs,
  limit,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { encodeUrl } from "./util";

export const checkIfUrlExists = async (url) => {
  const ref = query(collection(db, "urls"), where("url", "==", url), limit(1));

  const snap = await getDocs(ref);
  return snap.docs.length;
};

export const createShortUrl = async (url) => {
  const statsRef = doc(db, "url_stats", "stats");

  const shortUrl = await runTransaction(db, async (transaction) => {
    const stats = await transaction.get(statsRef);

    const currentId = stats.data().urlsCount;

    const shortUrl = encodeUrl(currentId);

    const ref = doc(collection(db, "urls"));
    transaction.set(ref, {
      number_id: currentId,
      url: url,
      shortUrl: shortUrl,
      tsCreatedAt: serverTimestamp(),
      visitedCount: 0,
      shortenedCount: 0,
    });

    transaction.update(statsRef, {
      urlsCount: currentId + 1,
    });

    return shortUrl;
  });

  return shortUrl;
};

const increaseShortenedCount = async (id) => {
  const urlRef = doc(db, "urls", id);

  await runTransaction(db, async (transaction) => {
    const stats = await transaction.get(urlRef);

    const currentCount = stats.data().shortenedCount;
    transaction.update(urlRef, {
      shortenedCount: currentCount + 1,
    });
  });
};

const increaseVisitedCount = async (id) => {
  const urlRef = doc(db, "urls", id);

  await runTransaction(db, async (transaction) => {
    const stats = await transaction.get(urlRef);

    const currentCount = stats.data().visitedCount;
    transaction.update(urlRef, {
      visitedCount: currentCount + 1,
    });
  });
};

export const getShortUrl = async (url) => {
  const ref = query(collection(db, "urls"), where("url", "==", url), limit(1));

  const snap = await getDocs(ref);

  /* 
    tracking should probably be moved if function is used elsewhere
    than home.js
  */
  await increaseShortenedCount(snap.docs[0].id);
  return snap.docs[0].data().shortUrl;
};

export const getUrl = async (shortUrl) => {
  const ref = query(
    collection(db, "urls"),
    where("shortUrl", "==", shortUrl),
    limit(1)
  );

  const snap = await getDocs(ref);
  await increaseVisitedCount(snap.docs[0].id);
  return snap.docs[0].data().url;
};

export const getTopNUrlsByVisits = (updateFunc, numberOfUrls = 5) => {
  const ref = query(
    collection(db, "urls"),
    orderBy("visitedCount"),
    limit(numberOfUrls)
  );

  return onSnapshot(ref, (querySnapshot) => {
    const stats = querySnapshot.docs.map((doc) => doc.data());
    updateFunc(stats);
  });
};
