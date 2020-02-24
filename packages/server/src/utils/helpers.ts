export const cleanText = string => {
  return string
    .toLowerCase()
    .replace(/<[^>]+>/gm, "")
    .replace(/[0-9]/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\'\w*|\–|\.|\,/g, "");
};
