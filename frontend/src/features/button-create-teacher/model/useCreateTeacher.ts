import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teacherQueryKeys } from "@/entities/user/teacher";

import { createTeacher } from "../api/createTeacher";
import type { CreateTeacherRequest } from "../api/types";

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
