import clsx from "clsx";
import { FiFilePlus, FiPaperclip, FiPlus } from "react-icons/fi";

import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field-error";
import { Panel, PanelContent, PanelHeader } from "@/shared/ui/panel";

import styles from "./TopicFiles.module.scss";
import type { TopicFilesValue } from "@/features/topic-files/model/types";
import { useTopicFiles } from "@/features/topic-files/model/useTopicFiles";
import { TopicFileItem } from "@/features/topic-files/ui/topic-file-item/TopicFileItem";

interface TopicFilesProps {
  value: TopicFilesValue;
  onChange: (value: TopicFilesValue) => void;
  error?: string;
}

export const TopicFiles = ({ value, onChange, error }: TopicFilesProps) => {
  const {
    inputRef,
    isDragActive,
    openFileDialog,
    removeFile,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useTopicFiles({ value, onChange });

  return (
    <Panel>
      <PanelHeader
        title={
          <span className={styles.title}>
            <FiPaperclip size={18} />
            Материалы
          </span>
        }
        subtitle="Добавьте файлы, которые относятся к теме"
      />

      <PanelContent>
        <div className={styles.content}>
          <div
            className={clsx(styles.dropZone, {
              [styles.dropZoneActive]: isDragActive,
            })}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              ref={inputRef}
              className={styles.fileInput}
              type="file"
              multiple
              onChange={handleInputChange}
            />

            <div className={styles.dropIcon}>
              <FiFilePlus size={22} />
            </div>

            <div className={styles.dropInfo}>
              <p className={styles.dropTitle}>Перетащите файлы сюда</p>
            </div>

            <Button type="button" variant="secondary" size="sm" onClick={openFileDialog}>
              <span className={styles.addButtonContent}>
                <FiPlus size={16} />
                Выбрать файлы
              </span>
            </Button>
          </div>

          {value.files.length > 0 ? (
            <div className={styles.list}>
              {value.files.map((file, index) => (
                <TopicFileItem
                  key={"id" in file ? file.id : `${file.name}-${file.size}-${index}`}
                  file={file}
                  onRemove={() => removeFile(file)}
                />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>Файлы пока не добавлены.</div>
          )}

          {error && <FieldError message={error} className={styles.error} />}
        </div>
      </PanelContent>
    </Panel>
  );
};
