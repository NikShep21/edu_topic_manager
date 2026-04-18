import z from "zod";

export const createTeacherSchema = z.object({
  username: z
    .string()
    .min(1, "Введите логин")
    .min(3, "Логин должен быть не короче 3 символов"),
  first_name: z.string().min(1, "Введите имя"),
  last_name: z.string().min(1, "Введите фамилию"),
  middle_name: z.string().min(1, "Введите отчество"),
  academic_degree: z.string().min(1, "Введите ученую степень"),
  academic_title: z.string().min(1, "Введите ученое звание"),
  job_title: z.string().min(1, "Введите должность"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(8, "Пароль должен быть не короче 8 символов"),
});

export type CreateTeacherValues = z.infer<typeof createTeacherSchema>;
