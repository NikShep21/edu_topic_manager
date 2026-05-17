export const STUDENT_ROUTES = {
  topics: "/student/topics/",
  topic: (id: string | number) => `/student/topics/${id}`,
  myTopic: "/student/mytopic/",
  default: "/student/topics/",
} as const;
