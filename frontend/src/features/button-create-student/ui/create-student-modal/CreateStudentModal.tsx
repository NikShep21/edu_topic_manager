"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Modal, ModalDefaultActions } from "@/shared/ui/modal";
import { buildSelectOptions } from "@/shared/lib/select/buildSelectOptions";
import { applyServerErrors } from "@/shared/lib/form/applyServerErrors";

import { useStudentsFilterQuery } from "@/entities/user/student";

import { createStudentSchema, type CreateStudentValues } from "../../model/schema";
import { useCreateStudent } from "../../model/useCreateStudent";
import { CreateStudentForm } from "../create-student-form/CreateStudentForm";

import styles from "./CreateStudentModal.module.scss";

interface CreateStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStudentModal = ({ isOpen, onClose }: CreateStudentModalProps) => {
  const { handleSubmit, control, register, reset, setError, clearErrors } =
    useForm<CreateStudentValues>({
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

  const { mutate, isPending } = useCreateStudent();
  const { data: filterOptions } = useStudentsFilterQuery();

  const courseOptions = buildSelectOptions(filterOptions?.courses ?? []);

  const handleClose = () => {
    reset();
    clearErrors();

    onClose();
  };

  const submit = (formData: CreateStudentValues) => {
    clearErrors();

    mutate(
      {
        ...formData,
        role: "student",
        group: formData.group,
      },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
        onError: (error) => {
          applyServerErrors<CreateStudentValues>(error, setError);
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Создание студента"
      className={styles.modal}
      footer={
        <ModalDefaultActions
          formId="create-student-form"
          onClose={handleClose}
          isLoading={isPending}
          text="Создать студента"
        />
      }
    >
      <form
        id="create-student-form"
        onSubmit={handleSubmit(submit)}
        className={styles.content}
      >
        <CreateStudentForm
          courseOptions={courseOptions}
          control={control}
          register={register}
        />
      </form>
    </Modal>
  );
};
