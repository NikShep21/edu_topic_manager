export const formatFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} Б`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} КБ`;
  }

  return `${(size / 1024 / 1024).toFixed(1)} МБ`;
};
