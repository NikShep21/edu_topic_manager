import {
  studentQueryKeys,
  updateStudent,
  type UpdateStudentRequest,
} from "@/entities/user/student";

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
