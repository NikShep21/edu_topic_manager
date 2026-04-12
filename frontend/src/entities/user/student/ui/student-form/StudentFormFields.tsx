"use client";

import {
  Controller,
  type Control,
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

import { FieldError } from "@/shared/ui/field-error";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

import styles from "./StudentFormFields.module.scss";

type StudentFormFieldsValues = {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  course: number | undefined;
  group: string;
};

type SelectOption = {
  value: string;
  label: string;
};

interface StudentFormFieldsProps<T extends FieldValues & StudentFormFieldsValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  courseOptions: SelectOption[];
}

export const StudentFormFields = <T extends FieldValues & StudentFormFieldsValues>({
  control,
  register,
  errors,
  courseOptions,
}: StudentFormFieldsProps<T>) => {
  return (
    <>
      <div className={styles.field}>
        <label htmlFor="student-username" className={styles.label}>
          Логин
        </label>
        <Input
          id="student-username"
          placeholder="Введите логин"
          error={errors.username?.message as string | undefined}
          {...register("username" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="student-first-name" className={styles.label}>
          Имя
        </label>
        <Input
          id="student-first-name"
          placeholder="Введите имя"
          error={errors.first_name?.message as string | undefined}
          {...register("first_name" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="student-last-name" className={styles.label}>
          Фамилия
        </label>
        <Input
          id="student-last-name"
          placeholder="Введите фамилию"
          error={errors.last_name?.message as string | undefined}
          {...register("last_name" as Path<T>)}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="student-middle-name" className={styles.label}>
          Отчество
        </label>
        <Input
          id="student-middle-name"
          placeholder="Введите отчество"
          error={errors.middle_name?.message as string | undefined}
          {...register("middle_name" as Path<T>)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="student-course" className={styles.label}>
            Курс
          </label>

          <Controller
            control={control}
            name={"course" as Path<T>}
            render={({ field, fieldState }) => (
              <>
                <Select
                  value={field.value ? String(field.value) : null}
                  onChange={(value) => field.onChange(Number(value))}
                  options={courseOptions}
                  placeholder="Выберите курс"
                />
                <FieldError message={fieldState.error?.message} />
              </>
            )}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="student-group" className={styles.label}>
            Группа
          </label>
          <Input
            id="student-group"
            placeholder="Введите группу"
            error={errors.group?.message as string | undefined}
            {...register("group" as Path<T>)}
          />
        </div>
      </div>
    </>
  );
};
