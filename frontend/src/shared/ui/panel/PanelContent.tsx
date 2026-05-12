import type { ReactNode } from "react";

import styles from "./Panel.module.scss";

type PanelContentProps = {
  children: ReactNode;
  className?: string;
};

export const PanelContent = ({ children, className }: PanelContentProps) => {
  return <div className={`${styles.content} ${className ?? ""}`}>{children}</div>;
};
