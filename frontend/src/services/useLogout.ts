import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogout = (props: UseMutationOptions) => useMutation({
    ...props,
    mutationFn: async () => {
        return await axiosInstance.post('/auth/logout');
    }
})