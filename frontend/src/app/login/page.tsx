import { LoginForm } from "@/features/auth-by-credentials";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};

export default Page;
