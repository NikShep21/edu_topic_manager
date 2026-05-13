import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";

export const getTeacherTitle = (href?: string) => {
  console.log("getTeacherTitle called with href:", href);
  if (href === TEACHER_ROUTES.topics) {
    return "Мои темы";
  }

  if (href === TEACHER_ROUTES.topicCreate) {
    return "Создание темы";
  }

  if (href?.startsWith("/teacher/topics/") && href?.endsWith("/edit")) {
    return "Редактирование темы";
  }

  return "Панель преподавателя";
};
