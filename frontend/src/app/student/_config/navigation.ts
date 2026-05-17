import { STUDENT_ROUTES } from "@/app/student/_config/routes";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { MdAssignmentTurnedIn, MdTopic } from "react-icons/md";

export const nav: SidebarNavItem[] = [
  {
    name: "Выбор темы",
    href: STUDENT_ROUTES.topics,
    icon: MdTopic,
  },
  {
    name: "Моя тема",
    href: STUDENT_ROUTES.myTopic,
    icon: MdAssignmentTurnedIn,
  },
];
