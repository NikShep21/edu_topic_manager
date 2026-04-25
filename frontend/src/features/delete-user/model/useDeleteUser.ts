import { studentQueryKeys } from "@/entities/user/student";
import { teacherQueryKeys } from "@/entities/user/teacher";
import { deleteUser } from "@/features/delete-user/api/deleteUser";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type DeleteUserParams = {
  id: number;
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<null, Error, DeleteUserParams>({
    mutationFn: ({ id }) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: studentQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: teacherQueryKeys.all });
    },
  });
};
