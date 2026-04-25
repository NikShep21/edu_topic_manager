"use client";

import type { TeacherData } from "@/entities/user";
import type { SortDirection } from "@/shared/model/sort/types";
import { Spinner } from "@/shared/ui/spinner";

import { DeleteUserModal } from "@/features/delete-user";
import { EditTeacherModal } from "@/features/edit-teacher";

import type { TeacherSortField } from "../../model/types";
import { useTeacherActions } from "../../model/useTeacherActions";

import styles from "./TeachersManagementContent.module.scss";
import { TeachersDesktopTable } from "@/widgets/teachers-management/ui/teachers-management-content/teachers-desktop-table/TeachersDesktopTable";
import { TeachersMobileList } from "@/widgets/teachers-management/ui/teachers-management-content/teachers-mobile-list/TeachersMobileList";

interface TeachersManagementContentProps {
  teachers: TeacherData[];
  sortField: TeacherSortField;
  sortDirection: SortDirection;
  onSortChange: (field: TeacherSortField) => void;

  isAllSelected: boolean;
  onSelectAll: (checked: boolean) => void;
  isSelected: (teacherId: number) => boolean | undefined;
  onSelect: (teacherId: number, checked: boolean) => void;

  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
}

export const TeachersManagementContent = ({
  teachers,
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
}: TeachersManagementContentProps) => {
  const hasTeachers = teachers.length > 0;

  const {
    activeAction,
    selectedTeacher,
    openEdit,
    openDelete,
    openChangePassword,
    closeAction,
  } = useTeacherActions({ teachers });

  return (
    <div className={styles.tableWrapper}>
      {!isLoading && !isError && hasTeachers ? (
        <>
          <div className={styles.desktopOnly}>
            <TeachersDesktopTable
              teachers={teachers}
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
            <TeachersMobileList
              teachers={teachers}
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

      {!isLoading && !isError && !hasTeachers ? (
        <div className={styles.state}>Преподаватели не найдены</div>
      ) : null}

      {isFetching && !isLoading ? (
        <div className={styles.fetchingOverlay}>
          <Spinner size="sm" />
        </div>
      ) : null}

      <EditTeacherModal
        isOpen={activeAction?.type === "edit"}
        onClose={closeAction}
        teacher={selectedTeacher}
      />

      <DeleteUserModal
        isOpen={activeAction?.type === "delete"}
        onClose={closeAction}
        user={selectedTeacher}
      />

      {/*
      <ChangeTeacherPasswordModal
        isOpen={activeAction?.type === "change-password"}
        onClose={closeAction}
        user={selectedTeacher}
      />
      */}
    </div>
  );
};
