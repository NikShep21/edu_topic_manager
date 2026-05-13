"use client";
import { ProtectedRoute } from "@/app/_components/ProtectedRoute";
import { nav } from "@/app/student/_config/navigation";
import { getStudentTitle } from "@/app/student/_config/titles";
import { DashboardShell } from "@/widgets/dashboard-shell";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRole="student">
      <DashboardShell getTitle={getStudentTitle} nav={nav}>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
};

export default Layout;
