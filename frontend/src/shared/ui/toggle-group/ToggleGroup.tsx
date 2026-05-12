"use client";

import clsx from "clsx";

import styles from "./ToggleGroup.module.scss";

export type ToggleGroupOption<TValue extends string = string> = {
  value: TValue;
  label: string;
};

type ToggleGroupProps<TValue extends string = string> = {
  value: TValue | null | undefined;
  options: ToggleGroupOption<TValue>[];
  onChange: (value: TValue) => void;
  className?: string;
  optionClassName?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export const ToggleGroup = <TValue extends string = string>({
  value,
  options,
  onChange,
  className,
  optionClassName,
  disabled = false,
  "aria-label": ariaLabel,
}: ToggleGroupProps<TValue>) => {
  return (
    <div
      className={clsx(styles.group, className)}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-disabled={disabled}
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={clsx(
              styles.option,
              isSelected && styles.selected,
              optionClassName,
            )}
            disabled={disabled}
            onClick={() => onChange(option.value)}
          >
            <span className={styles.label}>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};
