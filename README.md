# @harshil3134/utils

> Production-grade TypeScript utility helpers for **Node.js**, **Express**, **React**, and **React Native**.

[![npm version](https://img.shields.io/npm/v/@harshil3134/utils.svg)](https://www.npmjs.com/package/@harshil3134/utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-67%20Passed-success.svg)](https://github.com/harshil3134/utils)

---

## 🚀 Overview

`@harshil3134/utils` is a comprehensive, tree-shakeable utility library designed for modern TypeScript environments. It provides high-performance, well-tested helpers ranging from simple string manipulation to advanced observability and async patterns.

- **Type-Safe**: Written in pure TypeScript with strict types.
- **Tree-shakeable**: Import only what you need to keep bundles small.
- **Zero Dependencies**: Core library has no external dependencies.
- **Environment Aware**: Built-in support for Node, Browser, and React Native.

## 📦 Install

```bash
npm install @harshil3134/utils
# or
yarn add @harshil3134/utils
```

---

## 🛠 Usage

### Import everything
```ts
import { truncate, isValidEmail, retry } from '@harshil3134/utils'
```

### Subpath Imports (Best for Tree-shaking)
Direct imports ensure your bundler (Vite, Webpack) only includes the specific module.

```ts
import { truncate, slugify }       from '@harshil3134/utils/string'
import { retry, sleep }            from '@harshil3134/utils/async'
import { isObject, isPromise }      from '@harshil3134/utils/guards'
import { chunk, shuffle }          from '@harshil3134/utils/collection'
import { useDebouncedValue }       from '@harshil3134/utils/react'
```

---

## 🧩 Modules Overview

| Module | Purpose | Target |
| :--- | :--- | :--- |
| **`string`** | Advanced text manipulation & formatting | All |
| **`async`** | Patterns for retries, timeouts, and concurrency | All |
| **`collection`** | High-performance array & collection helpers | All |
| **`guards`** | Type-safe runtime checks (Type Guards) | All |
| **`object`** | Deep cloning, merging, and transformations | All |
| **`validation`** | Schema-based Env validation & data checks | All |
| **`date`** | Formatting, relative time, and calendar math | All |
| **`react`** | Optimized hooks for state & effects | React |
| **`logging`** | Pluggable logging system with levels | All |
| **`metrics`** | Performance tracking & metric collection | All |
| **`storage`** | SSR-safe storage with TTL/Expiration | Browser/Mobile |
| **`network`** | Fetch wrappers & query string builders | All |

---

## 📖 API Highlight

### ✍️ String Utilities (`/string`)
- `truncate(str, maxLen, suffix?)`: Smart truncation with suffix.
- `slugify(str)`: Generate URL-safe slugs.
- `maskSensitiveData(val, type)`: Mask emails, phones, or credit cards.
- `camelCase`, `snakeCase`, `kebabCase`, `capitalize`, `titleCase`.

### ⏳ Async Patterns (`/async`)
- `retry(fn, options?)`: Retry with exponential backoff.
- `withTimeout(promise, ms)`: Wrap any promise in a timeout.
- `sleep(ms)`: Promisified delay.
- `concurrentLimit(fns, limit)`: Execute promises with controlled concurrency.

### 🛡 Type Guards (`/guards`)
- `isObject`, `isPromise`, `isString`, `isNumber`, `isBoolean`, `isDefined`, `isFunction`.

### 🧱 Collection Helpers (`/collection`)
- `chunk(arr, size)`: Split array into chunks.
- `shuffle(arr)`: Fisher-Yates randomization.
- `sample(arr)`: Random element selection.
- `unique(arr, by?)`: Deduplicate based on value or transformation.
- `range(start, end, step?)`: Generate numeric sequences.

### 📂 Object Manipulation (`/object`)
- `deepMerge(target, source)`: Recursive object merging (Config merging).
- `deepClone(obj)`: Deep recursive copy.
- `pick(obj, keys)` / `omit(obj, keys)`: Typed property selection/exclusion.
- `flattenObject(obj)`: Convert nested objects to dot-notation keys.

### ✅ Validation & Env (`/validation`)
- `validateEnv(schema, source?)`: Schema-based environment validation with parsing.
- `isValidEmail` / `isValidPhone` / `isUUID` / `isStrongPassword` / `isNonEmptyString`.

### ⚛️ React Hooks (`/react`)
- `useAsyncState(fn)`: Managed loading/error/data state.
- `useDebouncedValue(val, delay)`: Debounce value changes.
- `useStableCallback(fn)`: A callback with stable reference but latest closures.
- `useIsMounted`, `usePrevious`, `useAbortableEffect`.

### 💾 Storage & Network (`/storage`, `/network`)
- `setWithExpiry(key, val, ttl)`: Store data with auto-expiration (SSR-safe).
- `storageAvailable(type)`: Check for storage permissions/availability.
- `fetchWithRetry(url, options?)`: Native fetch with built-in retries.
- `isOnline()` / `createQueryString` / `parseQueryString`.

---

## 🧪 Testing

We believe in bulletproof utilities. Every function is tested.

```bash
npm run test          # Run all 67 tests
npm run test:coverage # Check coverage (Targeting 90%+)
```

---

## 🔨 Development

Generated with `tsup` for high-performance CJS and ESM support with full type declarations.

```bash
npm run build      # Build CJS & ESM to /dist
npm run build:watch # Development mode
npm run lint       # Type safety check
```

---

## 📄 License

MIT © [harshil3134](https://github.com/harshil3134)
