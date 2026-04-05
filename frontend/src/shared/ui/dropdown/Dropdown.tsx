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
  children: React.ReactNode | ((args: { closeDropdown: () => void }) => React.ReactNode);
  trigger: React.ReactElement<DropdownTriggerProps>;
  placement?: DropdownPlacement;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
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
  className,
  onOpenChange,
}: PropsDropdown) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleHandler = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const triggerElement = cloneElement(trigger, {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      trigger.props.onClick?.(event);
      toggleHandler();
    },
    className: clsx(styles.opener, trigger.props.className),
  });

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      {triggerElement}
      {isOpen && (
        <div className={clsx(styles.dropdown, placementClasses[placement], className)}>
          {typeof children === "function" ? children({ closeDropdown }) : children}
        </div>
      )}
    </div>
  );
};
