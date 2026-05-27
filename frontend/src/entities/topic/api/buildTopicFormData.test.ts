import { describe, expect, it } from "vitest";

import { buildTopicFormData } from "./buildTopicFormData";

describe("buildTopicFormData", () => {
  it("builds FormData for creating topic", () => {
    const file = new File(["content"], "topic.txt", {
      type: "text/plain",
    });

    const formData = buildTopicFormData({
      title: "Новая тема",
      description: "Описание темы",
      type: "vkr",
      steps: [
        {
          order: 1,
          title: "Первый этап",
        },
      ],
      files: [file],
    });

    expect(formData.get("title")).toBe("Новая тема");
    expect(formData.get("description")).toBe("Описание темы");
    expect(formData.get("type")).toBe("vkr");
    expect(formData.get("steps")).toBe(
      JSON.stringify([
        {
          order: 1,
          title: "Первый этап",
        },
      ]),
    );
    expect(formData.getAll("files")).toEqual([file]);
  });

  it("builds FormData for updating topic", () => {
    const formData = buildTopicFormData({
      title: "Обновленная тема",
      delete_files_ids: [1, 2],
    });

    expect(formData.get("title")).toBe("Обновленная тема");
    expect(formData.get("delete_files_ids")).toBe(JSON.stringify([1, 2]));
    expect(formData.has("description")).toBe(false);
    expect(formData.has("type")).toBe(false);
    expect(formData.has("steps")).toBe(false);
  });

  it("does not append undefined fields", () => {
    const formData = buildTopicFormData({
      title: undefined,
      description: undefined,
      steps: undefined,
      files: undefined,
    });

    expect(Array.from(formData.entries())).toEqual([]);
  });

  it("appends empty string values", () => {
    const formData = buildTopicFormData({
      title: "",
      description: "",
    });

    expect(formData.get("title")).toBe("");
    expect(formData.get("description")).toBe("");
  });
});
