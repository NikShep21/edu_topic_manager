export const TOPICS_ENDPOINT = "/topics/";

export const getTopicEndpoint = (topicId: number | string) => `/topics/${topicId}/`;

export const getTopicFileEndpoint = (topicId: number | string, fileId: number) =>
  `/topics/${topicId}/files/${fileId}/`;
