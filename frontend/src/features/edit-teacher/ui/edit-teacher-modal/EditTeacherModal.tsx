"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import type { TeacherData } from "@/entities/user/base/model/types";

import { Modal, ModalDefaultActions } from "@/shared/ui/modal";
import { applyServerErrors } from "@/shared/lib/form/applyServerErrors";

import { useUpdateTeacher } from "../../model/useUpdateTeacher";
import { EditTeacherForm } from "../edit-teacher-form/EditTeacherForm";
import { editTeacherSchema, type EditTeacherValues } from "../../model/schema";

import styles from "./EditTeacherModal.module.scss";

interface EditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: TeacherData | null;
}

export const EditTeacherModal = ({ isOpen, onClose, teacher }: EditTeacherModalProps) => {
  const { handleSubmit, control, setError, register, reset } = useForm<EditTeacherValues>(
    {
      resolver: zodResolver(editTeacherSchema),
      defaultValues: {
        username: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        academic_degree: "",
        academic_title: "",
        job_title: "",
      },
    },
  );

  useEffect(() => {
    if (!teacher || !isOpen) return;

    reset({
      username: teacher.username,
      first_name: teacher.first_name,
      last_name: teacher.last_name,
      middle_name: teacher.middle_name,
      academic_degree: teacher.academic_degree?.name ?? "",
      academic_title: teacher.academic_title?.name ?? "",
      job_title: teacher.job_title?.name ?? "",
    });
  }, [teacher, isOpen, reset]);

  const { isPending, mutate } = useUpdateTeacher();

  const submit = (formData: EditTeacherValues) => {
    if (!teacher) return;

    mutate(
      {
        id: teacher.id,
        data: formData,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (error) => {
          applyServerErrors<EditTeacherValues>(error, setError);
        },
      },
    );
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Редактирование преподавателя"
      className={styles.modal}
      footer={
        <ModalDefaultActions
          formId="edit-teacher-form"
          onClose={handleClose}
          isLoading={isPending}
          text="Сохранить"
        />
      }
    >
      <form
        id="edit-teacher-form"
        onSubmit={handleSubmit(submit)}
        className={styles.content}
      >
        <EditTeacherForm control={control} register={register} />
      </form>
    </Modal>
  );
};
