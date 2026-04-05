"use client";

import { useMemo, useState } from "react";
import type { StudentSortField, StudentsManagementState } from "./types";
import { buildStudentsQueryParams } from "@/widgets/students-management/model/buildStudentsQueryParams";

const DEFAULT_STATE: StudentsManagementState = {
  search: "",
  group: "all",
  course: "all",
  sortField: "full_name",
  sortDirection: "asc",
  page: 1,
  pageSize: 10,
};

export const useStudentsManagement = () => {
  const [state, setState] = useState<StudentsManagementState>(DEFAULT_STATE);

  const queryParams = useMemo(() => {
    return buildStudentsQueryParams(state);
  }, [state]);

  const handleSearchChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      search: value,
      page: 1,
    }));
  };

  const handleGroupChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      group: value,
      page: 1,
    }));
  };

  const handleCourseChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      course: value,
      page: 1,
    }));
  };

  const handleSortChange = (field: StudentSortField) => {
    setState((prevState) => {
      if (prevState.sortField === field) {
        return {
          ...prevState,
          sortDirection: prevState.sortDirection === "asc" ? "desc" : "asc",
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
    handleGroupChange,
    handleCourseChange,
    handleSortChange,
    handlePageChange,
    handlePageSizeChange,
    resetFilters,
  };
};
