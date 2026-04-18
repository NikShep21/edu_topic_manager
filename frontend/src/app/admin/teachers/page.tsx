import styles from "./page.module.scss";
import { TeachersManagement } from "@/widgets/teachers-management";

const Page = () => {
  return (
    <main className={styles.content}>
      <section className={styles.tableContainer}>
        <TeachersManagement />
      </section>
    </main>
  );
};

export default Page;
