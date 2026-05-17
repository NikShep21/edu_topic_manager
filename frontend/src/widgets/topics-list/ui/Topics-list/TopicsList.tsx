"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useTopicFilterOptionsQuery, useTopicsQuery } from "@/entities/topic";
import { buildSelectOptions } from "@/shared/lib/select/buildSelectOptions";
import { useToast } from "@/shared/model/toast/use-toast";
import { PaginationBar } from "@/shared/ui/pagination";

import { useTopicsList } from "../../model/useTopicsList";
import type { TopicsListRole } from "../../model/types";

import styles from "./TopicsList.module.scss";
import { TopicsListToolbar } from "@/widgets/topics-list/ui/topics-list-toolbar/TopicsListToolbar";
import { TopicsListContent } from "@/widgets/topics-list/ui/topics-list-content/TopicsListContent";

interface TopicsListProps {
  role: TopicsListRole;
  getTopicHref: (topicId: number) => string;
  createTopicHref?: string;
}

export const TopicsList = ({ role, getTopicHref, createTopicHref }: TopicsListProps) => {
  const router = useRouter();
  const { showToast } = useToast();

  const topicsList = useTopicsList(role);

  const { data, isLoading, isFetching, isError } = useTopicsQuery(topicsList.queryParams);

  const {
    data: filterOptions,
    isLoading: isFilterOptionsLoading,
    isError: isFilterOptionsError,
  } = useTopicFilterOptionsQuery(role);

  const topics = data?.results ?? [];

  const statusOptions = [
    { value: "all", label: "Все статусы" },
    ...buildSelectOptions(filterOptions?.statuses ?? []),
  ];

  const teacherOptions =
    role === "student" && filterOptions && "teachers" in filterOptions
      ? [
          { value: "all", label: "Все преподаватели" },
          ...buildSelectOptions(filterOptions.teachers),
        ]
      : [];

  const typeOptions =
    role === "teacher" && filterOptions && "types" in filterOptions
      ? [{ value: "all", label: "Все типы" }, ...buildSelectOptions(filterOptions.types)]
      : [];

  const handleTopicClick = (topicId: number) => {
    router.push(getTopicHref(topicId));
  };

  const handleCreateTopic = () => {
    if (!createTopicHref) {
      return;
    }

    router.push(createTopicHref);
  };

  useEffect(() => {
    if (!isError) {
      return;
    }

    showToast({
      title: "Ошибка загрузки",
      message: "Не удалось получить список тем",
      variant: "error",
    });
  }, [isError, showToast]);

  useEffect(() => {
    if (!isFilterOptionsError) {
      return;
    }

    showToast({
      title: "Ошибка загрузки",
      message: "Не удалось получить фильтры тем",
      variant: "error",
    });
  }, [isFilterOptionsError, showToast]);

  return (
    <div className={styles.wrapper}>
      <TopicsListToolbar
        role={role}
        search={topicsList.state.search}
        status={topicsList.state.status}
        teacher={topicsList.state.teacher}
        type={topicsList.state.type}
        statusOptions={statusOptions}
        teacherOptions={teacherOptions}
        typeOptions={typeOptions}
        isFilterOptionsLoading={isFilterOptionsLoading}
        canCreateTopic={role === "teacher" && Boolean(createTopicHref)}
        onSearchChange={topicsList.handleSearchChange}
        onStatusChange={topicsList.handleStatusChange}
        onTeacherChange={topicsList.handleTeacherChange}
        onTypeChange={topicsList.handleTypeChange}
        onCreateTopic={handleCreateTopic}
      />

      <TopicsListContent
        role={role}
        topics={topics}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onTopicClick={handleTopicClick}
      />

      <PaginationBar
        page={topicsList.state.page}
        pageSize={topicsList.state.pageSize}
        totalCount={data?.count ?? 0}
        onPageChange={topicsList.handlePageChange}
        emptyText=""
      />
    </div>
  );
};
