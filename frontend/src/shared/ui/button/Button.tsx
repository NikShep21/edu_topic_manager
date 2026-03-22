import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Spinner } from "@/shared/ui/spinner";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  type = "button",
  isLoading = false,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, className, {
        [styles.loading]: isLoading,
      })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Spinner size="md" className={styles.spinner} />
      ) : (
        <span className={styles.content}>{children}</span>
      )}
    </button>
  );
};
