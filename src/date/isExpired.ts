export function isExpired(date: Date | string | number): boolean {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  return d.getTime() < Date.now();
}
