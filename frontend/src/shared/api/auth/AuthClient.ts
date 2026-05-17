import { withAuthRetry } from "@/shared/api/auth/withAuthRetry";
import { fetchClient } from "@/shared/api/core/lib/createСlient";
import type { RequestOptions } from "@/shared/api/core/types";

export const authClient = {
  get<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return withAuthRetry(() => fetchClient.get<T>(path, options));
  },

  post<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return withAuthRetry(() => fetchClient.post<T>(path, body, options));
  },

  put<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return withAuthRetry(() => fetchClient.put<T>(path, body, options));
  },

  patch<T>(path: string, body?: unknown, options?: Omit<RequestOptions, "body">) {
    return withAuthRetry(() => fetchClient.patch<T>(path, body, options));
  },

  delete<T>(path: string, options?: Omit<RequestOptions, "body">) {
    return withAuthRetry(() => fetchClient.delete<T>(path, options));
  },
};
