"use client";

import { Modal, ModalDefaultActions } from "@/shared/ui/modal";
import { FieldError } from "@/shared/ui/field-error";

import type { UserData } from "@/entities/user/base/model/types";

import styles from "./DeleteUserModal.module.scss";
import { UserBadge } from "@/entities/user/current";
import { useDeleteStudent } from "@/features/delete-user/model/useDeleteStudent";
import { ApiError } from "@/shared/api";

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;

  user: UserData | null;
}

export const DeleteUserModal = ({ isOpen, onClose, user }: DeleteUserModalProps) => {
  const { mutate, isPending, error } = useDeleteStudent();
  const deleteError =
    error instanceof ApiError && (error.status === 400 || error.status === 401)
      ? error
      : null;
  const handleConfirm = () => {
    if (!user) return;

    mutate(
      { id: user.id },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };
  return (
    <Modal
      title="Удаление пользователя"
      isOpen={isOpen}
      onClose={onClose}
      className={styles.modal}
      footer={
        <ModalDefaultActions
          text="Удалить"
          onClose={onClose}
          isLoading={isPending}
          onClick={handleConfirm}
        />
      }
    >
      <div className={styles.content}>
        <p className={styles.text}>Вы уверены, что хотите удалить пользователя?</p>

        {user ? (
          <UserBadge size="lg" userData={user} className={styles.userBadge} />
        ) : null}

        <FieldError message={deleteError?.message} />
      </div>
    </Modal>
  );
};
