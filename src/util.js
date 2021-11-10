import base62 from "base62";

export const encodeUrl = (id) => {
  const encoding = base62.encode(id);
  return encoding;
};
