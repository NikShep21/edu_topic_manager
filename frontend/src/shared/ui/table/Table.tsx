import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./Table.module.scss";

interface TableProps {
  children: ReactNode;
  className?: string;
}

export const Table = ({ children, className }: TableProps) => {
  return (
    <div className={styles.wrapper}>
      <table className={clsx(styles.table, className)}>{children}</table>
    </div>
  );
};
