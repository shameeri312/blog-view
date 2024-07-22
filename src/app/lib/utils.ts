export function getFirst20Words(text: string): string {
  const words = text.split(" ");
  const first20Words = words.slice(0, 10);
  return first20Words.join(" ") + (words.length > 20 ? "..." : "");
}
export function getFirst5Words(text: string): string {
  const words = text.split(" ");
  const first20Words = words.slice(0, 5);
  return first20Words.join(" ") + (words.length > 20 ? "..." : "");
}
