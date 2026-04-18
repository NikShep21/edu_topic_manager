"use client";

import type { TeacherData } from "@/entities/user/base/model/types";
import { TeacherMobileCard, TeacherRowActions } from "@/entities/user/teacher";

import styles from "./TeachersMobileList.module.scss";

interface TeachersMobileListProps {
  teachers: TeacherData[];
  onEdit: (teacherId: number) => void;
  onDelete: (teacherId: number) => void;
  onChangePassword: (teacherId: number) => void;
}

export const TeachersMobileList = ({
  teachers,
  onEdit,
  onDelete,
  onChangePassword,
}: TeachersMobileListProps) => {
  return (
    <div className={styles.list}>
      {teachers.map((teacher) => (
        <TeacherMobileCard
          key={teacher.id}
          teacher={teacher}
          actions={
            <TeacherRowActions
              teacherId={teacher.id}
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
