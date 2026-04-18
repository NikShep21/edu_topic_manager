import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./IconButton.module.scss";

type IconButtonVariant = "ghost" | "soft";
type IconButtonSize = "sm" | "md" | "lg";

interface IconButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  isActive?: boolean;
}

export const IconButton = ({
  icon,
  variant = "ghost",
  size = "md",
  isActive = false,
  className,
  type = "button",
  ...props
}: IconButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.active]: isActive,
        },
        className,
      )}
      {...props}
    >
      <span className={styles.icon}>{icon}</span>
    </button>
  );
};
