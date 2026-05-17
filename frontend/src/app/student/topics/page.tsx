"use client";

import { STUDENT_ROUTES } from "@/app/student/_config/routes";
import styles from "./page.module.scss";
import { TopicsList } from "@/widgets/topics-list";

const page = () => {
  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <TopicsList
          role="student"
          getTopicHref={(topicId) => STUDENT_ROUTES.topic(topicId)}
        />
      </div>
    </main>
  );
};

export default page;
