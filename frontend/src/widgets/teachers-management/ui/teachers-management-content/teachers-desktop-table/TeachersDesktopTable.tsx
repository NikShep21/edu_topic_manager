"use client";

import type { TeacherData } from "@/entities/user/base/model/types";
import { TeacherRowActions, TeacherTableRow } from "@/entities/user/teacher";

import type { SortDirection } from "@/shared/model/sort/types";
import { Table, TableBody, TableHead } from "@/shared/ui/table";

import type { TeacherSortField } from "@/widgets/teachers-management/model/types";

import { TeachersTableHeader } from "../teachers-table-header/TeachersTableHeader";

import styles from "./TeachersDesktopTable.module.scss";

interface TeachersDesktopTableProps {
  teachers: TeacherData[];
  sortField: TeacherSortField;
  sortDirection: SortDirection;
  onSortChange: (field: TeacherSortField) => void;
  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  isSelected: (teacherId: number) => boolean | undefined;
  onSelect: (teacherId: number, checked: boolean) => void;
  onEdit: (teacherId: number) => void;
  onDelete: (teacherId: number) => void;
  onChangePassword: (teacherId: number) => void;
}

export const TeachersDesktopTable = ({
  teachers,
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
}: TeachersDesktopTableProps) => {
  return (
    <Table className={styles.table}>
      <TableHead>
        <TeachersTableHeader
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={onSortChange}
          isAllSelected={isAllSelected}
          onSelectAll={onSelectAll}
        />
      </TableHead>

      <TableBody>
        {teachers.map((teacher) => (
          <TeacherTableRow
            key={teacher.id}
            teacher={teacher}
            isSelected={Boolean(isSelected(teacher.id))}
            onSelect={onSelect}
            actions={
              <TeacherRowActions
                teacherId={teacher.id}
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
