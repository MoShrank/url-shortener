import base62 from "base62";

export const encodeUrl = (id) => {
  const encoding = base62.encode(id);
  const paddedEncoding = padShortUrl(encoding);
  return paddedEncoding;
};

export const padShortUrl = (shortUrl) => {
  if (shortUrl.length < 6) {
    shortUrl = shortUrl.padEnd(6, "0");
  }

  return shortUrl;
};

export const validateUrl = (urlString) => {
  // Taken from: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  if (!url.protocol === "http:" && !url.protocol === "https:") return false;

  return url.hostname !== "moritz.dev";
};

const timeout = async (timeoutVal) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeoutVal);
  });
};

export const transformUrl = async (
  from,
  to,
  stateCallbackText,
  changeViewCallback
) => {
  const maxTime = 500;

  let idx = from.length;
  while (idx > 0) {
    await timeout(maxTime / from.length);
    stateCallbackText(from.substring(0, idx));
    idx--;
  }
  changeViewCallback();

  idx = 0;

  while (idx <= to.length) {
    await timeout(maxTime / to.length);
    stateCallbackText(to.substring(0, idx));
    idx++;
  }
};
