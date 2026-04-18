"use client";

import { useMemo, useState } from "react";

import type { TeacherSortField, TeachersManagementState } from "./types";
import { buildTeachersQueryParams } from "./buildTeachersQueryParams";
import { toggleSortDirection } from "@/shared/model/sort/toggle-sort-direction";

const DEFAULT_STATE: TeachersManagementState = {
  search: "",
  academic_degree: "all",
  academic_title: "all",
  job_title: "all",
  sortField: "full_name",
  sortDirection: "asc",
  page: 1,
  pageSize: 10,
};

export const useTeachersManagement = () => {
  const [state, setState] = useState<TeachersManagementState>(DEFAULT_STATE);

  const queryParams = useMemo(() => {
    return buildTeachersQueryParams(state);
  }, [state]);

  const handleSearchChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      search: value,
      page: 1,
    }));
  };

  const handleAcademicDegreeChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      academic_degree: value,
      page: 1,
    }));
  };

  const handleAcademicTitleChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      academic_title: value,
      page: 1,
    }));
  };

  const handleJobTitleChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      job_title: value,
      page: 1,
    }));
  };

  const handleSortChange = (field: TeacherSortField) => {
    setState((prevState) => {
      if (prevState.sortField === field) {
        return {
          ...prevState,
          sortDirection: toggleSortDirection(prevState.sortDirection),
          page: 1,
        };
      }

      return {
        ...prevState,
        sortField: field,
        sortDirection: "asc",
        page: 1,
      };
    });
  };

  const handlePageChange = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handlePageSizeChange = (pageSize: number) => {
    setState((prevState) => ({
      ...prevState,
      pageSize,
      page: 1,
    }));
  };

  const resetFilters = () => {
    setState(DEFAULT_STATE);
  };

  return {
    state,
    queryParams,

    handleSearchChange,
    handleAcademicDegreeChange,
    handleAcademicTitleChange,
    handleJobTitleChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    resetFilters,
  };
};
