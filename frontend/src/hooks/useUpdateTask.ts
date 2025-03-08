import { Response, Task } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";


export const useUpdateTask = (props: UseMutationOptions<Response, HTTPError<ErrorInformation>, Task>) =>
    useMutation({
        ...props,
        mutationFn: async ({ id, ...options }) => {
            return await kyInstance.patch(`tasks/${id}`, { json: { ...options } }).json<Response>();
        }
    })