"use client";

import { PublicRoute } from "@/app/_components/PublicRoute";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <PublicRoute>{children}</PublicRoute>;
};

export default Layout;
