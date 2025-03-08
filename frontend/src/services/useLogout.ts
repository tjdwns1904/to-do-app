import { Response } from "@/types/common";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export const useLogout = (props: UseMutationOptions<Response, HTTPError>) => useMutation({
    ...props,
    mutationFn: async () => {
        return await kyInstance.post('auth/logout').json<Response>();
    }
})