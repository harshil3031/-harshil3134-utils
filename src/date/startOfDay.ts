export function startOfDay(date: Date | string | number): Date {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  d.setHours(0, 0, 0, 0);
  return d;
}
