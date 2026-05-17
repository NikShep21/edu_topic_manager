"use client";

import { TopicCard, type Topic } from "@/entities/topic";
import { Spinner } from "@/shared/ui/spinner";

import type { TopicsListRole } from "../../model/types";

import styles from "./TopicsListContent.module.scss";

interface TopicsListContentProps {
  role: TopicsListRole;
  topics: Topic[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  onTopicClick: (topicId: number) => void;
}

export const TopicsListContent = ({
  role,
  topics,
  isLoading,
  isFetching,
  isError,
  onTopicClick,
}: TopicsListContentProps) => {
  const hasTopics = topics.length > 0;

  return (
    <div className={styles.wrapper}>
      {!isLoading && !isError && hasTopics ? (
        <div className={styles.grid}>
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              variant={role}
              onClick={onTopicClick}
            />
          ))}
        </div>
      ) : null}

      {isLoading ? (
        <div className={styles.state}>
          <Spinner />
        </div>
      ) : null}

      {!isLoading && !isError && !hasTopics ? (
        <div className={styles.state}>Темы не найдены</div>
      ) : null}

      {isFetching && !isLoading ? (
        <div className={styles.fetchingOverlay}>
          <Spinner size="sm" />
        </div>
      ) : null}
    </div>
  );
};
