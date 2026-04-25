"use client";

import { SearchInput } from "@/shared/ui/input";
import { Select, type SelectOption } from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import { FaUpload } from "react-icons/fa";

import styles from "./TeachersManagementToolbar.module.scss";
import { ButtonCreateTeacher } from "@/features/button-create-teacher";

interface TeachersManagementToolbarProps {
  search: string;
  academicDegree: string;
  academicTitle: string;
  jobTitle: string;
  onSearchChange: (value: string) => void;
  onAcademicDegreeChange: (value: string) => void;
  onAcademicTitleChange: (value: string) => void;
  onJobTitleChange: (value: string) => void;
  academicDegreeOptions: SelectOption[];
  academicTitleOptions: SelectOption[];
  jobTitleOptions: SelectOption[];
}

export const TeachersManagementToolbar = ({
  search,
  academicDegree,
  academicTitle,
  jobTitle,
  onSearchChange,
  onAcademicDegreeChange,
  onAcademicTitleChange,
  onJobTitleChange,
  academicDegreeOptions,
  academicTitleOptions,
  jobTitleOptions,
}: TeachersManagementToolbarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.inputContainer}>
        <SearchInput
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Поиск преподавателя..."
          className={styles.input}
        />
        <ButtonCreateTeacher />
      </div>

      <div className={styles.additFunctions}>
        <div className={styles.filters}>
          <Select
            label="Ученая степень"
            value={academicDegree}
            onChange={onAcademicDegreeChange}
            options={academicDegreeOptions}
            placeholder="Все ученые степени"
          />

          <Select
            label="Ученое звание"
            value={academicTitle}
            onChange={onAcademicTitleChange}
            options={academicTitleOptions}
            placeholder="Все ученые звания"
          />

          <Select
            label="Должность"
            value={jobTitle}
            onChange={onJobTitleChange}
            options={jobTitleOptions}
            placeholder="Все должности"
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
