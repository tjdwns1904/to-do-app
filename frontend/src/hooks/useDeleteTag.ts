import { ErrorInformation } from "@/types/error";
import { TagPayload } from "@/types/Payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useDeleteTag = (props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, TagPayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ name, userID }) => {
            return await axiosInstance.delete(`/tags/${name}`, { data: { userID } });
        }
    })