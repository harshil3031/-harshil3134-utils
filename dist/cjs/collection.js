'use strict';

// src/collection/index.ts
function chunk(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
function sample(array) {
  if (array.length === 0) return void 0;
  return array[Math.floor(Math.random() * array.length)];
}
function shuffle(array) {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function range(start, end, step = 1) {
  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}
function unique(array, by) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const value = by ? by(item) : item;
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

exports.chunk = chunk;
exports.range = range;
exports.sample = sample;
exports.shuffle = shuffle;
exports.unique = unique;
//# sourceMappingURL=collection.js.map
//# sourceMappingURL=collection.js.map