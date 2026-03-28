"use client";

import { Input } from "@/shared/ui/input";
import styles from "./LoginForm.module.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth-by-credentials/model/use-login-mutation";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth-by-credentials/model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
export const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember_me: false },
  });
  const { isPending, mutate } = useLoginMutation();
  const onSubmit = (formData: LoginFormValues) => {
    mutate(formData);
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Вход в систему</h1>
      <p className={styles.titleDescription}>Введите логин и пароль для продолжения</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="#">
        <Input
          {...register("login")}
          startContent={<FaUser size={20} />}
          placeholder="Логин"
          error={errors.login?.message}
        />
        <PasswordInput
          {...register("password")}
          startContent={<FaLock size={20} />}
          placeholder="Пароль"
          error={errors.password?.message}
        />
        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input
              {...register("remember_me")}
              className={styles.checkboxInput}
              type="checkbox"
            />
            <span>Запомнить меня</span>
          </label>
          <a href="#" className={styles.forgotLink}>
            Забыли пароль?
          </a>
        </div>
        <Button isLoading={isPending} type="submit" className={styles.loginButton}>
          Войти
        </Button>
        <p className={styles.description}>Учетные записи создаются администратором</p>
      </form>
    </div>
  );
};
