export function addDays(date: Date | string | number, days: number): Date {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  d.setDate(d.getDate() + days);
  return d;
}
