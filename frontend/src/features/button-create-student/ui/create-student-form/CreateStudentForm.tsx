"use client";

import { useFormState, type Control, type UseFormRegister } from "react-hook-form";

import { Input } from "@/shared/ui/input";

import type { CreateStudentValues } from "../../model/schema";

import styles from "./CreateStudentForm.module.scss";

import { StudentFormFields } from "@/entities/user/student";
import type { SelectOption } from "@/shared/ui/select";

interface CreateStudentFormProps {
  control: Control<CreateStudentValues>;
  register: UseFormRegister<CreateStudentValues>;

  courseOptions: SelectOption[];
}

export const CreateStudentForm = ({
  control,
  register,
  courseOptions,
}: CreateStudentFormProps) => {
  const { errors } = useFormState({ control });
  return (
    <div className={styles.form}>
      <StudentFormFields
        control={control}
        register={register}
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
