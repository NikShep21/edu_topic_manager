"use client";

import { useFormState, type Control, type UseFormRegister } from "react-hook-form";

import { Input } from "@/shared/ui/input";
import { TeacherFormFields } from "@/entities/user/teacher";

import type { CreateTeacherValues } from "../../model/schema";

import styles from "./CreateTeacherForm.module.scss";

interface CreateTeacherFormProps {
  control: Control<CreateTeacherValues>;
  register: UseFormRegister<CreateTeacherValues>;
}

export const CreateTeacherForm = ({ control, register }: CreateTeacherFormProps) => {
  const { errors } = useFormState({ control });

  return (
    <div className={styles.form}>
      <TeacherFormFields control={control} register={register} />

      <div className={styles.field}>
        <label htmlFor="teacher-password" className={styles.label}>
          Пароль
        </label>
        <Input
          id="teacher-password"
          type="password"
          placeholder="Введите пароль"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>
    </div>
  );
};
