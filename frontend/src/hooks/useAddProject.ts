import { ErrorInformation } from "@/types/error";
import { ProjectPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

export const useAddProject = (
    props: UseMutationOptions<unknown, HTTPError<ErrorInformation>, ProjectPayload>
) => useMutation({
    ...props,
    mutationFn: async (options) => {
        return await kyInstance.post("projects", { json: { ...options } });
    }
})