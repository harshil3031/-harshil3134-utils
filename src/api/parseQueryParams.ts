export interface ParsedQueryParams {
  page: number;
  limit: number;
  sort?: string | undefined;
  order?: "asc" | "desc" | undefined;
  search?: string | undefined;
}

export function parseQueryParams(
  params: Record<string, string | undefined>
): ParsedQueryParams {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  return {
    page: page < 1 ? 1 : page,
    limit: limit < 1 ? 10 : limit,
    sort: params.sort,
    order: params.order === "desc" ? "desc" : params.order === "asc" ? "asc" : undefined,
    search: params.search,
  };
}