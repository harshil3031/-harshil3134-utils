export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  delay = 1000
): Promise<Response> {
  let lastError: Error | undefined;

  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok || i === retries) {
        return response;
      }

      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (i === retries) {
        throw lastError;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, delay * Math.pow(2, i)));
  }

  throw lastError || new Error("Fetch failed");
}
