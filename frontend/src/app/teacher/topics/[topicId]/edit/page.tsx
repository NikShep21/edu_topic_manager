"use client";

import { useParams, useRouter } from "next/navigation";
import { TopicForm } from "@/widgets/topic-form";

import styles from "./page.module.scss";
import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import type { Topic } from "@/entities/topic";
import { useTopicQuery } from "@/entities/topic/model/useTopicQuery";
import { Spinner } from "@/shared/ui/spinner";

const Page = () => {
  const router = useRouter();
  const params = useParams<{ topicId: string }>();
  const topicId = params.topicId;
  const { data, isLoading } = useTopicQuery(Number(topicId));
  const handleCancel = () => {
    router.push(TEACHER_ROUTES.topic(topicId));
  };

  const handleSuccess = (topic: Topic) => {
    router.push(TEACHER_ROUTES.topic(topic.id));
  };
  if (isLoading || !data) {
    return (
      <main className={styles.contentLoading}>
        <Spinner size="lg" />
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
          onCancel={handleCancel}
        />
      </section>
    </main>
  );
};

export default Page;
