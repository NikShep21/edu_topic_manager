"use client";

import { ButtonCreateStudent } from "@/features/button-create-student";
import { SearchInput } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";

import { courseOptions, groupOptions } from "../../model/filterOptions";
import styles from "./StudentsManagementToolbar.module.scss";

interface StudentsManagementToolbarProps {
  search: string;
  group: string;
  course: string;
  onSearchChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onCourseChange: (value: string) => void;
}

export const StudentsManagementToolbar = ({
  search,
  group,
  course,
  onSearchChange,
  onGroupChange,
  onCourseChange,
}: StudentsManagementToolbarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.inputContainer}>
        <SearchInput
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск студента..."
          className={styles.input}
        />
        <ButtonCreateStudent />
      </div>

      <div className={styles.filters}>
        <Select
          label="Группа"
          value={group}
          onChange={onGroupChange}
          options={groupOptions}
          placeholder="Все группы"
        />

        <Select
          label="Курс"
          value={course}
          onChange={onCourseChange}
          options={courseOptions}
          placeholder="Все курсы"
        />
      </div>
    </div>
  );
};
