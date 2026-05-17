"use client";

import { useRouter } from "next/navigation";

import { useMyTopicQuery } from "@/entities/topic";
import { PageError } from "@/shared/ui/page-error";
import { Spinner } from "@/shared/ui/spinner";
import { TopicDetails } from "@/widgets/topic-details";

import styles from "./page.module.scss";
import { STUDENT_ROUTES } from "@/app/student/_config/routes";

const Page = () => {
  const router = useRouter();

  const { data, isLoading, isError } = useMyTopicQuery();

  const handleBackToTopics = () => {
    router.push(STUDENT_ROUTES.topics);
  };

  if (isLoading) {
    return (
      <main className={styles.contentLoading}>
        <Spinner size="lg" />
      </main>
    );
  }

  if (isError) {
    return (
      <main className={styles.content}>
        <PageError
          title="Не удалось получить вашу тему"
          description="Попробуйте обновить страницу или перейти к списку тем."
          actionText="К списку тем"
          onAction={handleBackToTopics}
        />
      </main>
    );
  }

  if (!data?.topic) {
    return (
      <main className={styles.content}>
        <PageError
          title="Вы ещё не выбрали тему"
          description="Вы можете перейти к списку доступных тем и подать заявку."
          actionText="Выбрать тему"
          onAction={handleBackToTopics}
        />
      </main>
    );
  }

  return (
    <main className={styles.content}>
      <TopicDetails
        topic={data.topic}
        variant="student"
        backHref={STUDENT_ROUTES.topics}
        currentUserId={data.topic.student?.id}
      />
    </main>
  );
};

export default Page;
