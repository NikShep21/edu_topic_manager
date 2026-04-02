import clsx from "clsx";
import styles from "./DropdownMenu.module.scss";

interface DropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownMenu = ({ children, className }: DropdownMenuProps) => {
  return <div className={clsx(styles.menu, className)}>{children}</div>;
};
