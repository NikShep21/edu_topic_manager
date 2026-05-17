"use client";
import { ProtectedRoute } from "@/app/_components/ProtectedRoute";
import { nav } from "@/app/teacher/_config/navigation";
import { getTeacherTitle } from "@/app/teacher/_config/titles";
import { DashboardShell } from "@/widgets/dashboard-shell";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRole="teacher">
      <DashboardShell nav={nav} getTitle={getTeacherTitle}>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
};

export default Layout;
