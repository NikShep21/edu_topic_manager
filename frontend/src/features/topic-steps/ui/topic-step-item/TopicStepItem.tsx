import clsx from "clsx";
import { FiMenu, FiX } from "react-icons/fi";

import { IconButton } from "@/shared/ui/icon-button";
import { TruncatedText } from "@/shared/ui/truncated-text";

import type { TopicStep } from "../../model/types";

import styles from "./TopicStepItem.module.scss";

type TopicStepItemProps = {
  step: TopicStep;
  index: number;
  isDragging?: boolean;
  onRemove: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  onDrop: () => void;
};

export const TopicStepItem = ({
  step,
  index,
  isDragging = false,
  onRemove,
  onDragStart,
  onDragEnd,
  onDrop,
}: TopicStepItemProps) => {
  return (
    <div
      className={clsx(styles.step, {
        [styles.dragging]: isDragging,
      })}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDrop}
    >
      <button type="button" className={styles.dragHandle} aria-label="Перетащить этап">
        <FiMenu size={16} />
      </button>

      <span className={styles.stepNumber}>{index + 1}</span>

      <TruncatedText text={step.title} className={styles.stepTitle} />

      <IconButton
        icon={<FiX size={18} />}
        variant="ghost"
        size="sm"
        aria-label="Удалить этап"
        className={styles.removeButton}
        onClick={onRemove}
      />
    </div>
  );
};
