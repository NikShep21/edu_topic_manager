"use client";

import { StudentTableRow } from "@/entities/user/student/ui/student-table-row/StudentTableRow";
import { StudentRowActions } from "@/entities/user/student/ui/student-row-actions/StudentRowActions";
import { Table, TableBody, TableHead } from "@/shared/ui/table";
import type { SortDirection } from "@/shared/model/sort/types";

import type { StudentData } from "@/entities/user/base/model/types";
import type { StudentSortField } from "@/widgets/students-management/model/types";

import { StudentsTableHeader } from "../students-table-header/StudentsTableHeader";

import styles from "./StudentsDesktopTable.module.scss";

interface StudentsDesktopTableProps {
  students: StudentData[];
  sortField: StudentSortField;
  sortDirection: SortDirection;
  onSortChange: (field: StudentSortField) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  isSelected: (studentId: number) => boolean | undefined;
  onSelect: (studentId: number, checked: boolean) => void;
}

export const StudentsDesktopTable = ({
  students,
  sortField,
  sortDirection,
  onSortChange,
  isAllSelected,
  onSelectAll,
  isSelected,
  onSelect,
}: StudentsDesktopTableProps) => {
  return (
    <Table className={styles.table}>
      <TableHead>
        <StudentsTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
        />
      </TableHead>

      <TableBody>
        {students.map((student) => (
          <StudentTableRow
            key={student.id}
            student={student}
            isSelected={Boolean(isSelected(student.id))}
            onSelect={onSelect}
            actions={<StudentRowActions studentId={student.id} />}
          />
        ))}
      </TableBody>
    </Table>
  );
};
