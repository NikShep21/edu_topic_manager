import type { ReactNode } from "react";

import styles from "../styles/panel.module.scss";

type PanelHeaderProps = {
  title?: ReactNode;
  subtitle?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
};

export const PanelHeader = ({
  title,
  subtitle,
  rightSlot,
  className,
}: PanelHeaderProps) => {
  return (
    <div className={`${styles.header} ${className ?? ""}`}>
      <div className={styles.headerInfo}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
    </div>
  );
};
