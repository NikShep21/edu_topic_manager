import { ADMIN_ROUTES } from "@/app/admin/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { PiStudentFill } from "react-icons/pi";

export const nav: SidebarNavItem[] = [
  {
    name: "Преподаватели",
    href: ADMIN_ROUTES.teachers,
    icon: PiStudentFill,
  },
  {
    name: "Студенты",
    href: ADMIN_ROUTES.students,
    icon: PiStudentFill,
  },
  {
    name: "Работы",
    href: ADMIN_ROUTES.works,
    icon: PiStudentFill,
  },
];
