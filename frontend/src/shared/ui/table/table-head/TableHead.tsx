import type { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

export const TableHead = ({ children }: TableHeadProps) => {
  return <thead>{children}</thead>;
};
