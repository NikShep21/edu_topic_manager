import type React from "react";
import clsx from "clsx";

import { FieldError } from "@/shared/ui/field-error";

import styles from "./Textarea.module.scss";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  isError?: boolean;
  className?: string;
  textAreaClassName?: string;
  showCounter?: boolean;
}

export const Textarea = ({
  error,
  isError = true,
  className,
  textAreaClassName,
  showCounter = false,
  maxLength,
  value,
  defaultValue,
  ...props
}: TextAreaProps) => {
  const currentLength =
    typeof value === "string"
      ? value.length
      : typeof defaultValue === "string"
        ? defaultValue.length
        : 0;

  return (
    <div className={clsx(styles.field, className)}>
      <textarea
        className={clsx(styles.textArea, textAreaClassName)}
        maxLength={maxLength}
        value={value}
        defaultValue={defaultValue}
        {...props}
      />

      <div className={styles.bottom}>
        {isError ? <FieldError message={error} /> : <span />}

        {showCounter && maxLength ? (
          <span className={styles.counter}>
            {currentLength}/{maxLength}
          </span>
        ) : null}
      </div>
    </div>
  );
};
