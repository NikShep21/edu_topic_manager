"use client";

import { ButtonCreateStudent } from "@/features/button-create-student";
import { SearchInput } from "@/shared/ui/input";
import { Select, type SelectOption } from "@/shared/ui/select";
import { FaUpload } from "react-icons/fa";

import styles from "./StudentsManagementToolbar.module.scss";
import { Button } from "@/shared/ui/button";

interface StudentsManagementToolbarProps {
  search: string;
  group: string;
  course: string;
  onSearchChange: (value: string) => void;
  onGroupChange: (value: string) => void;
  onCourseChange: (value: string) => void;
  groupOptions: SelectOption[];
  courseOptions: SelectOption[];
}

export const StudentsManagementToolbar = ({
  search,
  group,
  course,
  onSearchChange,
  onGroupChange,
  onCourseChange,
  groupOptions,
  courseOptions,
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
      <div className={styles.additFunctions}>
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
        <Button size="sm" variant="secondary" className={styles.upload}>
          <div className={styles.contentUpload}>
            <div className={styles.icon}>
              <FaUpload />
            </div>

            <p>Загрузить csv</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
