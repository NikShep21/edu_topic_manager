import { useMutation, useQueryClient } from "@tanstack/react-query";

import { teacherQueryKeys } from "@/entities/user/teacher";

import type { UpdateTeacherRequest } from "../api/types";
import { updateTeacher } from "../api/updateTeacher";

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
