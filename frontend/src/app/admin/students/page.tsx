import { StudentsManagement } from "@/widgets/students-management";
import styles from "./page.module.scss";

const Page = () => {
  return (
    <main className={styles.content}>
      <section className={styles.tableContainer}>
        <StudentsManagement />
      </section>
    </main>
  );
};

export default Page;
