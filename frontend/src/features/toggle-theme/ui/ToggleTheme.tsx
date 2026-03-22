"use client";

import { useSyncExternalStore } from "react";
import styles from "./ToggleTheme.module.scss";
import { FaMoon } from "react-icons/fa";
import { PiSunFill } from "react-icons/pi";
import clsx from "clsx";
import { useTheme } from "next-themes";

const emptySubscribe = () => () => {};

export const ToggleTheme = () => {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const { resolvedTheme, setTheme } = useTheme();

  const isLight = mounted && resolvedTheme === "light";

  return (
    <div className={styles.toggleTheme}>
      {mounted ? (
        <div
          className={clsx(styles.thumb, {
            [styles.light]: isLight,
          })}
        />
      ) : null}

      <button onClick={() => setTheme("dark")} className={styles.button} type="button">
        <FaMoon
          size={16}
          className={clsx(styles.icon, {
            [styles.activeColor]: mounted && !isLight,
          })}
        />
      </button>

      <button onClick={() => setTheme("light")} className={styles.button} type="button">
        <PiSunFill
          size={16}
          className={clsx(styles.icon, {
            [styles.activeColor]: mounted && isLight,
          })}
        />
      </button>
    </div>
  );
};
