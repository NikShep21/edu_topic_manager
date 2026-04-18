"use client";

import clsx from "clsx";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

import styles from "./Pagination.module.scss";

interface PaginationProps {
  page: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

type PaginationItem = number | "dots";

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => start + index);
};

const getPaginationItems = ({
  page,
  totalPages,
  siblingCount,
}: {
  page: number;
  totalPages: number;
  siblingCount: number;
}): PaginationItem[] => {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + siblingCount * 2;
    const leftRange = range(1, leftItemCount);

    return [...leftRange, "dots", totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + siblingCount * 2;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);

    return [1, "dots", ...rightRange];
  }

  return [1, "dots", ...range(leftSiblingIndex, rightSiblingIndex), "dots", totalPages];
};

export const Pagination = ({
  page,
  totalCount,
  pageSize,
  onPageChange,
  siblingCount = 1,
  className,
}: PaginationProps) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (totalPages <= 1) {
    return null;
  }

  const items = getPaginationItems({
    page,
    totalPages,
    siblingCount,
  });

  const handlePrev = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <nav className={clsx(styles.pagination, className)} aria-label="Пагинация">
      <button
        type="button"
        className={clsx(styles.arrowButton, {
          [styles.disabled]: page === 1,
        })}
        onClick={handlePrev}
        disabled={page === 1}
        aria-label="Предыдущая страница"
      >
        <IoChevronBack size={16} />
      </button>

      <div className={styles.pages}>
        {items.map((item, index) => {
          if (item === "dots") {
            return (
              <span key={`dots-${index}`} className={styles.dots}>
                ...
              </span>
            );
          }

          const isActive = item === page;

          return (
            <button
              key={item}
              type="button"
              className={clsx(styles.pageButton, {
                [styles.active]: isActive,
              })}
              onClick={() => onPageChange(item)}
              aria-current={isActive ? "page" : undefined}
            >
              {item}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        className={clsx(styles.arrowButton, {
          [styles.disabled]: page === totalPages,
        })}
        onClick={handleNext}
        disabled={page === totalPages}
        aria-label="Следующая страница"
      >
        <IoChevronForward size={16} />
      </button>
    </nav>
  );
};
