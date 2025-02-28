import { ErrorInformation } from "@/types/error";
import { ProjectPayload } from "@/types/Payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAddProject = (
    props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, ProjectPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await axiosInstance.post("/projects", options);
    }
})