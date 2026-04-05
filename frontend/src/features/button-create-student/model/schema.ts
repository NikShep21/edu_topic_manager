import z from "zod";

export const createStudentSchema = z.object({
  username: z
    .string()
    .min(1, "Введите логин")
    .min(3, "Логин должен быть не короче 3 символов"),
  first_name: z.string().min(1, "Введите имя"),
  last_name: z.string().min(1, "Введите фамилию"),
  middle_name: z.string().min(1, "Введите отчество"),
  course: z
    .number({
      error: (issue) =>
        issue.input === undefined || Number.isNaN(issue.input)
          ? "Введите курс"
          : "Курс должен быть числом",
    })
    .min(1, { error: "Курс должен быть не меньше 1" }),
  group: z
    .string()
    .min(1, "Введите группу")
    .min(3, "Назване группы должно быть длиннее 3 симвволов"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(8, "Пароль должен быть не короче 8 символов"),
});
export type CreateStudentValues = z.infer<typeof createStudentSchema>;
