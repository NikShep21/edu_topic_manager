"use client";

import { useRouter } from "next/navigation";
import { TopicForm } from "@/widgets/topic-form";

import styles from "./page.module.scss";
import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
import type { Topic } from "@/entities/topic";

const Page = () => {
  const router = useRouter();

  const handleCancel = () => {
    router.push(TEACHER_ROUTES.topics);
  };

  const handleSuccess = (topic: Topic) => {
    router.push(TEACHER_ROUTES.topic(topic.id));
  };

  return (
    <main className={styles.content}>
      <section className={styles.container}>
        <TopicForm mode="create" onSuccess={handleSuccess} onCancel={handleCancel} />
      </section>
    </main>
  );
};

export default Page;
