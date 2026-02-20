export function isToday(date: Date | string | number): boolean {
  const d = new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }

  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}
