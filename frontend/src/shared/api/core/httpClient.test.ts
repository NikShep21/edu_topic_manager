import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { HttpClient } from "./httpClient";

describe("HttpClient", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("makes GET request with query params", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ items: [] }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const client = new HttpClient("/api");

    const result = await client.get("/topics", {
      query: {
        page: 1,
        search: "react",
        empty: null,
        skipped: undefined,
      },
    });

    expect(result).toEqual({ items: [] });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(url).toBe("/api/topics/?page=1&search=react");
    expect(init.method).toBe("GET");
  });

  it("serializes JSON body for POST request", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ id: 1 }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const client = new HttpClient("/api");

    const result = await client.post("/topics", {
      title: "Новая тема",
    });

    expect(result).toEqual({ id: 1 });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];

    expect(init.method).toBe("POST");
    expect(init.body).toBe(JSON.stringify({ title: "Новая тема" }));
    expect((init.headers as Headers).get("Content-Type")).toBe("application/json");
  });

  it("throws ApiError with response message", async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Validation error" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    );

    const client = new HttpClient("/api");

    await expect(client.get("/topics")).rejects.toMatchObject({
      name: "ApiError",
      message: "Validation error",
      status: 400,
      data: {
        message: "Validation error",
      },
    });
  });

  it("throws ApiError on network error", async () => {
    fetchMock.mockRejectedValueOnce(new Error("Failed to fetch"));

    const client = new HttpClient("/api");

    await expect(client.get("/topics")).rejects.toMatchObject({
      name: "ApiError",
      message: "Network error",
      status: 0,
      data: null,
    });
  });
});
