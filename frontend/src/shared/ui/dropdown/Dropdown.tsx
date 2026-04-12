"use client";

import clsx from "clsx";
import { cloneElement, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { useDropdownPosition } from "./useDropdownPosition";
import styles from "./Dropdown.module.scss";

interface DropdownTriggerProps {
  onClick?: React.MouseEventHandler<HTMLElement>;
  className?: string;
}

type DropdownPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface PropsDropdown {
  children: React.ReactNode | ((args: { closeDropdown: () => void }) => React.ReactNode);
  trigger: React.ReactElement<DropdownTriggerProps>;
  placement?: DropdownPlacement;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
  matchTriggerWidth?: boolean;
}

export const Dropdown = ({
  children,
  trigger,
  placement = "bottom-center",
  className,
  onOpenChange,
  matchTriggerWidth = false,
}: PropsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { dropdownStyle, updatePosition } = useDropdownPosition({
    isOpen,
    placement,
    matchTriggerWidth,
    wrapperRef,
    dropdownRef,
  });

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedInsideTrigger = wrapperRef.current?.contains(target);
      const clickedInsideDropdown = dropdownRef.current?.contains(target);

      if (!clickedInsideTrigger && !clickedInsideDropdown) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  const triggerElement = cloneElement(trigger, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      toggleDropdown();
    },
    className: clsx(styles.opener, trigger.props.className),
  });

  if (typeof document === "undefined") {
    return (
      <div ref={wrapperRef} className={styles.wrapper}>
        {triggerElement}
      </div>
    );
  }

  return (
    <>
      <div ref={wrapperRef} className={styles.wrapper}>
        {triggerElement}
      </div>

      {isOpen
        ? createPortal(
            <div
              ref={dropdownRef}
              style={dropdownStyle}
              className={clsx(styles.dropdown, className)}
            >
              {typeof children === "function" ? children({ closeDropdown }) : children}
            </div>,
            document.body,
          )
        : null}
    </>
  );
};
