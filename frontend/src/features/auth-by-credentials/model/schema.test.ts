import { describe, expect, it } from "vitest";

import { loginSchema } from "./schema";

describe("loginSchema", () => {
  const validData = {
    username: "student",
    password: "password123",
    remember_me: false,
  };

  it("accepts valid login data", () => {
    expect(loginSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects empty username", () => {
    const result = loginSchema.safeParse({
      ...validData,
      username: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите логин");
    }
  });

  it("rejects short username", () => {
    const result = loginSchema.safeParse({
      ...validData,
      username: "ab",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Логин должен быть не короче 3 символов",
      );
    }
  });

  it("rejects empty password", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите пароль");
    }
  });

  it("rejects short password", () => {
    const result = loginSchema.safeParse({
      ...validData,
      password: "123",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Пароль должен быть не короче 8 символов",
      );
    }
  });

  it("requires remember_me boolean value", () => {
    const result = loginSchema.safeParse({
      username: "student",
      password: "password123",
    });

    expect(result.success).toBe(false);
  });
});
