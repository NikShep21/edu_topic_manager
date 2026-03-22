"use client";

import { cloneElement, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.scss";
import clsx from "clsx";

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
  children: React.ReactNode;
  trigger: React.ReactElement<DropdownTriggerProps>;
  placement?: DropdownPlacement;
}

const placementClasses = {
  "top-left": styles.topLeft,
  "top-center": styles.topCenter,
  "top-right": styles.topRight,
  "bottom-left": styles.bottomLeft,
  "bottom-center": styles.bottomCenter,
  "bottom-right": styles.bottomRight,
};

export const Dropdown = ({
  children,
  trigger,
  placement = "bottom-center",
}: PropsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleHandler = () => setIsOpen((prev) => !prev);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const triggerElement = cloneElement(trigger, {
    onClick: toggleHandler,
    className: clsx(styles.opener, trigger.props.className),
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {triggerElement}
      {isOpen && (
        <div className={clsx(styles.dropdown, placementClasses[placement])}>
          {children}
        </div>
      )}
    </div>
  );
};
