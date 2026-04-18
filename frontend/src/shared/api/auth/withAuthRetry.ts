import { refreshSession } from "@/features/refresh-session/api/refreshSession";
import { ApiError } from "../core/apiError";

let refreshPromise: Promise<unknown> | null = null;

async function runRefreshOnce() {
  if (!refreshPromise) {
    refreshPromise = refreshSession().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

function isUnauthorizedError(error: unknown): error is ApiError<Record<string, unknown>> {
  return error instanceof ApiError && error.status === 401;
}

export async function withAuthRetry<T>(request: () => Promise<T>): Promise<T> {
  try {
    return await request();
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error;
    }
  }

  await runRefreshOnce();
  return request();
}
