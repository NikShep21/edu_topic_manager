import { FiList, FiPlus } from "react-icons/fi";

import { Button } from "@/shared/ui/button";
import { FieldError } from "@/shared/ui/field-error";
import { Input } from "@/shared/ui/input";
import { Panel, PanelContent, PanelHeader } from "@/shared/ui/panel";

import type { TopicStep } from "../../model/types";
import { useTopicSteps } from "../../model/useTopicSteps";

import styles from "./TopicSteps.module.scss";
import { TopicStepItem } from "@/features/topic-steps/ui/topic-step-item/TopicStepItem";

type TopicStepsProps = {
  steps: TopicStep[];
  onChange: (steps: TopicStep[]) => void;
  error?: string;
  className?: string;
};

export const TopicSteps = ({ steps, onChange, error, className }: TopicStepsProps) => {
  const {
    stepTitle,
    draggedIndex,
    setStepTitle,
    addStep,
    removeStep,
    startDrag,
    endDrag,
    dropStep,
  } = useTopicSteps({ steps, onChange });

  return (
    <Panel className={className}>
      <PanelHeader
        title={
          <span className={styles.title}>
            <FiList size={18} />
            Порядок выполнения
          </span>
        }
        subtitle="Добавьте этапы в том порядке, в котором студент должен их выполнить"
      />

      <PanelContent className={styles.content}>
        <div className={styles.addRow}>
          <Input
            value={stepTitle}
            placeholder="Создать базовую структуру API проекта"
            maxLength={160}
            inputClassName={styles.inputField}
            onChange={(event) => setStepTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addStep();
              }
            }}
          />

          <Button size="md" onClick={addStep}>
            <span className={styles.addButtonContent}>
              <FiPlus size={16} />
              Добавить
            </span>
          </Button>
        </div>

        {steps.length > 0 ? (
          <div className={styles.list}>
            {steps.map((step, index) => (
              <TopicStepItem
                key={`${step.title}-${index}`}
                step={step}
                index={index}
                isDragging={draggedIndex === index}
                onRemove={() => removeStep(index)}
                onDragStart={() => startDrag(index)}
                onDragEnd={endDrag}
                onDrop={() => dropStep(index)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            Пока нет этапов. Добавьте первый шаг выполнения.
          </div>
        )}

        {error ? <FieldError message={error} className={styles.error} /> : null}
      </PanelContent>
    </Panel>
  );
};
