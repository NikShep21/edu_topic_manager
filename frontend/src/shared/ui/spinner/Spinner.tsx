import styles from "./Spinner.module.scss";
import clsx from "clsx";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md";
}

export const Spinner = ({ className, size = "md" }: SpinnerProps) => {
  return (
    <span
      className={clsx(styles.spinner, className, {
        [styles.sm]: size === "sm",
        [styles.md]: size === "md",
      })}
      aria-hidden="true"
    />
  );
};
