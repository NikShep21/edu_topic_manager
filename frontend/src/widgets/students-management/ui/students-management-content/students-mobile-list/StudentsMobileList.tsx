"use client";

import { StudentMobileCard, StudentRowActions } from "@/entities/user/student";
import type { StudentData } from "@/entities/user/base/model/types";

import styles from "./StudentsMobileList.module.scss";

interface StudentsMobileListProps {
  students: StudentData[];
  onEdit: (studentId: number) => void;
  onDelete: (studentId: number) => void;
  onChangePassword: (studentId: number) => void;
}

export const StudentsMobileList = ({
  students,
  onEdit,
  onDelete,
  onChangePassword,
}: StudentsMobileListProps) => {
  return (
    <div className={styles.list}>
      {students.map((student) => (
        <StudentMobileCard
          key={student.id}
          student={student}
          actions={
            <StudentRowActions
              studentId={student.id}
              onEdit={onEdit}
              onDelete={onDelete}
              onChangePassword={onChangePassword}
            />
          }
        />
      ))}
    </div>
  );
};
