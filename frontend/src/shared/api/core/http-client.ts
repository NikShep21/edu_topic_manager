import { ApiError } from "./api-error";
import type { QueryParams, RequestOptions } from "./types";

export class HttpClient {
  constructor(
    private readonly basePath: string = "",
    private readonly defaultOptions: RequestInit = {},
  ) {}

  private buildUrl(path: string, query?: QueryParams) {
    const normalizedBasePath = this.normalizeBasePath(this.basePath);
    const normalizedPath = this.normalizePath(path);

    const url = normalizedBasePath
      ? `${normalizedBasePath}/${normalizedPath}`
      : `/${normalizedPath}`;

    if (!query) {
      return url;
    }

    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(query)) {
      if (value !== null && value !== undefined) {
        searchParams.set(key, String(value));
      }
    }

    const queryString = searchParams.toString();

    return queryString ? `${url}?${queryString}` : url;
  }

  private normalizeBasePath(basePath: string) {
    if (!basePath) {
      return "";
    }

    return `/${basePath.replace(/^\/+|\/+$/g, "")}`;
  }

  private normalizePath(path: string) {
    return path.replace(/^\/+/, "");
  }

  private async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { query, body, headers, ...rest } = options;

    const response = await fetch(this.buildUrl(path, query), {
      ...this.defaultOptions,
      ...rest,
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...(this.defaultOptions.headers ?? {}),
        ...(headers ?? {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

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
