import clsx from "clsx";
import styles from "./UserBadge.module.scss";
import type { UserData } from "../../../base/model/types";

type UserBadgeSize = "sm" | "md" | "lg";

interface UserBadgeProps {
  userData?: UserData;
  className?: string;
  size?: UserBadgeSize;
}

export const UserBadge = ({ userData, className, size = "md" }: UserBadgeProps) => {
  if (!userData) {
    return null;
  }

  const fullName = `${userData.first_name} ${userData.last_name}`;
  const fallbackLetter = userData.first_name.charAt(0).toUpperCase();

  return (
    <div className={clsx(styles.user, styles[size], className)}>
      <div className={styles.avatar}>
        <span className={styles.avatarLetter}>{fallbackLetter}</span>
      </div>

      <div className={styles.info}>
        <p className={styles.fullName}>{fullName}</p>
        <span className={styles.role}>{userData.role}</span>
      </div>
    </div>
  );
};
