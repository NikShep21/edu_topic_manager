import { ApiError } from "@/shared/api";

export const getTopicErrorTitle = (error: unknown) => {
  if (error instanceof ApiError && error.status === 404) {
    return "Тема не найдена";
  }

  return "Не удалось загрузить тему";
};
