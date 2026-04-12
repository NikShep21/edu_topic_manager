"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { ApiError } from "@/shared/api";
import { FieldError } from "@/shared/ui/field-error";
import { Modal, ModalDefaultActions } from "@/shared/ui/modal";

import { createStudentSchema, type CreateStudentValues } from "../../model/schema";
import { useCreateStudent } from "../../model/useCreateStudent";
import { CreateStudentForm } from "../create-student-form/CreateStudentForm";

import styles from "./CreateStudentModal.module.scss";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStudentModal = ({ isOpen, onClose }: CreateStudentModalProps) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateStudentValues>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      middle_name: "",
      course: undefined,
      group: "",
      password: "",
    },
  });

  const { error, isPending, mutate } = useCreateStudent();

  const submit = (formData: CreateStudentValues) => {
    mutate({ ...formData, role: "student" } as const, {
      onSuccess: () => {
        reset();
        onClose();
      },
    });
  };

  const createError =
    error instanceof ApiError && (error.status === 400 || error.status === 401)
      ? error
      : null;

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Создание студента"
      className={styles.modal}
    >
      <form
        id="create-student-form"
        onSubmit={handleSubmit(submit)}
        className={styles.content}
      >
        <CreateStudentForm control={control} register={register} errors={errors} />

        <FieldError message={createError?.message} className={styles.error} />

        <div className={styles.actions}>
          <ModalDefaultActions
            formId="create-student-form"
            onClose={handleClose}
            isLoading={isPending}
            text="Создать студента"
          />
        </div>
      </form>
    </Modal>
  );
};
