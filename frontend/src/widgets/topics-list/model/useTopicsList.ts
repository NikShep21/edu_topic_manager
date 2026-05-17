"use client";

import { useMemo, useState } from "react";

import { buildTopicsQueryParams } from "./buildTopicsQueryParams";
import type { TopicsListRole, TopicsListState } from "./types";

const DEFAULT_STATE: TopicsListState = {
  search: "",
  status: "all",
  teacher: "all",
  type: "all",
  page: 1,
  pageSize: 10,
};

export const useTopicsList = (role: TopicsListRole) => {
  const [state, setState] = useState<TopicsListState>(DEFAULT_STATE);

  const queryParams = useMemo(() => {
    return buildTopicsQueryParams(role, state);
  }, [role, state]);

  const handleSearchChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      search: value,
      page: 1,
    }));
  };

  const handleStatusChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      status: value as TopicsListState["status"],
      page: 1,
    }));
  };

  const handleTeacherChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      teacher: value,
      page: 1,
    }));
  };

  const handleTypeChange = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      type: value as TopicsListState["type"],
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const resetFilters = () => {
    setState(DEFAULT_STATE);
  };

  return {
    state,
    queryParams,

    handleSearchChange,
    handleStatusChange,
    handleTeacherChange,
    handleTypeChange,
    handlePageChange,
    resetFilters,
  };
};
