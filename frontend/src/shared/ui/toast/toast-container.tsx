import { Toast } from "./Toast";
import styles from "./toast-container.module.scss";
import type { ToastItem } from "@/shared/model/toast/toast-types";

interface ToastContainerProps {
  toasts: ToastItem[];
  onClose: (id: string) => void;
}

export const ToastContainer = ({ toasts, onClose }: ToastContainerProps) => {
  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={styles.container} aria-label="Уведомления">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          title={toast.title}
          message={toast.message}
          variant={toast.variant}
          duration={toast.duration}
          onClose={onClose}
        />
      ))}
    </div>
  );
};
