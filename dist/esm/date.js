// src/date/formatDate.ts
function formatDate(date, format = "YYYY-MM-DD") {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");
  return format.replace("YYYY", String(year)).replace("MM", month).replace("DD", day).replace("HH", hours).replace("mm", minutes).replace("ss", seconds);
}

// src/date/timeAgo.ts
function timeAgo(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const now = Date.now();
  const diff = now - d.getTime();
  const isFuture = diff < 0;
  const absDiff = Math.abs(diff);
  const seconds = Math.floor(absDiff / 1e3);
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

// src/date/isExpired.ts
function isExpired(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  return d.getTime() < Date.now();
}

// src/date/addDays.ts
function addDays(date, days) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setDate(d.getDate() + days);
  return d;
}

// src/date/diffInDays.ts
function diffInDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    throw new Error("Invalid date");
  }
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return Math.floor(diff / (1e3 * 60 * 60 * 24));
}

// src/date/isToday.ts
function isToday(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  const today = /* @__PURE__ */ new Date();
  return d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
}

// src/date/startOfDay.ts
function startOfDay(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setHours(0, 0, 0, 0);
  return d;
}

// src/date/endOfDay.ts
function endOfDay(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    throw new Error("Invalid date");
  }
  d.setHours(23, 59, 59, 999);
  return d;
}

export { addDays, diffInDays, endOfDay, formatDate, isExpired, isToday, startOfDay, timeAgo };
//# sourceMappingURL=date.js.map
//# sourceMappingURL=date.js.map