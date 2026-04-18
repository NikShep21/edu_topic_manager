import { ADMIN_ROUTES } from "@/app/admin/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { PiStudentFill } from "react-icons/pi";

export const nav: SidebarNavItem[] = [
  {
    name: "Преподаватели",
    title: "Редактирование преподавателей",
    href: ADMIN_ROUTES.teachers,
    icon: PiStudentFill,
  },
  {
    name: "Студенты",
    title: "Редактирование студентов",
    href: ADMIN_ROUTES.students,
    icon: PiStudentFill,
  },
  {
    name: "Работы",
    title: "Управление работами",
    href: ADMIN_ROUTES.works,
    icon: PiStudentFill,
  },
];
