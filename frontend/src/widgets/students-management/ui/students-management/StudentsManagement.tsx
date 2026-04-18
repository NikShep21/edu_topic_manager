"use client";

import { useEffect } from "react";

import styles from "./StudentsManagement.module.scss";

import { useSelection } from "@/shared/lib/hooks/use-selection/useSelection";
import { useToast } from "@/shared/model/toast/use-toast";

import { useStudentsManagement } from "../../model/useStudentsManagement";
import { StudentsManagementToolbar } from "../students-management-toolbar/StudentsManagementToolbar";
import { StudentsManagementContent } from "../students-management-content/StudentsManagementContent";
import { useStudentsFilterQuery, useStudentsQuery } from "@/entities/user/student";
import { buildSelectOptions } from "@/shared/lib/select/buildSelectOptions";
import { PaginationBar } from "@/shared/ui/pagination";

export const StudentsManagement = () => {
  const studentsManagement = useStudentsManagement();
  const { showToast } = useToast();

  const { data, isLoading, isFetching, isError } = useStudentsQuery(
    studentsManagement.queryParams,
  );
  const { data: filterOptions } = useStudentsFilterQuery();

  const students = data?.results ?? [];
  const groupOptions = [
    { value: "all", label: "Все группы" },
    ...buildSelectOptions(filterOptions?.groups ?? []),
  ];
  const courseOptions = [
    { value: "all", label: "Все курсы" },
    ...buildSelectOptions(filterOptions?.courses ?? []),
  ];

  const { isAllSelected, handleSelectAll, isSelected, handleSelectOne, resetSelection } =
    useSelection(students);

  useEffect(() => {
    resetSelection();
  }, [
    studentsManagement.state.search,
    studentsManagement.state.group,
    studentsManagement.state.course,
    studentsManagement.state.sortField,
    studentsManagement.state.sortDirection,
    resetSelection,
  ]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: "Ошибка загрузки",
      message: "Не удалось получить список студентов",
      variant: "error",
    });
  }, [isError, showToast]);

  return (
    <div className={styles.wrapper}>
      <StudentsManagementToolbar
        search={studentsManagement.state.search}
        group={studentsManagement.state.group}
        course={studentsManagement.state.course}
        onSearchChange={studentsManagement.handleSearchChange}
        onGroupChange={studentsManagement.handleGroupChange}
        onCourseChange={studentsManagement.handleCourseChange}
        groupOptions={groupOptions}
        courseOptions={courseOptions}
      />

      <StudentsManagementContent
        students={students}
        sortField={studentsManagement.state.sortField}
        sortDirection={studentsManagement.state.sortDirection}
        onSortChange={studentsManagement.handleSortChange}
        isAllSelected={isAllSelected}
        onSelectAll={handleSelectAll}
        isSelected={isSelected}
        onSelect={handleSelectOne}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
      />
      <PaginationBar
        page={studentsManagement.state.page}
        pageSize={studentsManagement.state.pageSize}
        totalCount={data?.count ?? 0}
        onPageChange={studentsManagement.handlePageChange}
      />
    </div>
  );
};
