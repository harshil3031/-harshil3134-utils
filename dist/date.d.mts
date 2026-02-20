declare function formatDate(date: Date | string | number, format?: string): string;

declare function timeAgo(date: Date | string | number): string;

declare function isExpired(date: Date | string | number): boolean;

declare function addDays(date: Date | string | number, days: number): Date;

declare function diffInDays(date1: Date | string | number, date2: Date | string | number): number;

declare function isToday(date: Date | string | number): boolean;

declare function startOfDay(date: Date | string | number): Date;

declare function endOfDay(date: Date | string | number): Date;

export { addDays, diffInDays, endOfDay, formatDate, isExpired, isToday, startOfDay, timeAgo };
