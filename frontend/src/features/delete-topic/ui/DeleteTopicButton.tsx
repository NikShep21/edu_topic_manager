"use client";

import { useState } from "react";

import { useDeleteTopicMutation } from "@/features/delete-topic/model/useDeleteTopicMutation";
import { ApiError } from "@/shared/api";
import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field-error";
import { Modal, ModalDefaultActions } from "@/shared/ui/modal";

import styles from "./DeleteTopicButton.module.scss";

interface DeleteTopicButtonProps {
  topicId: number;
  disabled?: boolean;
  onSuccess?: () => void;
}

const getDeleteTopicErrorMessage = (error: unknown) => {
  if (error instanceof ApiError) {
    return error.message;
  }

  return "Не удалось удалить тему";
};

export const DeleteTopicButton = ({
  topicId,
  disabled,
  onSuccess,
}: DeleteTopicButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutateAsync, isPending } = useDeleteTopicMutation();

  const openModal = () => {
    setErrorMessage(null);
    setIsOpen(true);
  };

  const closeModal = () => {
    if (isPending) {
      return;
    }

    setErrorMessage(null);
    setIsOpen(false);
  };

  const handleDelete = async () => {
    setErrorMessage(null);

    try {
      await mutateAsync(topicId);

      setIsOpen(false);
      onSuccess?.();
    } catch (error) {
      setErrorMessage(getDeleteTopicErrorMessage(error));
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        onClick={openModal}
        disabled={disabled || isPending}
      >
        Удалить тему
      </Button>

      <Modal
        title="Удалить тему?"
        isOpen={isOpen}
        onClose={closeModal}
        footer={
          <ModalDefaultActions
            text="Удалить"
            onClose={closeModal}
            onClick={handleDelete}
            isLoading={isPending}
          />
        }
      >
        <div className={styles.content}>
          <p className={styles.text}>
            Это действие нельзя будет отменить. Тема, этапы и материалы будут удалены.
          </p>

          {errorMessage && <FieldError message={errorMessage} />}
        </div>
      </Modal>
    </>
  );
};
