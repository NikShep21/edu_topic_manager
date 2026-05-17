import clsx from "clsx";
import type { CSSProperties, ElementType } from "react";

import styles from "./TruncatedText.module.scss";

interface TruncatedTextProps {
  text: string;
  lines?: number;
  as?: ElementType;
  className?: string;
}

export const TruncatedText = ({
  text,
  lines = 1,
  as: Component = "span",
  className,
}: TruncatedTextProps) => {
  const isSingleLine = lines === 1;

  const style = !isSingleLine ? ({ WebkitLineClamp: lines } as CSSProperties) : undefined;

  return (
    <Component
      className={clsx(
        styles.text,
        isSingleLine ? styles.singleLine : styles.multiLine,
        className,
      )}
      style={style}
      title={text}
    >
      {text}
    </Component>
  );
};
