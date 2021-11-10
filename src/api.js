import { db } from "./firebase";
import {
  collection,
  doc,
  runTransaction,
  query,
  where,
  getDocs,
  limit,
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
      number_id: currentId + 1,
      url: url,
      shortUrl: shortUrl,
    });

    transaction.update(statsRef, {
      urlsCount: currentId + 1,
    });

    return shortUrl;
  });

  return shortUrl;
};

export const getShortUrl = async (url) => {
  const ref = query(collection(db, "urls"), where("url", "==", url), limit(1));

  const snap = await getDocs(ref);
  return snap.docs[0].data().shortUrl;
};

export const getUrl = async (shortUrl) => {
  const ref = query(
    collection(db, "urls"),
    where("shortUrl", "==", shortUrl),
    limit(1)
  );

  const snap = await getDocs(ref);
  return snap.docs[0].data().url;
};
