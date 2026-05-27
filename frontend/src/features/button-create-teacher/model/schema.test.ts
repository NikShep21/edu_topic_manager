import { describe, expect, it } from "vitest";

import { createTeacherSchema } from "./schema";

describe("createTeacherSchema", () => {
  const validData = {
    username: "teacher",
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
    academic_degree: "к.т.н.",
    academic_title: "доцент",
    job_title: "преподаватель",
    password: "password123",
  };

  it("accepts valid teacher data", () => {
    expect(createTeacherSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects short username", () => {
    const result = createTeacherSchema.safeParse({
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

  it("rejects empty first name", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      first_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите имя");
    }
  });

  it("rejects empty last name", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      last_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите фамилию");
    }
  });

  it("rejects empty middle name", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      middle_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите отчество");
    }
  });

  it("rejects empty academic degree", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      academic_degree: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите ученую степень");
    }
  });

  it("rejects empty academic title", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      academic_title: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите ученое звание");
    }
  });

  it("rejects empty job title", () => {
    const result = createTeacherSchema.safeParse({
      ...validData,
      job_title: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите должность");
    }
  });

  it("rejects short password", () => {
    const result = createTeacherSchema.safeParse({
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
});
