"use client";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FiCheck } from "react-icons/fi";
import styles from "./Checkbox.module.scss";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export const Checkbox = ({
  className,
  checked = false,
  disabled = false,
  label,
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={clsx(styles.wrapper, className, {
        [styles.disabled]: disabled,
      })}
    >
      <span className={styles.control}>
        <input
          type="checkbox"
          className={styles.input}
          checked={checked}
          disabled={disabled}
          {...props}
        />
        <span className={styles.box}>
          <FiCheck className={styles.icon} size={14} />
        </span>
      </span>

      {label ? <span className={styles.label}>{label}</span> : null}
    </label>
  );
};
