import { FieldError } from "@/shared/ui/field-error";
import styles from "./Input.module.scss";
import clsx from "clsx";

interface PropsInput extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  error?: string;
}

export const Input = ({ startContent, endContent, error, ...props }: PropsInput) => {
  return (
    <div className={styles.field}>
      <div className={styles.inputContainer}>
        {startContent && (
          <div className={styles.startContent} aria-hidden="true">
            {startContent}
          </div>
        )}

        <input
          className={clsx(styles.input, {
            [styles.withStartContent]: Boolean(startContent),
            [styles.withEndContent]: Boolean(endContent),
          })}
          {...props}
        />

        {endContent && <div className={styles.endContent}>{endContent}</div>}
      </div>

      <FieldError message={error} className={styles.error} />
    </div>
  );
};
