import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createTeacher,
  teacherQueryKeys,
  type CreateTeacherRequest,
} from "@/entities/user/teacher";

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation<null, Error, CreateTeacherRequest>({
    mutationFn: createTeacher,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: teacherQueryKeys.all,
      });
    },
  });
};
