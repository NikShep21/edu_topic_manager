import clsx from "clsx";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md";
}

export const Spinner = ({ className, size = "md" }: SpinnerProps) => {
  return (
    <span
      className={clsx(styles.spinner, styles[`spinner_${size}`], className)}
      aria-hidden="true"
    />
  );
};
