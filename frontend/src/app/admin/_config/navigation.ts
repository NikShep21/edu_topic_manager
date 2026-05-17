import { ADMIN_ROUTES } from "@/app/admin/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdWork } from "react-icons/md";

export const nav: SidebarNavItem[] = [
  {
    name: "Преподаватели",
    href: ADMIN_ROUTES.teachers,
    icon: FaChalkboardTeacher,
  },
  {
    name: "Студенты",
    href: ADMIN_ROUTES.students,
    icon: FaUserGraduate,
  },
  {
    name: "Работы",
    href: ADMIN_ROUTES.works,
    icon: MdWork,
  },
];
