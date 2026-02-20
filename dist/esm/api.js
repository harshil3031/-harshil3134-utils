// src/api/createApiResponse.ts
function createApiResponse(data, options) {
  return {
    success: true,
    message: options == null ? void 0 : options.message,
    data,
    meta: options == null ? void 0 : options.meta
  };
}

// src/api/createErrorResponse.ts
function createErrorResponse(message, statusCode = 500, code, meta) {
  return {
    success: false,
    message,
    statusCode,
    code,
    meta
  };
}

// src/api/createPaginationMeta.ts
function createPaginationMeta(page, limit, totalItems) {
  const totalPages = Math.ceil(totalItems / limit);
  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1
  };
}

// src/api/parseQueryParams.ts
function parseQueryParams(params) {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  return {
    page: page < 1 ? 1 : page,
    limit: limit < 1 ? 10 : limit,
    sort: params.sort,
    order: params.order === "desc" ? "desc" : params.order === "asc" ? "asc" : void 0,
    search: params.search
  };
}

export { createApiResponse, createErrorResponse, createPaginationMeta, parseQueryParams };
//# sourceMappingURL=api.js.map
//# sourceMappingURL=api.js.map