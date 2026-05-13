export const TEACHER_ROUTES = {
  topics: "/teacher/topics",
  topicCreate: "/teacher/topics/create",
  topicEdit: (id: string | number) => `/teacher/topics/${id}/edit`,
  default: "/teacher/topics",
} as const;
