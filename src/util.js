import base62 from "base62";

export const encodeUrl = (id) => {
  const encoding = base62.encode(id);
  return encoding;
};

export const validateUrl = (urlString) => {
  // Taken from: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  let url;

  try {
    url = new URL(urlString);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
