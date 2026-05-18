export const TEACHER_ROUTES = {
  topics: "/teacher/topics/",
  topic: (id: string | number) => `/teacher/topics/${id}/`,
  topicCreate: "/teacher/topics/create",
  topicEdit: (id: string | number) => `/teacher/topics/${id}/edit/`,
  default: "/teacher/topics/",
} as const;
