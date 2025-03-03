import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useLogout = (props: UseMutationOptions) => useMutation({
    ...props,
    mutationFn: async () => {
        return await kyInstance.post('auth/logout');
    }
})