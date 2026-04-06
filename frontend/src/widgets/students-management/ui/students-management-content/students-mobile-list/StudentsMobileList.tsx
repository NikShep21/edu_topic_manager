"use client";

import type { StudentData } from "@/entities/user/base/model/types";

import styles from "./StudentsMobileList.module.scss";

interface StudentsMobileListProps {
  students: StudentData[];
}

export const StudentsMobileList = ({ students }: StudentsMobileListProps) => {
  return (
    <div className={styles.list}>
      {students.map((student) => (
        <div key={student.id} className={styles.placeholderCard}>
          {student.last_name} {student.first_name}
        </div>
      ))}
    </div>
  );
};
