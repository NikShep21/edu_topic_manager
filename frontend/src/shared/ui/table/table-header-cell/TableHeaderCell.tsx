import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./TableHeaderCell.module.scss";

interface TableHeaderCellProps {
  children?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  isInteractive?: boolean;
  onClick?: () => void;
}

export const TableHeaderCell = ({
  children,
  className,
  align = "left",
  isInteractive = false,
  onClick,
}: TableHeaderCellProps) => {
  return (
    <th
      className={clsx(styles.cell, className, {
        [styles.center]: align === "center",
        [styles.right]: align === "right",
        [styles.interactive]: isInteractive,
      })}
      onClick={onClick}
      scope="col"
    >
      {children}
    </th>
  );
};
