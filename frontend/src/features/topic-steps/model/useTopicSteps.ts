import { useState } from "react";

import type { TopicStep } from "./types";

type UseTopicStepsParams = {
  steps: TopicStep[];
  onChange: (steps: TopicStep[]) => void;
};

export const useTopicSteps = ({ steps, onChange }: UseTopicStepsParams) => {
  const [stepTitle, setStepTitle] = useState("");
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addStep = () => {
    const trimmedTitle = stepTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onChange([...steps, { title: trimmedTitle }]);
    setStepTitle("");
  };

  const removeStep = (index: number) => {
    onChange(steps.filter((_, stepIndex) => stepIndex !== index));
  };

  const startDrag = (index: number) => {
    setDraggedIndex(index);
  };

  const endDrag = () => {
    setDraggedIndex(null);
  };

  const dropStep = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      return;
    }

    const nextSteps = [...steps];
    const [draggedStep] = nextSteps.splice(draggedIndex, 1);

    if (!draggedStep) {
      return;
    }

    nextSteps.splice(targetIndex, 0, draggedStep);
    onChange(nextSteps);
    setDraggedIndex(null);
  };

  return {
    stepTitle,
    draggedIndex,
    setStepTitle,
    addStep,
    removeStep,
    startDrag,
    endDrag,
    dropStep,
  };
};
