"use client";
import { nav } from "@/app/admin/_config/navigation";
import { DashboardShell } from "@/widgets/dashboard-shell";
import React from "react";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardShell title="Редактирование студентов" nav={nav}>
      {children}
    </DashboardShell>
  );
};

export default LayoutShell;
