import { ADMIN_ROUTES } from "./routes";

export const getAdminTitle = (href?: string) => {
  if (href === ADMIN_ROUTES.teachers) {
    return "Редактирование преподавателей";
  }

  if (href === ADMIN_ROUTES.students) {
    return "Редактирование студентов";
  }

  if (href === ADMIN_ROUTES.works) {
    return "Управление работами";
  }

  return "Админ-панель";
};
