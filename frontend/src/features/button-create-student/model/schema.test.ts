import { describe, expect, it } from "vitest";

import { createStudentSchema } from "./schema";

describe("createStudentSchema", () => {
  const validData = {
    username: "student",
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
    course: 1,
    group: "ИСТ-21",
    password: "password123",
  };

  it("accepts valid student data", () => {
    expect(createStudentSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects short username", () => {
    const result = createStudentSchema.safeParse({
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
    const result = createStudentSchema.safeParse({
      ...validData,
      first_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите имя");
    }
  });

  it("rejects empty last name", () => {
    const result = createStudentSchema.safeParse({
      ...validData,
      last_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите фамилию");
    }
  });

  it("rejects empty middle name", () => {
    const result = createStudentSchema.safeParse({
      ...validData,
      middle_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите отчество");
    }
  });

  it("rejects course less than 1", () => {
    const result = createStudentSchema.safeParse({
      ...validData,
      course: 0,
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Выберите курс");
    }
  });

  it("rejects missing course", () => {
    const dataWithoutCourse = {
      username: validData.username,
      first_name: validData.first_name,
      last_name: validData.last_name,
      middle_name: validData.middle_name,
      group: validData.group,
      password: validData.password,
    };

    const result = createStudentSchema.safeParse(dataWithoutCourse);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Выберите курс");
    }
  });

  it("rejects short group name", () => {
    const result = createStudentSchema.safeParse({
      ...validData,
      group: "ИТ",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Назване группы должно быть длиннее 3 симвволов",
      );
    }
  });

  it("rejects short password", () => {
    const result = createStudentSchema.safeParse({
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
