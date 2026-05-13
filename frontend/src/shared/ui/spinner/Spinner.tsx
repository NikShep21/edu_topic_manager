import clsx from "clsx";
import styles from "./Spinner.module.scss";

interface SpinnerProps {
  className?: string;
  size?: "sm" | "md";
  color?: "primary" | "secondary";
}

export const Spinner = ({ className, size = "md", color = "primary" }: SpinnerProps) => {
  return (
    <span
      className={clsx(
        styles.spinner,
        styles[`spinner_${size}`],
        styles[`spinner_color_${color}`],
        className,
      )}
      aria-hidden="true"
    />
  );
};
