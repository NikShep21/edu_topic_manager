export const TOPICS_ENDPOINT = "/topics/";
export const TOPIC_TEACHER_FILTER_OPTIONS_ENDPOINT = "/topics/teachers_filter_options/";
export const TOPIC_STUDENT_FILTER_OPTIONS_ENDPOINT = "/topics/students_filter_options/";
export const MY_TOPIC = "/topics/mytopic";
export const getTopicEndpoint = (topicId: number | string) => `/topics/${topicId}/`;

export const getTopicFileEndpoint = (topicId: number | string, fileId: number) =>
  `/topics/${topicId}/files/${fileId}/`;

export const getApplyTopicEndpoint = (topicId: number | string) =>
  `/topics/${topicId}/apply/`;

export const getAcceptTopicEndpoint = (topicId: number | string) =>
  `/topics/${topicId}/accept/`;

export const getRejectTopicEndpoint = (topicId: number | string) =>
  `/topics/${topicId}/reject/`;

export const getCancelTopicApplicationEndpoint = (topicId: number | string) =>
  `/topics/${topicId}/cancel/`;
