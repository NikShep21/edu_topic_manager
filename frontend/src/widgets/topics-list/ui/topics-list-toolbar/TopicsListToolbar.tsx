"use client";

import { Button } from "@/shared/ui/button";
import { SearchInput } from "@/shared/ui/input";
import { Select, type SelectOption } from "@/shared/ui/select";

import type { TopicsListRole } from "../../model/types";

import styles from "./TopicsListToolbar.module.scss";

interface TopicsListToolbarProps {
  role: TopicsListRole;

  search: string;
  status: string;
  teacher: string;
  type: string;

  statusOptions: SelectOption[];
  teacherOptions: SelectOption[];
  typeOptions: SelectOption[];

  isFilterOptionsLoading: boolean;
  canCreateTopic: boolean;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTeacherChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onCreateTopic: () => void;
}

export const TopicsListToolbar = ({
  role,
  search,
  status,
  teacher,
  type,
  statusOptions,
  teacherOptions,
  typeOptions,
  isFilterOptionsLoading,
  canCreateTopic,
  onSearchChange,
  onStatusChange,
  onTeacherChange,
  onTypeChange,
  onCreateTopic,
}: TopicsListToolbarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.inputContainer}>
        <SearchInput
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск темы..."
          className={styles.input}
        />

        {canCreateTopic ? (
          <Button size="md" onClick={onCreateTopic}>
            Создать тему
          </Button>
        ) : null}
      </div>

      <div className={styles.filters}>
        <Select
          label="Статус"
          value={status}
          onChange={onStatusChange}
          options={statusOptions}
          placeholder="Все статусы"
          isLoading={isFilterOptionsLoading}
        />

        {role === "student" ? (
          <Select
            label="Преподаватель"
            value={teacher}
            onChange={onTeacherChange}
            options={teacherOptions}
            placeholder="Все преподаватели"
            isSearchable
            isLoading={isFilterOptionsLoading}
          />
        ) : null}

        {role === "teacher" ? (
          <Select
            label="Тип"
            value={type}
            onChange={onTypeChange}
            options={typeOptions}
            placeholder="Все типы"
            isLoading={isFilterOptionsLoading}
          />
        ) : null}
      </div>
    </div>
  );
};
