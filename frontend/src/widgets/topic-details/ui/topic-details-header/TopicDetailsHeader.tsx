"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { MdModeEdit } from "react-icons/md";

import type { Topic } from "@/entities/topic";
import { Button } from "@/shared/ui/button";
import { Panel } from "@/shared/ui/panel";
import { formatDate } from "@/shared/utils/formatDate";

import { getStudentDisabledButtonText } from "../../lib/topicPermissions";
import { TOPIC_STATUS_LABELS, TOPIC_TYPE_LABELS } from "../../model/constants";
import type { TopicDetailsVariant } from "../../model/types";

import styles from "./TopicDetailsHeader.module.scss";

interface TopicDetailsHeaderProps {
  topic: Topic;
  variant: TopicDetailsVariant;
  backHref: string;
  editHref?: string;

  canStudentApply: boolean;
  canStudentCancel: boolean;
  isApplyLoading: boolean;
  isCancelLoading: boolean;

  onApply: () => void;
  onCancelApplication: () => void;
}

export const TopicDetailsHeader = ({
  topic,
  variant,
  backHref,
  editHref,
  canStudentApply,
  canStudentCancel,
  isApplyLoading,
  isCancelLoading,
  onApply,
  onCancelApplication,
}: TopicDetailsHeaderProps) => {
  const router = useRouter();

  const shouldShowStudentDisabledButton =
    variant === "student" && !canStudentApply && !canStudentCancel;

  const handleEdit = () => {
    if (!editHref) {
      return;
    }

    router.push(editHref);
  };

  return (
    <>
      <Link href={backHref} className={styles.backLink}>
        <FiArrowLeft size={18} />
        <span>К списку тем</span>
      </Link>

      <Panel className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{topic.title}</h1>

          <div className={styles.actions}>
            {variant === "teacher" && editHref ? (
              <Button
                size="md"
                variant="secondary"
                onClick={handleEdit}
                className={styles.actionButton}
                classNameContent={styles.actionButtonContent}
              >
                <MdModeEdit size={18} />
                <span className={styles.editText}>Редактировать тему</span>
              </Button>
            ) : null}

            {canStudentApply ? (
              <Button
                size="md"
                onClick={onApply}
                isLoading={isApplyLoading}
                disabled={isApplyLoading}
                className={styles.actionButton}
              >
                Подать заявку
              </Button>
            ) : null}

            {canStudentCancel ? (
              <Button
                size="md"
                variant="secondary"
                onClick={onCancelApplication}
                isLoading={isCancelLoading}
                disabled={isCancelLoading}
                className={styles.actionButton}
              >
                Отменить заявку
              </Button>
            ) : null}

            {shouldShowStudentDisabledButton ? (
              <Button
                size="md"
                variant="secondary"
                disabled
                className={styles.actionButton}
              >
                {getStudentDisabledButtonText(topic)}
              </Button>
            ) : null}
          </div>
        </div>

        <div className={styles.meta}>
          <span className={styles.typeBadge}>{TOPIC_TYPE_LABELS[topic.type]}</span>

          <span className={styles.metaItem}>
            Статус:{" "}
            <span className={styles[`status_${topic.status}`]}>
              {TOPIC_STATUS_LABELS[topic.status]}
            </span>
          </span>

          <span className={styles.metaItem}>Создано: {formatDate(topic.created_at)}</span>
        </div>
      </Panel>
    </>
  );
};
