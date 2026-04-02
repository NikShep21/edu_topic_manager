import { STUDENT_ROUTES } from "@/app/student/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { PiStudentFill } from "react-icons/pi";

export const nav: SidebarNavItem[] = [
  {
    name: "Выбор Темы",
    href: STUDENT_ROUTES.topics,
    icon: PiStudentFill,
  },
  {
    name: "Моя тема",
    href: STUDENT_ROUTES.myTopic,
    icon: PiStudentFill,
  },
];
