import { ErrorInformation } from "@/types/error";
import { ProjectPayload } from "@/types/payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useDeleteProject = (props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, ProjectPayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ userID, name }) => {
            return await axiosInstance.delete(`/projects/${name}`, { data: { userID } });
        }
    })