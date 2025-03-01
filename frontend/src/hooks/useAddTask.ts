import { ErrorInformation } from "@/types/error";
import { TaskPayload } from "@/types/payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAddTask = (
    props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, TaskPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await axiosInstance.post("/tasks", options);
    }
})