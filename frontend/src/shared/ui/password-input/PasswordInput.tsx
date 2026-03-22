"use client";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Input } from "@/shared/ui/input";
import styles from "./PasswordInput.module.scss";

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  startContent?: React.ReactNode;
}

export const PasswordInput = ({ error, startContent, ...props }: PasswordInputProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      {...props}
      type={isVisible ? "text" : "password"}
      error={error}
      startContent={startContent}
      endContent={
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setIsVisible((prev) => !prev)}
          aria-label={isVisible ? "Скрыть пароль" : "Показать пароль"}
        >
          {isVisible ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
        </button>
      }
    />
  );
};
