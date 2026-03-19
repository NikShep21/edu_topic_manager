import { Sidebar } from "@/widgets/sidebar";
import styles from "./layout.module.scss";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar
        nav={[
          { name: "Преподаватели", href: "/admin/teachers" },
          { name: "Студенты", href: "/admin/students" },
          { name: "работы", href: "/admin/works" },
        ]}
      />
      <div className={styles.mainContent}>
        {/* <Header /> */}
        {children}
      </div>
    </>
  );
};
export default Layout;
