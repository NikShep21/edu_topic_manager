import styles from "./FieldError.module.scss";
import clsx from "clsx";

interface FieldErrorProps {
  message?: string;
  className?: string;
}

export const FieldError = ({ message, className }: FieldErrorProps) => {
  return (
    <p
      className={clsx(styles.fieldError, className, {
        [styles.visible]: Boolean(message),
      })}
      aria-live="polite"
    >
      {message ?? ""}
    </p>
  );
};
