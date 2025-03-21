import { Response } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { TagPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export const useAddTag = (
    props: UseMutationOptions<Response, HTTPError<ErrorInformation>, TagPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await kyInstance.post("tags", { json: { ...options } }).json<Response>();
    }
})