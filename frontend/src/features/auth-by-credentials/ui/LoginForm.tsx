"use client";

import { Input } from "@/shared/ui/input";
import styles from "./LoginForm.module.scss";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Button } from "@/shared/ui/button";
import { PasswordInput } from "@/shared/ui/password-input";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/features/auth-by-credentials/model/useLoginMutation";

import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth-by-credentials/model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/routes/routes";

import { FieldError } from "@/shared/ui/field-error";
import { ApiError } from "@/shared/api";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { remember_me: false },
  });
  const { isPending, mutate, data, error } = useLoginMutation();

  const authError =
    error instanceof ApiError && (error.status === 401 || error.status === 400)
      ? error
      : null;

  const onSubmit = (formData: LoginFormValues) => {
    mutate(formData);
  };
  useEffect(() => {
    if (data) {
      const role = data.user.role;
      redirect(ROUTES[role]);
    }
  }, [data]);
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Вход в систему</h1>
      <p className={styles.titleDescription}>Введите логин и пароль для продолжения</p>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} action="#">
        <Input
          {...register("username")}
          startContent={<FaUser size={20} />}
          placeholder="Логин"
          error={errors.username?.message}
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
        <div className={styles.bottomContainer}>
          <FieldError className={styles.error} message={authError?.message} />
          <Button isLoading={isPending} type="submit" className={styles.loginButton}>
            Войти
          </Button>
          <p className={styles.description}>Учетные записи создаются администратором</p>
        </div>
      </form>
    </div>
  );
};
