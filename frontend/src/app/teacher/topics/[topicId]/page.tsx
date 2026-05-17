"use client";

import { useParams, useRouter } from "next/navigation";

import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import { getTopicErrorTitle } from "@/entities/topic";
import { useTopicQuery } from "@/entities/topic/model/useTopicQuery";
import { PageError } from "@/shared/ui/page-error";
import { Spinner } from "@/shared/ui/spinner";
import { TopicDetails } from "@/widgets/topic-details";

import styles from "./page.module.scss";

const Page = () => {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();

  const topicId = Number(params.topicId);

  const { data: topic, isLoading, isError, error } = useTopicQuery(topicId);

  const handleBackToTopics = () => {
    router.push(TEACHER_ROUTES.topics);
  };

  if (isLoading) {
    return (
      <main className={styles.contentLoading}>
        <Spinner size="lg" />
      </main>
    );
  }

  if (isError || !topic) {
    return (
      <main className={styles.content}>
        <PageError
          title={getTopicErrorTitle(error)}
          description="Возможно, тема была удалена или у вас нет доступа к ней."
          actionText="К списку тем"
          onAction={handleBackToTopics}
        />
      </main>
    );
  }

  return (
    <main className={styles.content}>
      <TopicDetails
        topic={topic}
        variant="teacher"
        backHref={TEACHER_ROUTES.topics}
        editHref={TEACHER_ROUTES.topicEdit(topic.id)}
      />
    </main>
  );
};

export default Page;
