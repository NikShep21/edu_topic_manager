import { Button } from "@/shared/ui/button";
import styles from "./ModalDefaultActions.module.scss";
import clsx from "clsx";

interface ModalDefaultActionsProps {
  text: string;
  onClose: () => void;
  formId?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

export const ModalDefaultActions = ({
  text,
  onClose,
  formId,
  onClick,
  isLoading,
}: ModalDefaultActionsProps) => {
  return (
    <div className={styles.actionsContainer}>
      <Button
        type="button"
        className={clsx(styles.buttonClose, styles.button)}
        variant="secondary"
        onClick={onClose}
      >
        Отмена
      </Button>

      <Button
        type={formId ? "submit" : "button"}
        form={formId}
        className={styles.button}
        isLoading={isLoading}
        onClick={onClick}
      >
        {text}
      </Button>
    </div>
  );
};
