import { FiDownload, FiFile } from "react-icons/fi";

import type { TopicFile } from "@/entities/topic";
import { formatFileSize } from "@/shared/lib/files/formatFileSize";
import { TruncatedText } from "@/shared/ui/truncated-text";

import styles from "./TopicFilesView.module.scss";

interface TopicFilesViewProps {
  files: TopicFile[];
}

export const TopicFilesView = ({ files }: TopicFilesViewProps) => {
  if (!files.length) {
    return <p className={styles.empty}>Материалы не прикреплены</p>;
  }

  return (
    <ul className={styles.list}>
      {files.map((file) => (
        <li key={file.id} className={styles.file}>
          <div className={styles.icon}>
            <FiFile size={18} />
          </div>

          <div className={styles.info}>
            <TruncatedText text={file.name} className={styles.name} />
            <span className={styles.size}>{formatFileSize(file.size)}</span>
          </div>

          <a href={file.url} download className={styles.download}>
            <FiDownload size={16} />
            <span>Скачать</span>
          </a>
        </li>
      ))}
    </ul>
  );
};
