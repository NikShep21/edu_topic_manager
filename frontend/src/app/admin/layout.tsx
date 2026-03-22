"use client";

import { useState } from "react";

import { nav } from "./_config/navigation";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import styles from "./layout.module.scss";
import { Header } from "@/widgets/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className={styles.layout}>
      <Sidebar nav={nav} isOpen={isSidebarOpen} onClose={closeSidebar} />
      <div className={styles.page}>
        <Header onOpenSidebar={openSidebar} title={"Управление студентами"} />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
