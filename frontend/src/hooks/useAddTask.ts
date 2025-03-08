import { Response } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { TaskPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export const useAddTask = (
    props: UseMutationOptions<Response, HTTPError<ErrorInformation>, TaskPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await kyInstance.post("tasks", { json: { ...options } }).json<Response>();
    }
})