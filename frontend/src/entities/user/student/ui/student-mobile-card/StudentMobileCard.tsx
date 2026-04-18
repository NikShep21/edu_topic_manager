"use client";

import type { ReactNode } from "react";

import { getFullName } from "@/entities/user/base/lib/getFullName";
import type { StudentTableItem } from "@/entities/user/student";

import styles from "./StudentMobileCard.module.scss";

interface StudentMobileCardProps {
  student: StudentTableItem;
  actions?: ReactNode;
}

export const StudentMobileCard = ({ student, actions }: StudentMobileCardProps) => {
  const fullName = getFullName(student);

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.fullName}>{fullName}</h3>
        {actions ? <div className={styles.actions}>{actions}</div> : null}
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Группа</span>
          <span className={styles.metaValue}>{student.group.name}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>Курс</span>
          <span className={styles.metaValue}>{student.course}</span>
        </div>
      </div>
    </article>
  );
};
