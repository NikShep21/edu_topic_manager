"use client";

import {
  useCallback,
  useLayoutEffect,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

type DropdownPlacement =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

interface UseDropdownPositionParams {
  isOpen: boolean;
  placement: DropdownPlacement;
  matchTriggerWidth: boolean;
  wrapperRef: RefObject<HTMLDivElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

const DROPDOWN_GAP = 8;
const VIEWPORT_OFFSET = 8;

export const useDropdownPosition = ({
  isOpen,
  placement,
  matchTriggerWidth,
  wrapperRef,
  dropdownRef,
}: UseDropdownPositionParams) => {
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({
    top: 0,
    left: 0,
    visibility: "hidden",
  });

  const updatePosition = useCallback(() => {
    if (!wrapperRef.current || !dropdownRef.current) return;

    const triggerRect = wrapperRef.current.getBoundingClientRect();
    const dropdownRect = dropdownRef.current.getBoundingClientRect();

    const finalWidth = matchTriggerWidth ? triggerRect.width : dropdownRect.width;
    const finalHeight = dropdownRect.height;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "bottom-left":
        top = triggerRect.bottom + DROPDOWN_GAP;
        left = triggerRect.right - finalWidth;
        break;

      case "bottom-center":
        top = triggerRect.bottom + DROPDOWN_GAP;
        left = triggerRect.left + triggerRect.width / 2 - finalWidth / 2;
        break;

      case "bottom-right":
        top = triggerRect.bottom + DROPDOWN_GAP;
        left = triggerRect.left;
        break;

      case "top-left":
        top = triggerRect.top - finalHeight - DROPDOWN_GAP;
        left = triggerRect.right - finalWidth;
        break;

      case "top-center":
        top = triggerRect.top - finalHeight - DROPDOWN_GAP;
        left = triggerRect.left + triggerRect.width / 2 - finalWidth / 2;
        break;

      case "top-right":
        top = triggerRect.top - finalHeight - DROPDOWN_GAP;
        left = triggerRect.left;
        break;
    }

    const clampedLeft = Math.min(
      Math.max(left, VIEWPORT_OFFSET),
      window.innerWidth - finalWidth - VIEWPORT_OFFSET,
    );

    const clampedTop = Math.min(
      Math.max(top, VIEWPORT_OFFSET),
      window.innerHeight - finalHeight - VIEWPORT_OFFSET,
    );

    setDropdownStyle({
      top: clampedTop,
      left: clampedLeft,
      width: matchTriggerWidth ? `${triggerRect.width}px` : undefined,
      visibility: "visible",
    });
  }, [matchTriggerWidth, placement, wrapperRef, dropdownRef]);

  useLayoutEffect(() => {
    const frame = requestAnimationFrame(() => {
      updatePosition();
    });

    return () => cancelAnimationFrame(frame);
  }, [isOpen, updatePosition]);

  return {
    dropdownStyle,
    updatePosition,
  };
};
