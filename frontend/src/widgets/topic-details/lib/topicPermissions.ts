import type { Topic } from "@/entities/topic";

export const getCanStudentApply = (topic: Topic) => {
  return topic.status === "available";
};

export const getCanStudentCancel = (topic: Topic, currentUserId?: number | undefined) => {
  return (
    topic.status === "pending_approval" &&
    Boolean(currentUserId) &&
    topic.student?.id === currentUserId
  );
};

export const getCanTeacherReview = (topic: Topic) => {
  return topic.status === "pending_approval" && Boolean(topic.student);
};

export const getStudentDisabledButtonText = (topic: Topic) => {
  if (topic.status === "pending_approval") {
    return "Тема ожидает подтверждения";
  }

  if (topic.status === "assigned") {
    return "Тема уже назначена";
  }

  return "Тема недоступна";
};
