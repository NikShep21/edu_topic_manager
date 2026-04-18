import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./TableRow.module.scss";

interface TableRowProps {
  children: ReactNode;
  className?: string;
  isSelected?: boolean;
}

export const TableRow = ({ children, className, isSelected = false }: TableRowProps) => {
  return (
    <tr
      className={clsx(styles.row, className, {
        [styles.selected]: isSelected,
      })}
    >
      {children}
    </tr>
  );
};
