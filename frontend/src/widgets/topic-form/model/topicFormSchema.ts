import { z } from "zod";

const topicFileSchema = z.union([
  z.custom<File>(
    (value) => typeof File !== "undefined" && value instanceof File,
    "Некорректный файл",
  ),
  z.object({
    id: z.number(),
    name: z.string(),
    url: z.string(),
    size: z.number(),
  }),
]);

export const topicFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Введите название темы")
    .max(255, "Название слишком длинное"),

  description: z
    .string()
    .trim()
    .min(1, "Введите описание темы")
    .max(5000, "Описание слишком длинное"),

  type: z.enum(["vkr", "coursework"]),

  steps: z.array(
    z.object({
      title: z.string().trim().min(1, "Название этапа не должно быть пустым"),
    }),
  ),

  filesState: z.object({
    files: z.array(topicFileSchema),
    deletedIds: z.array(z.number()),
  }),
});

export type TopicFormValues = z.infer<typeof topicFormSchema>;
