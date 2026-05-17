import { UserBadge } from "@/entities/user/current";
import type { StudentData, TeacherData } from "@/entities/user";

import styles from "./TopicSideInfo.module.scss";

type TopicSideInfoProps =
  | {
      type: "student";
      student: StudentData | null;
    }
  | {
      type: "teacher";
      teacher: TeacherData;
    };

export const TopicSideInfo = (props: TopicSideInfoProps) => {
  if (props.type === "student") {
    if (!props.student) {
      return <p className={styles.empty}>На эту тему пока никто не подал заявку</p>;
    }

    return (
      <div className={styles.userBlock}>
        <UserBadge userData={props.student} size="md" />

        <div className={styles.userInfo}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Курс:</span>
            <span className={styles.infoValue}>{props.student.course}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>Группа:</span>
            <span className={styles.infoValue}>{props.student.group.name}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userBlock}>
      <UserBadge userData={props.teacher} size="md" />
    </div>
  );
};
