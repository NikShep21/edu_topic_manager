import type React from "react";
import clsx from "clsx";
import { FieldError } from "@/shared/ui/field-error";
import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  error?: string;
  isError?: boolean;
  className?: string;
  inputClassName?: string;
}

export const Input = ({
  startContent,
  endContent,
  error,
  isError = true,
  className,
  inputClassName,
  ...props
}: InputProps) => {
  return (
    <div className={clsx(styles.field, className)}>
      <div className={styles.inputContainer}>
        {startContent && (
          <div className={styles.startContent} aria-hidden="true">
            {startContent}
          </div>
        )}

        <input
          {...props}
          className={clsx(
            styles.input,
            {
              [styles.withStartContent]: Boolean(startContent),
              [styles.withEndContent]: Boolean(endContent),
            },
            inputClassName,
          )}
        />

        {endContent && (
          <div className={styles.endContent} aria-hidden="true">
            {endContent}
          </div>
        )}
      </div>

      {isError ? <FieldError message={error} className={styles.error} /> : null}
    </div>
  );
};
