"use client";

import { PublicRoute } from "@/app/_components/PublicRoute";

interface LayoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: LayoutProps) => {
  return <PublicRoute>{children}</PublicRoute>;
};

export default layout;
