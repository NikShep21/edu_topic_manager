import { FiFile, FiX } from "react-icons/fi";

import type { TopicFile } from "@/entities/topic";
import { IconButton } from "@/shared/ui/icon-button";
import { TruncatedText } from "@/shared/ui/truncated-text";

import styles from "./TopicFileItem.module.scss";

interface TopicFileItemProps {
  file: TopicFile | File;
  onRemove: () => void;
}

const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} Б`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} КБ`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} МБ`;
};

export const TopicFileItem = ({ file, onRemove }: TopicFileItemProps) => {
  return (
    <div className={styles.file}>
      <div className={styles.icon}>
        <FiFile size={16} />
      </div>

      <div className={styles.info}>
        <TruncatedText text={file.name} className={styles.name} />
        <span className={styles.size}>{formatFileSize(file.size)}</span>
      </div>

      <IconButton
        icon={<FiX size={18} />}
        variant="ghost"
        size="sm"
        aria-label="Удалить файл"
        className={styles.removeButton}
        onClick={onRemove}
      />
    </div>
  );
};
