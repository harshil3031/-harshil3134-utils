'use strict';

// src/misc/generateUUID.ts
function generateUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === "x" ? r : r & 3 | 8;
    return v.toString(16);
  });
}

// src/misc/formatBytes.ts
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// src/misc/randomBetween.ts
function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// src/misc/copyToClipboard.ts
async function copyToClipboard(text) {
  var _a;
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }
  try {
    if ((_a = navigator == null ? void 0 : navigator.clipboard) == null ? void 0 : _a.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch (e) {
    return false;
  }
}

// src/misc/clamp.ts
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

exports.clamp = clamp;
exports.copyToClipboard = copyToClipboard;
exports.formatBytes = formatBytes;
exports.generateUUID = generateUUID;
exports.randomBetween = randomBetween;
//# sourceMappingURL=misc.js.map
//# sourceMappingURL=misc.js.map