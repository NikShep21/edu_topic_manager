"use client";

import clsx from "clsx";
import { IoChevronDown } from "react-icons/io5";

import { Checkbox } from "@/shared/ui/checkbox";
import { TableHeaderCell, TableRow } from "@/shared/ui/table";
import type { SortDirection } from "@/shared/model/sort/types";

import type { TeacherSortField } from "@/widgets/teachers-management/model/types";

import styles from "./TeachersTableHeader.module.scss";

interface TeachersTableHeaderProps {
  sortField: TeacherSortField;
  sortDirection: SortDirection;
  onSortChange: (field: TeacherSortField) => void;
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

export const TeachersTableHeader = ({
  sortField,
  sortDirection,
  onSortChange,
  isAllSelected,
  onSelectAll,
}: TeachersTableHeaderProps) => {
  return (
    <TableRow>
      <TableHeaderCell>
        <Checkbox
          checked={isAllSelected}
          onChange={(event) => onSelectAll(event.target.checked)}
          aria-label="Выбрать всех преподавателей"
        />
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("full_name")}>
        <SortLabel active={sortField === "full_name"} direction={sortDirection}>
          ФИО
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("academic_degree")}>
        <SortLabel active={sortField === "academic_degree"} direction={sortDirection}>
          Ученая степень
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("academic_title")}>
        <SortLabel active={sortField === "academic_title"} direction={sortDirection}>
          Ученое звание
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell isInteractive onClick={() => onSortChange("job_title")}>
        <SortLabel active={sortField === "job_title"} direction={sortDirection}>
          Должность
        </SortLabel>
      </TableHeaderCell>

      <TableHeaderCell align="center" className={styles.actionsCell}>
        Действия
      </TableHeaderCell>
    </TableRow>
  );
};
