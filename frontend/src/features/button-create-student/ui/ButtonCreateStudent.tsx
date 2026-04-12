"use client";

import { useState } from "react";
import { GoPlus } from "react-icons/go";

import { Button } from "@/shared/ui/button";

import { CreateStudentModal } from "./create-student-modal/CreateStudentModal";
import styles from "./ButtonCreateStudent.module.scss";

export const ButtonCreateStudent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={styles.button}>
        <span className={styles.icon}>
          <GoPlus size={30} />
        </span>
        <span className={styles.text}>Создать студента</span>
      </Button>

      <CreateStudentModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
