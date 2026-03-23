import z from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(1, "Введите логин")
    .min(3, "Логин должен быть не короче 3 символов"),
  password: z
    .string()
    .min(1, "Введите пароль")
    .min(8, "Пароль должен быть не короче 8 символов"),
  remember_me: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
