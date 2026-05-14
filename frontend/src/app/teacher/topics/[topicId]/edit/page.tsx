"use client";

import { useParams, useRouter } from "next/navigation";
import { TopicForm } from "@/widgets/topic-form";

import styles from "./page.module.scss";
import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import { getTopicErrorTitle, type Topic } from "@/entities/topic";
import { useTopicQuery } from "@/entities/topic/model/useTopicQuery";
import { Spinner } from "@/shared/ui/spinner";
import { PageError } from "@/shared/ui/page-error";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ topicId: string }>();
  const topicId = params.topicId;
  const { data, isLoading, isError, error } = useTopicQuery(Number(topicId));

  const handleCancel = () => {
    router.push(TEACHER_ROUTES.topic(topicId));
  };

  const handleSuccess = (topic: Topic) => {
    router.push(TEACHER_ROUTES.topic(topic.id));
  };
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
      <section className={styles.container}>
        <TopicForm
          mode="edit"
          initialData={data}
          onSuccess={handleSuccess}
          onDeleteSuccess={handleBackToTopics}
          onCancel={handleCancel}
        />
      </section>
    </main>
  );
};

export default Page;
