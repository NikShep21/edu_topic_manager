import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { MdTopic } from "react-icons/md";

export const nav: SidebarNavItem[] = [
  {
    name: "Темы",
    href: TEACHER_ROUTES.topics,
    icon: MdTopic,
  },
];
