import clsx from "clsx";
import styles from "./DropdownMenu.module.scss";

interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  danger?: boolean;
  className?: string;
}

export const DropdownMenuItem = ({
  children,
  icon,
  danger = false,
  className,
  type = "button",
  ...props
}: DropdownMenuItemProps) => {
  return (
    <button
      type={type}
      className={clsx(styles.item, danger && styles.itemDanger, className)}
      {...props}
    >
      {icon && <span className={styles.itemIcon}>{icon}</span>}
      <span className={styles.itemText}>{children}</span>
    </button>
  );
};
