"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Modal, ModalDefaultActions } from "@/shared/ui/modal";
import { applyServerErrors } from "@/shared/lib/form/applyServerErrors";

import { createTeacherSchema, type CreateTeacherValues } from "../../model/schema";
import { useCreateTeacher } from "../../model/useCreateTeacher";
import { CreateTeacherForm } from "../create-teacher-form/CreateTeacherForm";

import styles from "./CreateTeacherModal.module.scss";

interface CreateTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateTeacherModal = ({ isOpen, onClose }: CreateTeacherModalProps) => {
  const { handleSubmit, control, register, reset, setError, clearErrors } =
    useForm<CreateTeacherValues>({
      resolver: zodResolver(createTeacherSchema),
      defaultValues: {
        username: "",
        first_name: "",
        last_name: "",
        middle_name: "",
        academic_degree: "",
        academic_title: "",
        job_title: "",
        password: "",
      },
    });

  const { mutate, isPending } = useCreateTeacher();

  const handleClose = () => {
    reset();
    clearErrors();
    onClose();
  };

  const submit = (formData: CreateTeacherValues) => {
    clearErrors();

    mutate(
      {
        ...formData,
        role: "teacher",
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (error) => {
          applyServerErrors<CreateTeacherValues>(error, setError);
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Создание преподавателя"
      className={styles.modal}
      footer={
        <ModalDefaultActions
          formId="create-teacher-form"
          onClose={handleClose}
          isLoading={isPending}
          text="Создать преподавателя"
        />
      }
    >
      <form
        id="create-teacher-form"
        onSubmit={handleSubmit(submit)}
        className={styles.content}
      >
        <CreateTeacherForm control={control} register={register} />
      </form>
    </Modal>
  );
};
