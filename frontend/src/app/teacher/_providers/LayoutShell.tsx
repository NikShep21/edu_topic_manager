"use client";
import { nav } from "../_config/navigation";
import { DashboardShell } from "@/widgets/dashboard-shell";
import React from "react";

const LayoutShell = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardShell title="Управление темами" nav={nav}>
      {children}
    </DashboardShell>
  );
};

export default LayoutShell;
