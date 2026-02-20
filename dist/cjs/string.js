'use strict';

// src/string/truncate.ts
function truncate(str, maxLen, suffix = "...") {
  if (str.length <= maxLen) return str;
  if (maxLen <= suffix.length) return suffix.slice(0, maxLen);
  return str.slice(0, maxLen - suffix.length) + suffix;
}

// src/string/slugify.ts
function slugify(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

// src/string/titleCase.ts
function titleCase(str) {
  return str.toLowerCase().split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}

// src/string/camelCase.ts
function camelCase(str) {
  return str.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
}

// src/string/kebabCase.ts
function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[\s_]+/g, "-").toLowerCase();
}

// src/string/snakeCase.ts
function snakeCase(str) {
  return str.replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s-]+/g, "_").toLowerCase();
}

// src/string/capitalize.ts
function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// src/string/maskSensitiveData.ts
function maskSensitiveData(value, type) {
  if (!value) return value;
  switch (type) {
    case "email": {
      const lastAtIndex = value.lastIndexOf("@");
      if (lastAtIndex === -1) return value;
      const local = value.slice(0, lastAtIndex);
      const domain = value.slice(lastAtIndex + 1);
      if (!domain || !local) return value;
      let maskedLocal;
      if (local.length <= 2) {
        maskedLocal = local[0] + "*";
      } else {
        const maskCount = Math.min(local.length - 2, 8);
        maskedLocal = local[0] + "*".repeat(maskCount) + local[local.length - 1];
      }
      return `${maskedLocal}@${domain}`;
    }
    case "phone":
    case "card": {
      const digits = value.replace(/\D/g, "");
      if (digits.length < 4) return value;
      const maskedLength = Math.min(digits.length - 4, 12);
      return "*".repeat(maskedLength) + digits.slice(-4);
    }
    default:
      return value;
  }
}

exports.camelCase = camelCase;
exports.capitalize = capitalize;
exports.kebabCase = kebabCase;
exports.maskSensitiveData = maskSensitiveData;
exports.slugify = slugify;
exports.snakeCase = snakeCase;
exports.titleCase = titleCase;
exports.truncate = truncate;
//# sourceMappingURL=string.js.map
//# sourceMappingURL=string.js.map