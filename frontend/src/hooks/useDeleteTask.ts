import { ErrorInformation } from "@/types/error";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useDeleteTask = (props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, string>) =>
    useMutation({
        ...props,
        mutationFn: async (id) => {
            return await axiosInstance.delete(`/tasks/${id}`);
        }
    })