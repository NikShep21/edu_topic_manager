import { beforeEach, describe, expect, it, vi } from "vitest";

import { ApiError } from "../core/apiError";
import { setRefreshSessionHandler } from "./refreshSessionHandler";
import { withAuthRetry } from "./withAuthRetry";

describe("withAuthRetry", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns result without refresh if request succeeds", async () => {
    const refreshSession = vi.fn().mockResolvedValue(undefined);
    const request = vi.fn().mockResolvedValue("success");

    setRefreshSessionHandler(refreshSession);

    await expect(withAuthRetry(request)).resolves.toBe("success");

    expect(request).toHaveBeenCalledTimes(1);
    expect(refreshSession).not.toHaveBeenCalled();
  });

  it("refreshes session and retries request after 401 error", async () => {
    const refreshSession = vi.fn().mockResolvedValue(undefined);
    const request = vi
      .fn()
      .mockRejectedValueOnce(new ApiError("Unauthorized", 401, null))
      .mockResolvedValueOnce("success");

    setRefreshSessionHandler(refreshSession);

    await expect(withAuthRetry(request)).resolves.toBe("success");

    expect(refreshSession).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledTimes(2);
  });

  it("does not refresh session for non-401 error", async () => {
    const refreshSession = vi.fn().mockResolvedValue(undefined);
    const error = new ApiError("Forbidden", 403, null);
    const request = vi.fn().mockRejectedValue(error);

    setRefreshSessionHandler(refreshSession);

    await expect(withAuthRetry(request)).rejects.toBe(error);

    expect(refreshSession).not.toHaveBeenCalled();
    expect(request).toHaveBeenCalledTimes(1);
  });

  it("runs only one refresh for parallel 401 requests", async () => {
    let resolveRefresh: (() => void) | undefined;

    const refreshSession = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve;
        }),
    );

    const request = vi
      .fn()
      .mockRejectedValueOnce(new ApiError("Unauthorized", 401, null))
      .mockRejectedValueOnce(new ApiError("Unauthorized", 401, null))
      .mockResolvedValue("success");

    setRefreshSessionHandler(refreshSession);

    const firstRequest = withAuthRetry(request);
    const secondRequest = withAuthRetry(request);

    await vi.waitFor(() => {
      expect(refreshSession).toHaveBeenCalledTimes(1);
    });

    resolveRefresh?.();

    await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual([
      "success",
      "success",
    ]);

    expect(refreshSession).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledTimes(4);
  });
});
