import { ErrorInformation } from "@/types/error";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";


export const useDeleteTask = (props: UseMutationOptions<unknown, HTTPError<ErrorInformation>, string>) =>
    useMutation({
        ...props,
        mutationFn: async (id) => {
            return await kyInstance.delete(`tasks/${id}`);
        }
    })