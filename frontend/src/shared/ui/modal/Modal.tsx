import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import clsx from "clsx";
import styles from "./Modal.module.scss";

interface ModalProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  footer?: React.ReactNode;
  className?: string;
  isSmall?: boolean;
}

export const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  footer,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <section className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Закрыть модальное окно"
          >
            <IoClose size={22} />
          </button>
        </section>

        <section className={styles.modalBody}>
          {children}
          <div className={styles.br}></div>
        </section>

        {footer ? <section className={styles.modalFooter}>{footer}</section> : null}
      </div>
    </div>
  );
};
