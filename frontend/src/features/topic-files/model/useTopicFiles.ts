import { useRef, useState } from "react";

import type { TopicFile } from "@/entities/topic";

import type { TopicFilesValue } from "./types";

interface UseTopicFilesParams {
  value: TopicFilesValue;
  onChange: (value: TopicFilesValue) => void;
}

const isExistingFile = (file: File | TopicFile): file is TopicFile => {
  return "id" in file;
};

export const useTopicFiles = ({ value, onChange }: UseTopicFilesParams) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const getFileKey = (file: File | TopicFile) => {
    if (isExistingFile(file)) {
      return `existing-${file.id}`;
    }

    return `new-${file.name}-${file.size}-${file.lastModified}`;
  };

  const addFiles = (fileList: FileList | File[]) => {
    const selectedFiles = Array.from(fileList);

    if (!selectedFiles.length) {
      return;
    }

    const existingKeys = new Set(value.files.map(getFileKey));
    const nextFiles = [...value.files];

    selectedFiles.forEach((file) => {
      const key = getFileKey(file);

      if (!existingKeys.has(key)) {
        nextFiles.push(file);
        existingKeys.add(key);
      }
    });

    onChange({
      ...value,
      files: nextFiles,
    });
  };

  const removeFile = (file: File | TopicFile) => {
    const nextFiles = value.files.filter((currentFile) => currentFile !== file);

    if (isExistingFile(file)) {
      const deletedIds = value.deletedIds.includes(file.id)
        ? value.deletedIds
        : [...value.deletedIds, file.id];

      onChange({
        files: nextFiles,
        deletedIds,
      });

      return;
    }

    onChange({
      ...value,
      files: nextFiles,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
    }

    event.target.value = "";
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragActive(false);
    addFiles(event.dataTransfer.files);
  };

  return {
    inputRef,
    isDragActive,
    openFileDialog,
    removeFile,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
};
