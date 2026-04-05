"use client";

import { useEffect } from "react";
import { IoEllipsisHorizontal } from "react-icons/io5";

import styles from "./StudentsManagement.module.scss";

import { useStudentsQuery } from "@/entities/user/student/model/useGetStudents";
import { StudentTableRow } from "@/entities/user/student/ui/student-table-row/StudentTableRow";
import { ButtonCreateStudent } from "@/features/button-create-student";
import { useSelection } from "@/shared/lib/hooks/use-selection/useSelection";
import { useToast } from "@/shared/model/toast/use-toast";
import { IconButton } from "@/shared/ui/icon-button";
import { SearchInput } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Spinner } from "@/shared/ui/spinner";
import { Table, TableBody, TableHead } from "@/shared/ui/table";

import { courseOptions, groupOptions } from "../../model/filterOptions";
import { useStudentsManagement } from "../../model/useStudentsManagement";
import { StudentsTableHeader } from "@/widgets/students-management/ui/students-management/students-table-header/StudentsTableHeader";

export const StudentsManagement = () => {
  const studentsManagement = useStudentsManagement();
  const { showToast } = useToast();

  const { data, isLoading, isFetching, isError } = useStudentsQuery(
    studentsManagement.queryParams,
  );

  const students = data ?? [];
  const hasStudents = students.length > 0;

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
      <div className={styles.header}>
        <div className={styles.inputContainer}>
          <SearchInput
            onChange={(event) =>
              studentsManagement.handleSearchChange(event.target.value)
            }
            value={studentsManagement.state.search}
            placeholder="Поиск студента..."
            className={styles.input}
          />
          <ButtonCreateStudent />
        </div>

        <div className={styles.filters}>
          <Select
            label="Группа"
            value={studentsManagement.state.group}
            onChange={studentsManagement.handleGroupChange}
            options={groupOptions}
            placeholder="Все группы"
          />

          <Select
            label="Курс"
            value={studentsManagement.state.course}
            onChange={studentsManagement.handleCourseChange}
            options={courseOptions}
            placeholder="Все курсы"
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <Table className={styles.table}>
          <TableHead>
            <StudentsTableHeader
              sortField={studentsManagement.state.sortField}
              sortDirection={studentsManagement.state.sortDirection}
              onSortChange={studentsManagement.handleSortChange}
              isAllSelected={isAllSelected}
              onSelectAll={handleSelectAll}
            />
          </TableHead>

          <TableBody>
            {hasStudents
              ? students.map((student) => (
                  <StudentTableRow
                    key={student.id}
                    student={student}
                    isSelected={Boolean(isSelected(student.id))}
                    onSelect={handleSelectOne}
                    actions={<IconButton icon={<IoEllipsisHorizontal />} />}
                  />
                ))
              : null}
          </TableBody>
        </Table>

        {isLoading ? (
          <div className={styles.state}>
            <Spinner />
          </div>
        ) : null}

        {!isLoading && !isError && !hasStudents ? (
          <div className={styles.state}>Студенты не найдены</div>
        ) : null}

        {isFetching && !isLoading ? (
          <div className={styles.fetchingOverlay}>
            <Spinner size="sm" />
          </div>
        ) : null}
      </div>
    </div>
  );
};
