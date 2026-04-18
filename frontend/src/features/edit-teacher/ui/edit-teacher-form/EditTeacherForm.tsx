"use client";

import { type Control, type UseFormRegister } from "react-hook-form";

import { TeacherFormFields } from "@/entities/user/teacher";

import type { EditTeacherValues } from "../../model/schema";

import styles from "./EditTeacherForm.module.scss";

interface EditTeacherFormProps {
  control: Control<EditTeacherValues>;
  register: UseFormRegister<EditTeacherValues>;
}

export const EditTeacherForm = ({ control, register }: EditTeacherFormProps) => {
  return (
    <div className={styles.form}>
      <TeacherFormFields control={control} register={register} />
    </div>
  );
};
