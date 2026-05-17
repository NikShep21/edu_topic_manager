"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { Button } from "@/shared/ui/button";
import styles from "./page.module.scss";

export default function ForbiddenPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <div className={styles.backgroundGlow} />
      <div className={styles.backgroundGlowSecondary} />

      <div className={styles.card}>
        <div className={styles.iconWrapper}>
          <HiOutlineLockClosed className={styles.icon} />
        </div>

        <p className={styles.code}>403</p>
        <h1 className={styles.title}>Доступ запрещён</h1>

        <p className={styles.description}>
          У вас нет прав для просмотра этой страницы. Попробуйте войти в аккаунт с нужной
          ролью или вернуться назад.
        </p>

        <div className={styles.actions}>
          <Link href="/login" className={styles.linkButton}>
            <Button type="button">Войти</Button>
          </Link>

          <Button
            type="button"
            className={styles.secondaryButton}
            onClick={() => router.back()}
          >
            Назад
          </Button>
        </div>

        <p className={styles.note}>
          Если вы считаете, что это ошибка, обратитесь к администратору.
        </p>
      </div>
    </div>
  );
}
