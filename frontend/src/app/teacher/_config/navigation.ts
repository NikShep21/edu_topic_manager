import { TEACHER_ROUTES } from "@/app/teacher/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { PiStudentFill } from "react-icons/pi";

export const nav: SidebarNavItem[] = [
  {
    name: "Темы",
    href: TEACHER_ROUTES.topics,
    title: "Мои темы",
    icon: PiStudentFill,
  },
];
