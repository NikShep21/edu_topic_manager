import clsx from "clsx";
import styles from "./UserBadge.module.scss";
import type { UserData } from "../../model/types";

interface UserBadgeProps {
  userData?: UserData;
  className?: string;
}

export const UserBadge = ({ userData, className }: UserBadgeProps) => {
  if (!userData) {
    return null;
  }

  console.log("UserBadge", { userData });
  const fullName = `${userData.firstName} ${userData.lastName}`;
  const fallbackLetter = userData.firstName.charAt(0).toUpperCase();

  return (
    <div className={clsx(styles.user, className)}>
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
