import clsx from "clsx";
import styles from "./TruncatedText.module.scss";

interface TruncatedTextProps {
  text: string;
  className?: string;
}

export const TruncatedText = ({ text, className }: TruncatedTextProps) => {
  return (
    <span className={clsx(styles.text, className)} title={text}>
      {text}
    </span>
  );
};
