import { Button } from "@/shared/ui/button";

import styles from "./PageError.module.scss";

interface PageErrorProps {
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const PageError = ({
  title,
  description,
  actionText,
  onAction,
}: PageErrorProps) => {
  return (
    <div className={styles.error}>
      <h2 className={styles.title}>{title}</h2>

      {description && <p className={styles.description}>{description}</p>}

      {actionText && onAction && (
        <Button type="button" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
