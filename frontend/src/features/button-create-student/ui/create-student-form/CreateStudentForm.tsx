"use client";

import { type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";

import { Input } from "@/shared/ui/input";

import type { CreateStudentValues } from "../../model/schema";

import styles from "./CreateStudentForm.module.scss";

import { courseOptions, StudentFormFields } from "@/entities/user/student";

interface CreateStudentFormProps {
  control: Control<CreateStudentValues>;
  register: UseFormRegister<CreateStudentValues>;
  errors: FieldErrors<CreateStudentValues>;
}

export const CreateStudentForm = ({
  control,
  register,
  errors,
}: CreateStudentFormProps) => {
  return (
    <div className={styles.form}>
      <StudentFormFields
        control={control}
        register={register}
        errors={errors}
        courseOptions={courseOptions}
      />

      <div className={styles.field}>
        <label htmlFor="student-password" className={styles.label}>
          Пароль
        </label>
        <Input
          id="student-password"
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
