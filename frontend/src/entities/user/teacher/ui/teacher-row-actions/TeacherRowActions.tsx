"use client";

import { FiEdit2, FiKey, FiTrash2 } from "react-icons/fi";
import { IoEllipsisHorizontal } from "react-icons/io5";

import { Dropdown, DropdownMenu, DropdownMenuItem } from "@/shared/ui/dropdown";
import { IconButton } from "@/shared/ui/icon-button";

interface TeacherRowActionsProps {
  teacherId: number;
  onEdit?: (teacherId: number) => void;
  onChangePassword?: (teacherId: number) => void;
  onDelete?: (teacherId: number) => void;
}

export const TeacherRowActions = ({
  teacherId,
  onEdit,
  onChangePassword,
  onDelete,
}: TeacherRowActionsProps) => {
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
              onEdit?.(teacherId);
              closeDropdown();
            }}
          >
            Редактировать
          </DropdownMenuItem>

          <DropdownMenuItem
            icon={<FiKey size={16} />}
            onClick={() => {
              onChangePassword?.(teacherId);
              closeDropdown();
            }}
          >
            Сменить пароль
          </DropdownMenuItem>

          <DropdownMenuItem
            icon={<FiTrash2 size={16} />}
            danger
            onClick={() => {
              onDelete?.(teacherId);
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
