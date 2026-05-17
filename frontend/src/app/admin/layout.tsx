"use client";
import { ProtectedRoute } from "@/app/_components/ProtectedRoute";
import { nav } from "@/app/admin/_config/navigation";
import { getAdminTitle } from "@/app/admin/_config/titles";

import { DashboardShell } from "@/widgets/dashboard-shell";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRole="admin">
      <DashboardShell getTitle={getAdminTitle} nav={nav}>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
};

export default Layout;
