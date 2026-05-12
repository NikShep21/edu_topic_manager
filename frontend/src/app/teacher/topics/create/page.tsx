import { TopicForm } from "@/widgets/topic-form";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.content}>
      <section className={styles.tableContainer}>
        <TopicForm></TopicForm>
      </section>
    </main>
  );
};

export default Page;
