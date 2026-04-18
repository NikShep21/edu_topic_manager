import { studentQueryKeys } from "@/entities/user/student";
import { createStudent } from "@/features/button-create-student/api/createStudent";
import type { createStudentRequest } from "@/features/button-create-student/api/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, createStudentRequest>({
    mutationFn: createStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueryKeys.all,
      });
    },
  });
};
