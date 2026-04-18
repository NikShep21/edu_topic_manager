import { ApiError } from "./apiError";
import type { QueryParams, RequestOptions } from "./types";

export class HttpClient {
  constructor(
    private readonly basePath = "",
    private readonly defaultOptions: RequestInit = {},
  ) {}

  private buildUrl(path: string, query?: QueryParams) {
    const trimmedBasePath = this.basePath.replace(/\/+$/, "");
    const trimmedPath = path.replace(/^\/+/, "");

    const rawUrl = trimmedBasePath
      ? `${trimmedBasePath}/${trimmedPath}`
      : trimmedPath.startsWith("http://") || trimmedPath.startsWith("https://")
        ? trimmedPath
        : `/${trimmedPath}`;

    const isAbsolute = /^https?:\/\//i.test(rawUrl);
    const url = isAbsolute ? new URL(rawUrl) : new URL(rawUrl, "http://localhost");

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== null && value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return isAbsolute ? url.toString() : `${url.pathname}${url.search}`;
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { query, body, headers, ...rest } = options;
    const url = this.buildUrl(path, query);

    let response: Response;

    try {
      response = await fetch(url, {
        ...this.defaultOptions,
        ...rest,
        headers: {
          ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
          ...(this.defaultOptions.headers ?? {}),
          ...(headers ?? {}),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });
    } catch {
      throw new ApiError("Network error", 0, null);
    }

    const contentType = response.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");

    const data = isJson
      ? await response.json().catch(() => null)
      : await response.text().catch(() => null);

    if (!response.ok) {
      const message =
        data &&
        typeof data === "object" &&
        "message" in data &&
        typeof data.message === "string"
          ? data.message
          : `Request failed with status ${response.status}`;

      throw new ApiError(message, response.status, data);
    }

    return data as T;
  }

  get<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, { ...options, method: "POST", body });
  }

  put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, { ...options, method: "PUT", body });
  }

  patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, { ...options, method: "PATCH", body });
  }

  delete<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }
}
