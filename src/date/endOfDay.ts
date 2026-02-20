export function endOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  d.setHours(23, 59, 59, 999);
  return d;
}
