import { authClient } from "@/shared/api";

import { MY_TOPIC } from "./constants";
import type { MyTopicResponse } from "./types";

export const getMyTopic = async (): Promise<MyTopicResponse> => {
  return authClient.get<MyTopicResponse>(MY_TOPIC);
};
