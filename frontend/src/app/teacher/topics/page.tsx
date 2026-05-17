"use client";
import React from "react";
import styles from "./page.module.scss";
import { TopicsList } from "@/widgets/topics-list";
import { TEACHER_ROUTES } from "@/app/teacher/_config/routers";
const page = () => {
  return (
    <main className={styles.content}>
      <div className={styles.container}>
        <TopicsList
          role="teacher"
          getTopicHref={(topicId) => TEACHER_ROUTES.topic(topicId)}
          createTopicHref={TEACHER_ROUTES.topicCreate}
        />
      </div>
    </main>
  );
};

export default page;
