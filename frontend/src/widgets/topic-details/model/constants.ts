import type { TopicStatus, TopicType } from "@/entities/topic";

export const TOPIC_TYPE_LABELS: Record<TopicType, string> = {
  vkr: "ВКР",
  coursework: "Курсовая работа",
};

export const TOPIC_STATUS_LABELS: Record<TopicStatus, string> = {
  available: "Доступна для выбора",
  pending_approval: "Ожидает подтверждения",
  assigned: "Назначена",
};
