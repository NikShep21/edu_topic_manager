import { describe, expect, it } from "vitest";

import { ApiError } from "./apiError";

describe("ApiError", () => {
  it("stores message, status and data", () => {
    const data = { detail: "Invalid request" };

    const error = new ApiError("Bad request", 400, data);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ApiError");
    expect(error.message).toBe("Bad request");
    expect(error.status).toBe(400);
    expect(error.data).toEqual(data);
  });
});
