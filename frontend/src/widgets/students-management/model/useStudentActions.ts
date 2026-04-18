import { useMemo, useState } from "react";

import type { StudentData } from "@/entities/user/base/model/types";

type StudentActionState =
  | { type: "edit"; studentId: number }
  | { type: "delete"; studentId: number }
  | { type: "change-password"; studentId: number }
  | null;

interface UseStudentActionsParams {
  students: StudentData[];
}

export const useStudentActions = ({ students }: UseStudentActionsParams) => {
  const [activeAction, setActiveAction] = useState<StudentActionState>(null);

  const selectedStudent = useMemo(
    () => students.find((student) => student.id === activeAction?.studentId) ?? null,
    [students, activeAction],
  );

  const openEdit = (studentId: number) => {
    setActiveAction({ type: "edit", studentId });
  };

  const openDelete = (studentId: number) => {
    setActiveAction({ type: "delete", studentId });
  };

  const openChangePassword = (studentId: number) => {
    setActiveAction({ type: "change-password", studentId });
  };

  const closeAction = () => {
    setActiveAction(null);
  };

  return {
    activeAction,
    selectedStudent,
    openEdit,
    openDelete,
    openChangePassword,
    closeAction,
  };
};
