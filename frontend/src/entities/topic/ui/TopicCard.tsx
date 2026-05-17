"use client";

import type { KeyboardEvent } from "react";
import clsx from "clsx";

import { UserBadge } from "@/entities/user/current";
import { TruncatedText } from "@/shared/ui/truncated-text";

import styles from "./TopicCard.module.scss";
import type { Topic, TopicStatus, TopicType } from "@/entities/topic/model/types";

export type TopicCardVariant = "student" | "teacher";

interface TopicCardProps {
  topic: Topic;
  variant: TopicCardVariant;
  onClick?: (topicId: number) => void;
}

const TOPIC_TYPE_LABELS: Record<TopicType, string> = {
  vkr: "ВКР",
  coursework: "Курсовая работа",
};

const TOPIC_STATUS_LABELS: Record<TopicStatus, string> = {
  available: "Доступна",
  pending_approval: "Ожидает подтверждения",
  assigned: "Назначена",
};

export const TopicCard = ({ topic, variant, onClick }: TopicCardProps) => {
  const relatedUser = variant === "teacher" ? topic.student : topic.teacher;
  const relatedUserLabel = variant === "teacher" ? "Студент" : "Преподаватель";
  const emptyUserText =
    variant === "teacher" ? "Студент не назначен" : "Преподаватель не указан";

  const handleClick = () => {
    onClick?.(topic.id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    handleClick();
  };

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.header}>
        <div className={styles.badges}>
          <span className={styles.typeBadge}>{TOPIC_TYPE_LABELS[topic.type]}</span>

          <span className={clsx(styles.statusBadge, styles[`status_${topic.status}`])}>
            {TOPIC_STATUS_LABELS[topic.status]}
          </span>
        </div>

        <span className={styles.details}>Подробнее</span>
      </div>

      <div className={styles.content}>
        <TruncatedText as="h3" text={topic.title} lines={2} className={styles.title} />

        <TruncatedText
          as="p"
          text={topic.description}
          lines={2}
          className={styles.description}
        />
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <span className={styles.userLabel}>{relatedUserLabel}</span>

          {relatedUser ? (
            <UserBadge userData={relatedUser} size="sm" className={styles.userBadge} />
          ) : (
            <div className={styles.emptyUser}>{emptyUserText}</div>
          )}
        </div>
      </div>
    </article>
  );
};
