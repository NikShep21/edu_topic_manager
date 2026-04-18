"use client";

import {
  useFormState,
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

import { Input } from "@/shared/ui/input";

import styles from "./UserBaseFormFields.module.scss";

type UserBaseFormFieldsValues = {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
};

interface UserBaseFormFieldsProps<T extends FieldValues & UserBaseFormFieldsValues> {
  register: UseFormRegister<T>;
  control: Control<T>;
}

export const UserBaseFormFields = <T extends FieldValues & UserBaseFormFieldsValues>({
  register,
  control,
}: UserBaseFormFieldsProps<T>) => {
  const { errors } = useFormState({ control });

  return (
    <>
      <div className={styles.field}>
        <label htmlFor="user-username" className={styles.label}>
          Логин
        </label>
        <Input
          id="user-username"
          placeholder="Введите логин"
          error={errors.username?.message as string | undefined}
          {...register("username" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="user-first-name" className={styles.label}>
          Имя
        </label>
        <Input
          id="user-first-name"
          placeholder="Введите имя"
          error={errors.first_name?.message as string | undefined}
          {...register("first_name" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="user-last-name" className={styles.label}>
          Фамилия
        </label>
        <Input
          id="user-last-name"
          placeholder="Введите фамилию"
          error={errors.last_name?.message as string | undefined}
          {...register("last_name" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="user-middle-name" className={styles.label}>
          Отчество
        </label>
        <Input
          id="user-middle-name"
          placeholder="Введите отчество"
          error={errors.middle_name?.message as string | undefined}
          {...register("middle_name" as Path<T>)}
        />
      </div>
    </>
  );
};
