"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";

import { Button } from "@/shared/ui/button";

import { CreateTeacherModal } from "./create-teacher-modal/CreateTeacherModal";
import styles from "./ButtonCreateTeacher.module.scss";

export const ButtonCreateTeacher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={styles.button}>
        <span className={styles.icon}>
          <GoPlus size={30} />
        </span>
        <span className={styles.text}>Создать преподавателя</span>
      </Button>

      <CreateTeacherModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
