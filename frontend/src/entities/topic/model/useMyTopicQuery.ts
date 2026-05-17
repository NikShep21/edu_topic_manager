import { useQuery } from "@tanstack/react-query";

import { getMyTopic } from "../api/getMyTopic";
import type { MyTopicResponse } from "../api/types";
import { topicQueryKeys } from "./queryKeys";

export const useMyTopicQuery = () => {
  return useQuery<MyTopicResponse>({
    queryKey: topicQueryKeys.myTopic(),
    queryFn: getMyTopic,
  });
};
