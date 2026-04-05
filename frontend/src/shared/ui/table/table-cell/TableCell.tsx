import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./TableCell.module.scss";

interface TableCellProps {
  children: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
}

export const TableCell = ({ children, className, align = "left" }: TableCellProps) => {
  return (
    <td
      className={clsx(styles.cell, className, {
        [styles.center]: align === "center",
        [styles.right]: align === "right",
      })}
    >
      {children}
    </td>
  );
};
