import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { formatDate } from "./formatDate";

describe("formatDate", () => {
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns dash for empty value", () => {
    expect(formatDate()).toBe("-");
    expect(formatDate(null)).toBe("-");
    expect(formatDate("")).toBe("-");
  });

  it("returns dash for invalid date", () => {
    expect(formatDate("invalid-date")).toBe("-");
  });

  it("formats valid ISO date", () => {
    const result = formatDate("2026-05-28T10:20:30.000Z");

    expect(result).not.toBe("-");
    expect(result).toContain("2026");
  });
});
