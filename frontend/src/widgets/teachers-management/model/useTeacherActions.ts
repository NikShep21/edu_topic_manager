import type { TeacherData } from "@/entities/user";
import { useMemo, useState } from "react";

type TeacherActionState =
  | { type: "edit"; teacherId: number }
  | { type: "delete"; teacherId: number }
  | { type: "change-password"; teacherId: number }
  | null;

interface UseTeacherActionsParams {
  teachers: TeacherData[];
}

export const useTeacherActions = ({ teachers }: UseTeacherActionsParams) => {
  const [activeAction, setActiveAction] = useState<TeacherActionState>(null);

  const selectedTeacher = useMemo(
    () => teachers.find((teacher) => teacher.id === activeAction?.teacherId) ?? null,
    [teachers, activeAction],
  );

  const openEdit = (teacherId: number) => {
    setActiveAction({ type: "edit", teacherId });
  };

  const openDelete = (teacherId: number) => {
    setActiveAction({ type: "delete", teacherId });
  };

  const openChangePassword = (teacherId: number) => {
    setActiveAction({ type: "change-password", teacherId });
  };

  const closeAction = () => {
    setActiveAction(null);
  };

  return {
    activeAction,
    selectedTeacher,
    openEdit,
    openDelete,
    openChangePassword,
    closeAction,
  };
};
