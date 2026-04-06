"use client";

import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { Dropdown, DropdownMenu, DropdownMenuItem } from "@/shared/ui/dropdown";

import { IconButton } from "@/shared/ui/icon-button";

interface StudentRowActionsProps {
  studentId: number;
  onEdit?: (studentId: number) => void;
  onDelete?: (studentId: number) => void;
}

export const StudentRowActions = ({
  studentId,
  onEdit,
  onDelete,
}: StudentRowActionsProps) => {
  return (
    <Dropdown
      placement="bottom-left"
      trigger={
        <IconButton icon={<IoEllipsisHorizontal />} aria-label="Действия со студентом" />
      }
    >
      {({ closeDropdown }) => (
        <DropdownMenu>
          <DropdownMenuItem
            icon={<FiEdit2 size={16} />}
            onClick={() => {
              onEdit?.(studentId);
              closeDropdown();
            }}
          >
            Редактировать
          </DropdownMenuItem>

          <DropdownMenuItem
            icon={<FiTrash2 size={16} />}
            danger
            onClick={() => {
              onDelete?.(studentId);
              closeDropdown();
            }}
          >
            Удалить
          </DropdownMenuItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};
