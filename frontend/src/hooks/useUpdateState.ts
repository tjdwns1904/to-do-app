import { ErrorInformation } from "@/types/error";
import { StatePayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export const useUpdateState = (props: UseMutationOptions<unknown, HTTPError<ErrorInformation>, StatePayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ id, ...options }) => {
            return await kyInstance.patch(`tasks/state/${id}`, { json: { ...options } });
        }
    })