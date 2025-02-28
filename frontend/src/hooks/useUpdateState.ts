import { ErrorInformation } from "@/types/error";
import { StatePayload } from "@/types/payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateState = (props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, StatePayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ id, ...options }) => {
            return await axiosInstance.patch(`/tasks/state/${id}`, { ...options });
        }
    })