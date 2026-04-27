import type { ReactNode } from "react";

import styles from "../styles/panel.module.scss";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return <section className={`${styles.panel} ${className ?? ""}`}>{children}</section>;
}
