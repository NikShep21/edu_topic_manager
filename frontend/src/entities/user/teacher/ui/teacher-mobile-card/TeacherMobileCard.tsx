"use client";

import type { ReactNode } from "react";

import { getFullName } from "@/entities/user/base/lib/getFullName";

import styles from "./TeacherMobileCard.module.scss";
import type { TeacherTableItem } from "@/entities/user/teacher/model/types";

interface TeacherMobileCardProps {
  teacher: TeacherTableItem;
  actions?: ReactNode;
}

export const TeacherMobileCard = ({ teacher, actions }: TeacherMobileCardProps) => {
  const fullName = getFullName(teacher);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.fullName}>{fullName}</h3>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Ученая степень</span>
          <span className={styles.metaValue}>{teacher.academic_degree.name}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Ученое звание</span>
          <span className={styles.metaValue}>{teacher.academic_title.name}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Должность</span>
          <span className={styles.metaValue}>{teacher.job_title.name}</span>
        </div>
      </div>
    </article>
  );
};
