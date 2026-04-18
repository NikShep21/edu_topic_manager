"use client";

import type { StudentData } from "@/entities/user/base/model/types";

import type { SortDirection } from "@/shared/model/sort/types";
import { Table, TableBody, TableHead } from "@/shared/ui/table";
import type { StudentSortField } from "@/widgets/students-management/model/types";

import { StudentsTableHeader } from "../students-table-header/StudentsTableHeader";

import styles from "./StudentsDesktopTable.module.scss";
import { StudentRowActions, StudentTableRow } from "@/entities/user/student";

interface StudentsDesktopTableProps {
  students: StudentData[];
  sortField: StudentSortField;
  sortDirection: SortDirection;
  onSortChange: (field: StudentSortField) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  isSelected: (studentId: number) => boolean | undefined;
  onSelect: (studentId: number, checked: boolean) => void;
  onEdit: (studentId: number) => void;
  onDelete: (studentId: number) => void;
  onChangePassword: (studentId: number) => void;
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
  onEdit,
  onDelete,
  onChangePassword,
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
            actions={
              <StudentRowActions
                studentId={student.id}
                onEdit={onEdit}
                onDelete={onDelete}
                onChangePassword={onChangePassword}
              />
            }
          />
        ))}
      </TableBody>
    </Table>
  );
};
