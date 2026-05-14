"use client";

import { useParams } from "next/navigation";

import styles from "./page.module.scss";

import { useTopicQuery } from "@/entities/topic/model/useTopicQuery";
import { Spinner } from "@/shared/ui/spinner";
import { PageError } from "@/shared/ui/page-error";
import { getTopicErrorTitle } from "@/entities/topic";
import { useRouter } from "next/router";
import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";

const Page = () => {
  const params = useParams<{ topicId: string }>();
  const topicId = params.topicId;
  const router = useRouter();
  const { data, isLoading, isError, error } = useTopicQuery(Number(topicId));

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
  if (isError || !data) {
    return (
      <main className={styles.content}>
        <PageError
          title={getTopicErrorTitle(error)}
          description="Возможно, тема была удалена или у вас нет доступа к ней."
          actionText="К моим темам"
          onAction={handleBackToTopics}
        />
      </main>
    );
  }
  return (
    <main className={styles.content}>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </main>
  );
};

export default Page;
