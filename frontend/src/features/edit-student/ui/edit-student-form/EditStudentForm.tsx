"use client";

import { type Control, type UseFormRegister } from "react-hook-form";

import type { EditStudentValues } from "../../model/schema";

import { StudentFormFields } from "@/entities/user/student";
import styles from "./EditStudentForm.module.scss";
import type { SelectOption } from "@/shared/ui/select";

interface EditStudentFormProps {
  control: Control<EditStudentValues>;
  register: UseFormRegister<EditStudentValues>;

  courseOptions: SelectOption[];
}

export const EditStudentForm = ({
  control,
  register,
  courseOptions,
}: EditStudentFormProps) => {
  return (
    <div className={styles.form}>
      <StudentFormFields
        control={control}
        register={register}
        courseOptions={courseOptions}
      />
    </div>
  );
};
