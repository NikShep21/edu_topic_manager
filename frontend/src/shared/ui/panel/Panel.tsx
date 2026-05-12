import type { ReactNode } from "react";

import styles from "./Panel.module.scss";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export const Panel = ({ children, className }: PanelProps) => {
  return <section className={`${styles.panel} ${className ?? ""}`}>{children}</section>;
};
