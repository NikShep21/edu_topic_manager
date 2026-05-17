import { ApiError } from "../core/apiError";
import { getRefreshSessionHandler } from "./refreshSessionHandler";

let refreshPromise: Promise<unknown> | null = null;

const runRefreshOnce = async () => {
  const refreshSession = getRefreshSessionHandler();

  if (!refreshSession) {
    throw new ApiError("Refresh session handler is not registered", 401, null);
  }

  if (!refreshPromise) {
    refreshPromise = refreshSession().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const isUnauthorizedError = (
  error: unknown,
): error is ApiError<Record<string, unknown>> => {
  return error instanceof ApiError && error.status === 401;
};

export const withAuthRetry = async <T>(request: () => Promise<T>): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error;
    }
  }

  await runRefreshOnce();

  return request();
};
