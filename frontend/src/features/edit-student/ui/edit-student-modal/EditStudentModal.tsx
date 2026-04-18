"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { StudentData } from "@/entities/user/base/model/types";

import { Modal, ModalDefaultActions } from "@/shared/ui/modal";

import { useUpdateStudent } from "../../model/useUpdateStudent";
import { EditStudentForm } from "../edit-student-form/EditStudentForm";

import styles from "./EditStudentModal.module.scss";
import {
  editStudentSchema,
  type EditStudentValues,
} from "@/features/edit-student/model/schema";
import { useStudentsFilterQuery } from "@/entities/user/student";
import { buildSelectOptions } from "@/shared/lib/select/buildSelectOptions";
import { applyServerErrors } from "@/shared/lib/form/applyServerErrors";

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentData | null;
}

export const EditStudentModal = ({ isOpen, onClose, student }: EditStudentModalProps) => {
  const { handleSubmit, control, setError, register, reset } = useForm<EditStudentValues>(
    {
      resolver: zodResolver(editStudentSchema),
      defaultValues: {
        username: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        course: undefined,
        group: "",
      },
    },
  );

  useEffect(() => {
    if (!student || !isOpen) return;

    reset({
      username: student.username,
      first_name: student.first_name,
      last_name: student.last_name,
      middle_name: student.middle_name,
      course: student.course,
      group: student.group.name,
    });
  }, [student, isOpen, reset]);

  const { isPending, mutate } = useUpdateStudent();

  const submit = (formData: EditStudentValues) => {
    if (!student) return;

    mutate(
      {
        id: student.id,
        data: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          applyServerErrors<EditStudentValues>(error, setError);
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const { data: filterOptions } = useStudentsFilterQuery();

  const courseOptions = buildSelectOptions(filterOptions?.courses ?? []);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Редактирование студента"
      className={styles.modal}
      footer={
        <ModalDefaultActions
          formId="edit-student-form"
          onClose={handleClose}
          isLoading={isPending}
          text="Сохранить"
        />
      }
    >
      <form
        id="edit-student-form"
        onSubmit={handleSubmit(submit)}
        className={styles.content}
      >
        <EditStudentForm
          courseOptions={courseOptions}
          control={control}
          register={register}
        />
      </form>
    </Modal>
  );
};
