import { format } from "date-fns";

export function getFirst20Words(text: string): string {
  const words = text.split(" ");
  const first20Words = words.slice(0, 10);
  return first20Words.join(" ") + (words.length > 20 ? "..." : "");
}
