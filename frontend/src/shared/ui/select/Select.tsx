"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { IoCheckmark, IoChevronDown } from "react-icons/io5";

import { Dropdown } from "@/shared/ui/dropdown";
import { Input } from "@/shared/ui/input/Input";
import { Spinner } from "@/shared/ui/spinner";

import styles from "./Select.module.scss";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options: SelectOption[];

  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;

  isSearchable?: boolean;
  searchThreshold?: number;
  searchPlaceholder?: string;

  isLoading?: boolean;
  emptyText?: string;
}

export const Select = ({
  value,
  onChange,
  options,
  label,
  placeholder = "Не выбрано",
  className,
  disabled = false,
  isSearchable = false,
  searchThreshold = 10,
  searchPlaceholder = "Поиск...",
  isLoading = false,
  emptyText = "Ничего не найдено",
}: SelectProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => {
    return options.find((option) => option.value === value) ?? null;
  }, [options, value]);

  const shouldShowSearch = isSearchable || options.length > searchThreshold;

  const filteredOptions = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    if (!normalizedSearch) {
      return options;
    }

    return options.filter((option) =>
      option.label.toLowerCase().includes(normalizedSearch),
    );
  }, [options, searchValue]);

  const handleOpenChange = (nextOpen: boolean) => {
    setIsOpen(nextOpen);

    if (!nextOpen) {
      setSearchValue("");
    }
  };

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          className={clsx(styles.trigger, className, {
            [styles.disabled]: disabled,
          })}
          disabled={disabled}
        >
          <span className={styles.triggerText}>
            {label ? <span className={styles.prefix}> {label}: </span> : null}

            <span
              className={clsx(styles.value, {
                [styles.placeholder]: !selectedOption,
              })}
            >
              {selectedOption?.label ?? placeholder}
            </span>
          </span>

          <span
            className={clsx(styles.chevron, {
              [styles.chevronOpen]: isOpen,
            })}
            aria-hidden="true"
          >
            <IoChevronDown size={16} />
          </span>
        </button>
      }
      placement="bottom-left"
      className={styles.dropdown}
      onOpenChange={handleOpenChange}
    >
      {({ closeDropdown }) => (
        <div className={styles.content}>
          {shouldShowSearch ? (
            <div className={styles.searchWrapper}>
              <Input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder={searchPlaceholder}
                className={styles.searchField}
                inputClassName={styles.searchInput}
                isError={false}
              />
            </div>
          ) : null}

          <div className={styles.options}>
            {isLoading ? (
              <div className={styles.loading}>
                <Spinner size="sm" />
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    className={clsx(styles.option, {
                      [styles.selected]: isSelected,
                    })}
                    onClick={() => {
                      onChange(option.value);
                      closeDropdown();
                    }}
                  >
                    <span className={styles.optionLabel}>{option.label}</span>

                    <span className={styles.optionIcon} aria-hidden="true">
                      {isSelected ? <IoCheckmark size={16} /> : null}
                    </span>
                  </button>
                );
              })
            ) : (
              <div className={styles.empty}>{emptyText}</div>
            )}
          </div>
        </div>
      )}
    </Dropdown>
  );
};
