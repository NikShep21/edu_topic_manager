"use client";

import type { StudentData } from "@/entities/user";
import { DeleteUserModal } from "@/features/delete-user";
import { EditStudentModal } from "@/features/edit-student";
import type { SortDirection } from "@/shared/model/sort/types";
import { Spinner } from "@/shared/ui/spinner";

import type { StudentSortField } from "../../model/types";
import { useStudentActions } from "../../model/useStudentActions";
import { StudentsDesktopTable } from "./students-desktop-table/StudentsDesktopTable";
import { StudentsMobileList } from "./students-mobile-list/StudentsMobileList";

import styles from "./StudentsManagementContent.module.scss";

interface StudentsManagementContentProps {
  students: StudentData[];
  sortField: StudentSortField;
  sortDirection: SortDirection;
  onSortChange: (field: StudentSortField) => void;

  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  isSelected: (studentId: number) => boolean | undefined;
  onSelect: (studentId: number, checked: boolean) => void;

  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

export const StudentsManagementContent = ({
  students,
  sortField,
  sortDirection,
  onSortChange,
  isAllSelected,
  onSelectAll,
  isSelected,
  onSelect,
  isLoading,
  isFetching,
  isError,
}: StudentsManagementContentProps) => {
  const hasStudents = students.length > 0;

  const {
    activeAction,
    selectedStudent,
    openEdit,
    openDelete,
    openChangePassword,
    closeAction,
  } = useStudentActions({ students });

  return (
    <div className={styles.tableWrapper}>
      {!isLoading && !isError && hasStudents ? (
        <>
          <div className={styles.desktopOnly}>
            <StudentsDesktopTable
              students={students}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={onSortChange}
              isAllSelected={isAllSelected}
              onSelectAll={onSelectAll}
              isSelected={isSelected}
              onSelect={onSelect}
              onEdit={openEdit}
              onDelete={openDelete}
              onChangePassword={openChangePassword}
            />
          </div>

          <div className={styles.mobileOnly}>
            <StudentsMobileList
              students={students}
              onEdit={openEdit}
              onDelete={openDelete}
              onChangePassword={openChangePassword}
            />
          </div>
        </>
      ) : null}

      {isLoading ? (
        <div className={styles.state}>
          <Spinner />
        </div>
      ) : null}

      {!isLoading && !isError && !hasStudents ? (
        <div className={styles.state}>Студенты не найдены</div>
      ) : null}

      {isFetching && !isLoading ? (
        <div className={styles.fetchingOverlay}>
          <Spinner size="sm" />
        </div>
      ) : null}

      <EditStudentModal
        isOpen={activeAction?.type === "edit"}
        onClose={closeAction}
        student={selectedStudent}
      />

      <DeleteUserModal
        isOpen={activeAction?.type === "delete"}
        onClose={closeAction}
        user={selectedStudent}
      />
      {/*
      <ChangeStudentPasswordModal
        isOpen={activeAction?.type === "change-password"}
        onClose={closeAction}
        user={selectedStudent}
      />
      */}
    </div>
  );
};
