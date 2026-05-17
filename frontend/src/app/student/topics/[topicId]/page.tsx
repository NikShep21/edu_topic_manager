"use client";

import { useParams, useRouter } from "next/navigation";

import { getTopicErrorTitle } from "@/entities/topic";
import { useTopicQuery } from "@/entities/topic/model/useTopicQuery";
import { useGetUser } from "@/entities/user/current";
import { PageError } from "@/shared/ui/page-error";
import { Spinner } from "@/shared/ui/spinner";
import { TopicDetails } from "@/widgets/topic-details";

import styles from "./page.module.scss";
import { STUDENT_ROUTES } from "@/app/student/_config/routes";

const Page = () => {
  const params = useParams<{ topicId: string }>();
  const router = useRouter();

  const topicId = Number(params.topicId);

  const {
    data: topic,
    isLoading: isTopicLoading,
    isError: isTopicError,
    error: topicError,
  } = useTopicQuery(topicId);

  const {
    data: currentUser,
    isLoading: isCurrentUserLoading,
    isError: isCurrentUserError,
  } = useGetUser();

  const handleBackToTopics = () => {
    router.push(STUDENT_ROUTES.topics);
  };

  if (isTopicLoading || isCurrentUserLoading) {
    return (
      <main className={styles.contentLoading}>
        <Spinner size="lg" />
      </main>
    );
  }

  if (isTopicError || !topic) {
    return (
      <main className={styles.content}>
        <PageError
          title={getTopicErrorTitle(topicError)}
          description="Возможно, тема была удалена или у вас нет доступа к ней."
          actionText="К списку тем"
          onAction={handleBackToTopics}
        />
      </main>
    );
  }

  if (isCurrentUserError || !currentUser) {
    return (
      <main className={styles.content}>
        <PageError
          title="Не удалось получить пользователя"
          description="Попробуйте обновить страницу или войти в систему заново."
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
        variant="student"
        backHref={STUDENT_ROUTES.topics}
        currentUserId={currentUser.id}
      />
    </main>
  );
};

export default Page;
