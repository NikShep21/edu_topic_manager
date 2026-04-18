"use client";

import type { ReactNode } from "react";

import { Checkbox } from "@/shared/ui/checkbox";
import { TableCell, TableRow } from "@/shared/ui/table";

import { getFullName } from "@/entities/user/base/lib/getFullName";

import styles from "./TeacherTableRow.module.scss";
import type { TeacherTableItem } from "@/entities/user/teacher/model/types";
import { TruncatedText } from "@/shared/ui/truncated-text";

interface TeacherTableRowProps {
  teacher: TeacherTableItem;
  isSelected?: boolean;
  onSelect?: (teacherId: number, checked: boolean) => void;
  actions?: ReactNode;
}

export const TeacherTableRow = ({
  teacher,
  isSelected = false,
  onSelect,
  actions,
}: TeacherTableRowProps) => {
  const fullName = getFullName(teacher);

  return (
    <TableRow isSelected={isSelected}>
      <TableCell className={styles.checkboxCell}>
        <Checkbox
          checked={isSelected}
          onChange={(event) => onSelect?.(teacher.id, event.target.checked)}
          aria-label={`Выбрать ${fullName}`}
        />
      </TableCell>

      <TableCell>
        <span className={styles.fullName}>{fullName}</span>
      </TableCell>

      <TableCell>
        <TruncatedText text={teacher.academic_degree.name} />
      </TableCell>

      <TableCell>
        <TruncatedText text={teacher.academic_title.name} />
      </TableCell>

      <TableCell>
        <TruncatedText text={teacher.job_title.name} />
      </TableCell>

      <TableCell align="center" className={styles.actionsCell}>
        {actions}
      </TableCell>
    </TableRow>
  );
};
