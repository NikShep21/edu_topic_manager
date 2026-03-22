import React from "react";
import styles from "./page.module.scss";
import { LoginForm } from "@/features/auth-by-credentials";
const page = () => {
  return (
    <div className={styles.loginContainer}>
      <LoginForm />
    </div>
  );
};

export default page;
