export const TOPICS_ENDPOINT = "/topics/";

export const getTopicEndpoint = (topicId: number) => `/topics/${topicId}/`;

export const getTopicFileEndpoint = (topicId: number, fileId: number) =>
  `/topics/${topicId}/files/${fileId}/`;
