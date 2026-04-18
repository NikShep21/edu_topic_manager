import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import { Spinner } from "@/shared/ui/spinner";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  className,
  type = "button",
  isLoading = false,
  disabled,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.loading]: isLoading,
          [styles.fullWidth]: fullWidth,
        },
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <div className={styles.content}>{children}</div>

      {isLoading ? (
        <span className={styles.spinnerWrapper} aria-hidden="true">
          <Spinner size="md" className={styles.spinner} />
        </span>
      ) : null}
    </button>
  );
};
