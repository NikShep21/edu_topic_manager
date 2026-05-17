import {
  createStudent,
  studentQueryKeys,
  type createStudentRequest,
} from "@/entities/user/student";
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
