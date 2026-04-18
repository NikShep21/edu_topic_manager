import { studentQueryKeys } from "@/entities/user/student";
import type { UpdateStudentRequest } from "@/features/edit-student/api/types";
import { updateStudent } from "@/features/edit-student/api/updateStudent";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateStudentMutationParams = {
  id: number;
  data: UpdateStudentRequest;
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, UpdateStudentMutationParams>({
    mutationFn: ({ id, data }) => updateStudent(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: studentQueryKeys.all,
      });
    },
  });
};
