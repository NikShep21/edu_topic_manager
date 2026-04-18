import type { IconType } from "react-icons";

export interface SidebarNavItem {
  name: string;
  href: string;
  title?: string;
  icon?: IconType;
}
