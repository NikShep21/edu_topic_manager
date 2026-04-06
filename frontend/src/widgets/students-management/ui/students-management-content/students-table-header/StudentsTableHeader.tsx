"use client";

import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";

import { Checkbox } from "@/shared/ui/checkbox";
import { TableHeaderCell, TableRow } from "@/shared/ui/table";

import styles from "./StudentsTableHeader.module.scss";
import type { StudentSortField } from "@/widgets/students-management/model/types";
import type { SortDirection } from "@/shared/model/sort/types";

interface StudentsTableHeaderProps {
  sortField: StudentSortField;
  sortDirection: SortDirection;
  onSortChange: (field: StudentSortField) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
}

interface SortLabelProps {
  children: React.ReactNode;
  active: boolean;
  direction: SortDirection;
}

const SortLabel = ({ children, active, direction }: SortLabelProps) => {
  return (
    <span className={styles.sortLabel}>
      <span>{children}</span>
      <span
        className={clsx(styles.sortIcon, {
          [styles.sortIconActive]: active,
          [styles.sortIconDesc]: active && direction === "desc",
        })}
        aria-hidden="true"
      >
        <IoChevronDown size={14} />
      </span>
    </span>
  );
};

export const StudentsTableHeader = ({
  sortField,
  sortDirection,
  onSortChange,
  isAllSelected,
  onSelectAll,
}: StudentsTableHeaderProps) => {
  return (
    <TableRow>
      <TableHeaderCell>
        <Checkbox
          checked={isAllSelected}
          onChange={(event) => onSelectAll(event.target.checked)}
          aria-label="Выбрать всех студентов"
        />
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("full_name")}>
        <SortLabel active={sortField === "full_name"} direction={sortDirection}>
          ФИО
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("group")}>
        <SortLabel active={sortField === "group"} direction={sortDirection}>
          Группа
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell
        isInteractive
        align="center"
        onClick={() => onSortChange("course")}
      >
        <SortLabel active={sortField === "course"} direction={sortDirection}>
          Курс
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell align="center" className={styles.actionsCell}>
        Действия
      </TableHeaderCell>
    </TableRow>
  );
};
