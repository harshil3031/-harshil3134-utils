export function timeAgo(date: Date | string | number): string {
  const d = new Date(date);

  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  const now = Date.now();
  const diff = now - d.getTime();
  const isFuture = diff < 0;
  const absDiff = Math.abs(diff);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return isFuture ? "in a few seconds" : "just now";

  const suffix = isFuture ? "" : " ago";
  const prefix = isFuture ? "in " : "";

  if (minutes < 60) return `${prefix}${minutes} minute${minutes > 1 ? "s" : ""}${suffix}`;
  if (hours < 24) return `${prefix}${hours} hour${hours > 1 ? "s" : ""}${suffix}`;
  if (days < 30) return `${prefix}${days} day${days > 1 ? "s" : ""}${suffix}`;
  if (months < 12) return `${prefix}${months} month${months > 1 ? "s" : ""}${suffix}`;
  return `${prefix}${years} year${years > 1 ? "s" : ""}${suffix}`;
}
