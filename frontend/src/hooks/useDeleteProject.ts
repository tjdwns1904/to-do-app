import { Response } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { ProjectPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";


export const useDeleteProject = (props: UseMutationOptions<Response, HTTPError<ErrorInformation>, ProjectPayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ userID, name }) => {
            return await kyInstance.delete(`projects/${name}`, { json: { userID } }).json<Response>();
        }
    })