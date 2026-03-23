"use client";

import { useState } from "react";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { Header } from "@/widgets/header";
import styles from "./DashboardShell.module.scss";
import type { SidebarNavItem } from "@/widgets/sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  nav: SidebarNavItem[];
  title: string;
}

export const DashboardShell = ({ children, nav, title }: DashboardShellProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.layout}>
      <Sidebar nav={nav} isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className={styles.page}>
        <Header onOpenSidebar={openSidebar} title={title} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};
