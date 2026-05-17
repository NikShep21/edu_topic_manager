"use client";

import { FiInfo } from "react-icons/fi";

import type { StudentData } from "@/entities/user";
import { UserBadge } from "@/entities/user/current";
import { Button } from "@/shared/ui/button";

import { useReviewTopicApplicationMutation } from "../model/useReviewTopicApplicationMutation";

import styles from "./TopicApplicationReviewPanel.module.scss";

interface TopicApplicationReviewPanelProps {
  topicId: number;
  student: StudentData;
}

export const TopicApplicationReviewPanel = ({
  topicId,
  student,
}: TopicApplicationReviewPanelProps) => {
  const reviewMutation = useReviewTopicApplicationMutation();

  const isAcceptLoading =
    reviewMutation.isPending && reviewMutation.variables?.action === "accept";

  const isRejectLoading =
    reviewMutation.isPending && reviewMutation.variables?.action === "reject";

  const handleAccept = () => {
    reviewMutation.mutate({
      topicId,
      action: "accept",
    });
  };

  const handleReject = () => {
    reviewMutation.mutate({
      topicId,
      action: "reject",
    });
  };

  return (
    <section className={styles.panel}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <FiInfo size={18} />
        </div>
        <h2 className={styles.title}>Студент подал заявку на эту тему</h2>
      </div>

      <UserBadge userData={student} size="md" className={styles.userBadge} />

      <div className={styles.actions}>
        <Button
          size="md"
          variant="secondary"
          onClick={handleReject}
          isLoading={isRejectLoading}
          disabled={reviewMutation.isPending}
          className={styles.actionButton}
        >
          Отклонить
        </Button>

        <Button
          size="md"
          onClick={handleAccept}
          isLoading={isAcceptLoading}
          disabled={reviewMutation.isPending}
          className={styles.actionButton}
        >
          Принять
        </Button>
      </div>
    </section>
  );
};
