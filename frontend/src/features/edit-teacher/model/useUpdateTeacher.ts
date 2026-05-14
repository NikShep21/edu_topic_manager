import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  teacherQueryKeys,
  updateTeacher,
  type UpdateTeacherRequest,
} from "@/entities/user/teacher";

type UpdateTeacherMutationParams = {
  id: number;
  data: UpdateTeacherRequest;
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, UpdateTeacherMutationParams>({
    mutationFn: ({ id, data }) => updateTeacher(data, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.all,
      });
    },
  });
};
