import type { SidebarNavItem } from "@/widgets/sidebar";
import { PiStudentFill } from "react-icons/pi";

export const nav: SidebarNavItem[] = [
  {
    name: "Преподаватели",
    href: "/admin/teachers",
    icon: PiStudentFill,
  },
  {
    name: "Студенты",
    href: "/admin/students",
    icon: PiStudentFill,
  },
  {
    name: "Работы",
    href: "/admin/works",
    icon: PiStudentFill,
  },
];
