import z from "zod";

export const editStudentSchema = z.object({
  username: z
    .string()
    .min(1, "Введите логин")
    .min(3, "Логин должен быть не короче 3 символов"),
  first_name: z.string().min(1, "Введите имя"),
  last_name: z.string().min(1, "Введите фамилию"),
  middle_name: z.string().min(1, "Введите отчество"),
  course: z
    .number({
      error: "Выберите курс",
    })
    .min(1, { error: "Выберите курс" }),
  group: z
    .string()
    .min(1, "Введите группу")
    .min(3, "Назване группы должно быть длиннее 3 симвволов"),
});
export type EditStudentValues = z.infer<typeof editStudentSchema>;
