"use client";
import type { ReactNode } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { TableCell, TableRow } from "@/shared/ui/table";

import styles from "./StudentTableRow.module.scss";

import { getFullName } from "@/entities/user/base/lib/getFullName";
import type { StudentTableItem } from "@/entities/user/student";

interface StudentTableRowProps {
  student: StudentTableItem;
  isSelected?: boolean;
  onSelect?: (studentId: number, checked: boolean) => void;
  actions?: ReactNode;
}

export const StudentTableRow = ({
  student,
  isSelected = false,
  onSelect,
  actions,
}: StudentTableRowProps) => {
  const fullName = getFullName(student);

  return (
    <TableRow isSelected={isSelected}>
      <TableCell className={styles.checkboxCell}>
        <Checkbox
          checked={isSelected}
          onChange={(event) => onSelect?.(student.id, event.target.checked)}
          aria-label={`Выбрать ${fullName}`}
        />
      </TableCell>

      <TableCell>
        <span className={styles.fullName}>{fullName}</span>
      </TableCell>

      <TableCell>{student.group}</TableCell>

      <TableCell align="center">{student.course}</TableCell>

      <TableCell align="center" className={styles.actionsCell}>
        {actions}
      </TableCell>
    </TableRow>
  );
};
