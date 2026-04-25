"use client";

import { UserBaseFormFields } from "@/entities/user/ui/user-base-form-fields/UserBaseFormFields";
import {
  Controller,
  useFormState,
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

import { FieldError } from "@/shared/ui/field-error";
import { Input } from "@/shared/ui/input";
import { Select, type SelectOption } from "@/shared/ui/select";

import styles from "./StudentFormFields.module.scss";

type StudentFormFieldsValues = {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  course: number | undefined;
  group: string;
};

interface StudentFormFieldsProps<T extends FieldValues & StudentFormFieldsValues> {
  control: Control<T>;
  register: UseFormRegister<T>;

  courseOptions: SelectOption[];
}

export const StudentFormFields = <T extends FieldValues & StudentFormFieldsValues>({
  control,
  register,

  courseOptions,
}: StudentFormFieldsProps<T>) => {
  const { errors } = useFormState({ control });
  return (
    <>
      <UserBaseFormFields register={register} control={control} />

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
