import { SignupForm } from "@/pages/SignUp";
import { kyInstance } from "@/utils/ky";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { HTTPError } from "ky";

interface Response {
    msg: string;
}

export const useSignup = (props: UseMutationOptions<Response, HTTPError, SignupForm>) => useMutation({
    ...props,
    mutationFn: async ({ name, username, email, password }: SignupForm) => {
        const data = await kyInstance.post("auth/register", {
            json: {
                name: name,
                username: username,
                email: email,
                password: password
            }
        }).json<Response>();
        return data;
    },
});