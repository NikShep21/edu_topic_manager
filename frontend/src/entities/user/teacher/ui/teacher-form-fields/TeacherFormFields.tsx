"use client";

import {
  useFormState,
  type Control,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";

import { Input } from "@/shared/ui/input";

import styles from "./TeacherFormFields.module.scss";

type TeacherFormFieldsValues = {
  username: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  academic_degree: string;
  academic_title: string;
  job_title: string;
};

interface TeacherFormFieldsProps<T extends FieldValues & TeacherFormFieldsValues> {
  control: Control<T>;
  register: UseFormRegister<T>;
}

export const TeacherFormFields = <T extends FieldValues & TeacherFormFieldsValues>({
  control,
  register,
}: TeacherFormFieldsProps<T>) => {
  const { errors } = useFormState({ control });

  return (
    <div className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="teacher-username" className={styles.label}>
          Логин
        </label>
        <Input
          id="teacher-username"
          placeholder="Введите логин"
          error={errors.username?.message as string | undefined}
          {...register("username" as Path<T>)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="teacher-last-name" className={styles.label}>
            Фамилия
          </label>
          <Input
            id="teacher-last-name"
            placeholder="Введите фамилию"
            error={errors.last_name?.message as string | undefined}
            {...register("last_name" as Path<T>)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="teacher-first-name" className={styles.label}>
            Имя
          </label>
          <Input
            id="teacher-first-name"
            placeholder="Введите имя"
            error={errors.first_name?.message as string | undefined}
            {...register("first_name" as Path<T>)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="teacher-middle-name" className={styles.label}>
          Отчество
        </label>
        <Input
          id="teacher-middle-name"
          placeholder="Введите отчество"
          error={errors.middle_name?.message as string | undefined}
          {...register("middle_name" as Path<T>)}
        />
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="teacher-academic-degree" className={styles.label}>
            Ученая степень
          </label>
          <Input
            id="teacher-academic-degree"
            placeholder="Введите ученую степень"
            error={errors.academic_degree?.message as string | undefined}
            {...register("academic_degree" as Path<T>)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="teacher-academic-title" className={styles.label}>
            Ученое звание
          </label>
          <Input
            id="teacher-academic-title"
            placeholder="Введите ученое звание"
            error={errors.academic_title?.message as string | undefined}
            {...register("academic_title" as Path<T>)}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="teacher-job-title" className={styles.label}>
          Должность
        </label>
        <Input
          id="teacher-job-title"
          placeholder="Введите должность"
          error={errors.job_title?.message as string | undefined}
          {...register("job_title" as Path<T>)}
        />
      </div>
    </div>
  );
};
