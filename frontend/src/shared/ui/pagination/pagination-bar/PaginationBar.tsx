"use client";

import clsx from "clsx";

import { Pagination } from "../Pagination";
import styles from "./PaginationBar.module.scss";

interface PaginationBarProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  className?: string;
  paginationClassName?: string;
  emptyText?: string;
}

export const PaginationBar = ({
  page,
  pageSize,
  totalCount,
  onPageChange,
  className,
  paginationClassName,
  emptyText = "Нет записей",
}: PaginationBarProps) => {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = totalCount === 0 ? 0 : Math.min(page * pageSize, totalCount);

  return (
    <div className={clsx(styles.wrapper, className)}>
      <span className={styles.meta}>
        {totalCount > 0 ? `Показано ${from}–${to} из ${totalCount}` : emptyText}
      </span>

      <Pagination
        className={paginationClassName}
        page={page}
        pageSize={pageSize}
        totalCount={totalCount}
        onPageChange={onPageChange}
      />
    </div>
  );
};
