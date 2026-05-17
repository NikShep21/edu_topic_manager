"use client";

import { FiDownload, FiFileText, FiList, FiUser } from "react-icons/fi";

import type { Topic } from "@/entities/topic";
import { useApplyTopicMutation } from "@/features/apply-topic";
import { useCancelTopicApplicationMutation } from "@/features/cancel-topic-application";
import { TopicApplicationReviewPanel } from "@/features/review-topic-application";
import { Panel, PanelContent, PanelHeader } from "@/shared/ui/panel";

import {
  getCanStudentApply,
  getCanStudentCancel,
  getCanTeacherReview,
} from "../../lib/topicPermissions";

import styles from "./TopicDetails.module.scss";
import { TopicDetailsHeader } from "@/widgets/topic-details/ui/topic-details-header/TopicDetailsHeader";
import { TopicStepsView } from "@/widgets/topic-details/ui/topic-steps-view/TopicStepsView";
import { TopicFilesView } from "@/widgets/topic-details/ui/topic-files-view/TopicFilesView";
import { TopicSideInfo } from "@/widgets/topic-details/ui/topic-side-info/TopicSideInfo";
import type { TopicDetailsVariant } from "@/widgets/topic-details/model/types";

interface TopicDetailsProps {
  topic: Topic;
  variant: TopicDetailsVariant;
  backHref: string;
  editHref?: string;
  currentUserId?: number;
}

export const TopicDetails = ({
  topic,
  variant,
  backHref,
  editHref,
  currentUserId,
}: TopicDetailsProps) => {
  const applyTopicMutation = useApplyTopicMutation();
  const cancelTopicApplicationMutation = useCancelTopicApplicationMutation();

  const canStudentApply = variant === "student" && getCanStudentApply(topic);
  const canStudentCancel =
    variant === "student" && getCanStudentCancel(topic, currentUserId);
  const canTeacherReview = variant === "teacher" && getCanTeacherReview(topic);

  const handleApply = () => {
    applyTopicMutation.mutate(topic.id);
  };

  const handleCancelApplication = () => {
    cancelTopicApplicationMutation.mutate(topic.id);
  };

  return (
    <div className={styles.container}>
      <TopicDetailsHeader
        topic={topic}
        variant={variant}
        backHref={backHref}
        editHref={editHref}
        canStudentApply={canStudentApply}
        canStudentCancel={canStudentCancel}
        isApplyLoading={applyTopicMutation.isPending}
        isCancelLoading={cancelTopicApplicationMutation.isPending}
        onApply={handleApply}
        onCancelApplication={handleCancelApplication}
      />

      {canTeacherReview && topic.student ? (
        <TopicApplicationReviewPanel topicId={topic.id} student={topic.student} />
      ) : null}

      <div className={styles.layout}>
        <div className={styles.mainColumn}>
          <Panel className={styles.panel}>
            <PanelHeader
              title={
                <span className={styles.panelTitle}>
                  <FiFileText size={19} />
                  <span>Описание темы</span>
                </span>
              }
            />

            <PanelContent>
              <p className={styles.description}>{topic.description}</p>
            </PanelContent>
          </Panel>

          <Panel className={styles.panel}>
            <PanelHeader
              title={
                <span className={styles.panelTitle}>
                  <FiList size={19} />
                  <span>Порядок выполнения</span>
                </span>
              }
            />

            <PanelContent>
              <TopicStepsView steps={topic.steps ?? []} />
            </PanelContent>
          </Panel>

          <Panel className={styles.panel}>
            <PanelHeader
              title={
                <span className={styles.panelTitle}>
                  <FiDownload size={19} />
                  <span>Материалы</span>
                </span>
              }
            />

            <PanelContent>
              <TopicFilesView files={topic.files ?? []} />
            </PanelContent>
          </Panel>
        </div>

        <aside className={styles.sideColumn}>
          <Panel className={styles.panel}>
            <PanelHeader
              title={
                <span className={styles.panelTitle}>
                  <FiUser size={19} />
                  <span>Студент</span>
                </span>
              }
            />

            <PanelContent>
              <TopicSideInfo type="student" student={topic.student} />
            </PanelContent>
          </Panel>

          <Panel className={styles.panel}>
            <PanelHeader
              title={
                <span className={styles.panelTitle}>
                  <FiUser size={19} />
                  <span>Преподаватель</span>
                </span>
              }
            />

            <PanelContent>
              <TopicSideInfo type="teacher" teacher={topic.teacher} />
            </PanelContent>
          </Panel>
        </aside>
      </div>
    </div>
  );
};
