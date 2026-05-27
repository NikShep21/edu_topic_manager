import { describe, expect, it } from "vitest";

import { editTeacherSchema } from "./schema";

describe("editTeacherSchema", () => {
  const validData = {
    username: "teacher",
    first_name: "Иван",
    last_name: "Иванов",
    middle_name: "Иванович",
    academic_degree: "к.т.н.",
    academic_title: "доцент",
    job_title: "преподаватель",
  };

  it("accepts valid teacher data", () => {
    expect(editTeacherSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects short username", () => {
    const result = editTeacherSchema.safeParse({
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
    const result = editTeacherSchema.safeParse({
      ...validData,
      first_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите имя");
    }
  });

  it("rejects empty last name", () => {
    const result = editTeacherSchema.safeParse({
      ...validData,
      last_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите фамилию");
    }
  });

  it("rejects empty middle name", () => {
    const result = editTeacherSchema.safeParse({
      ...validData,
      middle_name: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите отчество");
    }
  });

  it("rejects empty academic degree", () => {
    const result = editTeacherSchema.safeParse({
      ...validData,
      academic_degree: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите ученую степень");
    }
  });

  it("rejects empty academic title", () => {
    const result = editTeacherSchema.safeParse({
      ...validData,
      academic_title: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите ученое звание");
    }
  });

  it("rejects empty job title", () => {
    const result = editTeacherSchema.safeParse({
      ...validData,
      job_title: "",
    });

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe("Введите должность");
    }
  });
});
