import type { ApiError } from "@/shared/api";

export const getErrorToastContent = (error: ApiError<Record<string, unknown>>) => {
  if (error.status === 0) {
    return {
      title: "Ошибка сети",
      message:
        "Не удалось подключиться к серверу. Проверьте соединение и попробуйте снова.",
    };
  }

  if (error.status >= 500) {
    return {
      title: "Ошибка сервера",
      message: "На сервере произошла ошибка. Попробуйте позже.",
    };
  }

  return {
    title: "Ошибка",
    message: error.message,
  };
};
