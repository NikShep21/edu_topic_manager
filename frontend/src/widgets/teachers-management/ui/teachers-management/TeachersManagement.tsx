"use client";

import { useEffect } from "react";

import styles from "./TeachersManagement.module.scss";

import { useSelection } from "@/shared/lib/hooks/use-selection/useSelection";
import { useToast } from "@/shared/model/toast/use-toast";
import { buildSelectOptions } from "@/shared/lib/select/buildSelectOptions";
import { PaginationBar } from "@/shared/ui/pagination";

import { useTeachersManagement } from "../../model/useTeachersManagement";
import { TeachersManagementToolbar } from "../teachers-management-toolbar/TeachersManagenentToolbar";
import { TeachersManagementContent } from "../teachers-management-content/TeachersManagementContent";

import { useTeachersFilterQuery, useTeachersQuery } from "@/entities/user/teacher";

export const TeachersManagement = () => {
  const teachersManagement = useTeachersManagement();
  const { showToast } = useToast();

  const { data, isLoading, isFetching, isError } = useTeachersQuery(
    teachersManagement.queryParams,
  );
  const { data: filterOptions } = useTeachersFilterQuery();

  const teachers = data?.results ?? [];

  const academicDegreeOptions = [
    { value: "all", label: "Все ученые степени" },
    ...buildSelectOptions(filterOptions?.academic_degrees ?? []),
  ];

  const academicTitleOptions = [
    { value: "all", label: "Все ученые звания" },
    ...buildSelectOptions(filterOptions?.academic_titles ?? []),
  ];

  const jobTitleOptions = [
    { value: "all", label: "Все должности" },
    ...buildSelectOptions(filterOptions?.job_titles ?? []),
  ];

  const { isAllSelected, handleSelectAll, isSelected, handleSelectOne, resetSelection } =
    useSelection(teachers);

  useEffect(() => {
    resetSelection();
  }, [
    teachersManagement.state.search,
    teachersManagement.state.academic_degree,
    teachersManagement.state.academic_title,
    teachersManagement.state.job_title,
    teachersManagement.state.sortField,
    teachersManagement.state.sortDirection,
    resetSelection,
  ]);

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: "Ошибка загрузки",
      message: "Не удалось получить список преподавателей",
      variant: "error",
    });
  }, [isError, showToast]);

  return (
    <div className={styles.wrapper}>
      <TeachersManagementToolbar
        search={teachersManagement.state.search}
        academicDegree={teachersManagement.state.academic_degree}
        academicTitle={teachersManagement.state.academic_title}
        jobTitle={teachersManagement.state.job_title}
        onSearchChange={teachersManagement.handleSearchChange}
        onAcademicDegreeChange={teachersManagement.handleAcademicDegreeChange}
        onAcademicTitleChange={teachersManagement.handleAcademicTitleChange}
        onJobTitleChange={teachersManagement.handleJobTitleChange}
        academicDegreeOptions={academicDegreeOptions}
        academicTitleOptions={academicTitleOptions}
        jobTitleOptions={jobTitleOptions}
      />

      <TeachersManagementContent
        teachers={teachers}
        sortField={teachersManagement.state.sortField}
        sortDirection={teachersManagement.state.sortDirection}
        onSortChange={teachersManagement.handleSortChange}
        isAllSelected={isAllSelected}
        onSelectAll={handleSelectAll}
        isSelected={isSelected}
        onSelect={handleSelectOne}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
      />

      <PaginationBar
        page={teachersManagement.state.page}
        pageSize={teachersManagement.state.pageSize}
        totalCount={data?.count ?? 0}
        onPageChange={teachersManagement.handlePageChange}
      />
    </div>
  );
};
