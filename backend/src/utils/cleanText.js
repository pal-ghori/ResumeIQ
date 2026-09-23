export function cleanText(text) {
  return text
    .toLowerCase()
    .replace(/\r/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}