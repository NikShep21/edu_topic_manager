import { useEffect } from "react";
import clsx from "clsx";
import styles from "./Toast.module.scss";
import type { ToastVariant } from "@/shared/model/toast/toast-types";

interface ToastProps {
  id: string;
  title?: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
  onClose: (id: string) => void;
}

export const Toast = ({
  id,
  title,
  message,
  variant,
  duration = 5000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      onClose(id);
    }, duration);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [id, duration, onClose]);

  return (
    <div className={clsx(styles.toast, styles[variant])} role="status" aria-live="polite">
      <div className={styles.content}>
        <div className={styles.textBlock}>
          {title ? <p className={styles.title}>{title}</p> : null}
          <p className={styles.message}>{message}</p>
        </div>

        <button
          type="button"
          className={styles.closeButton}
          onClick={() => onClose(id)}
          aria-label="Закрыть уведомление"
        >
          ×
        </button>
      </div>

      <div className={styles.progress} style={{ animationDuration: `${duration}ms` }} />
    </div>
  );
};
