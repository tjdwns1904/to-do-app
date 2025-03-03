import { LoginForm } from "@/pages/Login";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

interface Response {
    msg: string;
}

export const useLogin = (props: UseMutationOptions<Response, HTTPError, LoginForm>) => useMutation({
    ...props,
    mutationFn: async ({ email, password }: LoginForm) => {
        const data = await kyInstance.post("auth/login", {
            json: {
                email: email,
                password: password
            }
        }).json<Response>();
        return data;
    },
});