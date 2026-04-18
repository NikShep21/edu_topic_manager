"use client";

import { useState } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { Header } from "@/widgets/header";
import styles from "./DashboardShell.module.scss";
import type { SidebarNavItem } from "@/widgets/sidebar";
import { useGetUser } from "@/entities/user/current";
import { usePathname } from "next/navigation";

interface DashboardShellProps {
  children: React.ReactNode;
  nav: SidebarNavItem[];
}

export const DashboardShell = ({ children, nav }: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const { data: userData } = useGetUser();

  const pathname = usePathname();

  const currentNavItem = nav.find((item) => item.href === pathname);
  const title = currentNavItem?.title ?? currentNavItem?.name ?? "Админ-панель";
  return (
    <div className={styles.layout}>
      <Sidebar
        nav={nav}
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        userData={userData}
      />
      <div className={styles.page}>
        <Header onOpenSidebar={openSidebar} title={title} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
