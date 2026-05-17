import type { ReactNode } from "react";

import styles from "./Panel.module.scss";

type PanelHeaderProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
};

export const PanelHeader = ({
  title,
  subtitle,
  actions,
  className,
}: PanelHeaderProps) => {
  return (
    <div className={`${styles.header} ${className ?? ""}`}>
      <div className={styles.headerInfo}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
};
