import { Task } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useUpdateTask = (props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, Task>) =>
    useMutation({
        ...props,
        mutationFn: async ({ id, ...options }) => {
            return await axiosInstance.patch(`/tasks/${id}`, { ...options });
        }
    })