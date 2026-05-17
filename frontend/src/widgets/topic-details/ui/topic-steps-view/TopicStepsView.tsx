import type { TopicStep } from "@/entities/topic";

import styles from "./TopicStepsView.module.scss";

interface TopicStepsViewProps {
  steps: TopicStep[];
}

export const TopicStepsView = ({ steps }: TopicStepsViewProps) => {
  if (!steps.length) {
    return <p className={styles.empty}>Порядок выполнения не указан</p>;
  }

  return (
    <ol className={styles.list}>
      {steps.map((step) => (
        <li key={`${step.order}-${step.title}`} className={styles.step}>
          <span className={styles.number}>{step.order}</span>
          <span className={styles.title}>{step.title}</span>
        </li>
      ))}
    </ol>
  );
};
