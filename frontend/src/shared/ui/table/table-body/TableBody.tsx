import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./TableBody.module.scss";
interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export const TableBody = ({ children, className }: TableBodyProps) => {
  return <tbody className={clsx(styles.body, className)}>{children}</tbody>;
};
