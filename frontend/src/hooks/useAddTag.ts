import { ErrorInformation } from "@/types/error";
import { TagPayload } from "@/types/payload";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useAddTag = (
    props: UseMutationOptions<unknown, AxiosError<ErrorInformation>, TagPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await axiosInstance.post("/tags", options);
    }
})