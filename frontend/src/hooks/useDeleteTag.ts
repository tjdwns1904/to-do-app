import { Response } from "@/types/common";
import { ErrorInformation } from "@/types/error";
import { TagPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";


export const useDeleteTag = (props: UseMutationOptions<Response, HTTPError<ErrorInformation>, TagPayload>) =>
    useMutation({
        ...props,
        mutationFn: async ({ name, userID }) => {
            return await kyInstance.delete(`tags/${name}`, { json: { userID } }).json<Response>();
        }
    })