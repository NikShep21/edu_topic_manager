import { STUDENT_ROUTES } from "./routes";

export const getStudentTitle = (href?: string) => {
  if (href === STUDENT_ROUTES.topics) {
    return "Выбор темы";
  }

  if (href === STUDENT_ROUTES.myTopic) {
    return "Моя тема";
  }

  return "Панель студента";
};
