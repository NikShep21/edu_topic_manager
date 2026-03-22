import clsx from "clsx";
import styles from "./UserBadge.module.scss";
import type { UserRole } from "../../model/types";

interface UserBadgeProps {
  firstName: string;
  lastName: string;
  role: UserRole;
  className?: string;
}

export const UserBadge = ({ firstName, lastName, role, className }: UserBadgeProps) => {
  const fullName = `${firstName} ${lastName}`;
  const fallbackLetter = firstName.charAt(0).toUpperCase();

  return (
    <div className={clsx(styles.user, className)}>
      <div className={styles.avatar}>
        <span className={styles.avatarLetter}>{fallbackLetter}</span>
      </div>

      <div className={styles.info}>
        <p className={styles.fullName}>{fullName}</p>
        <span className={styles.role}>{role}</span>
      </div>
    </div>
  );
};
