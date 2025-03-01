import { SignupForm } from "@/pages/SignUp";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface Response {
    msg: string;
}

export const useSignup = (props: UseMutationOptions<Response, unknown, SignupForm>) => useMutation({
    ...props,
    mutationFn: async ({ name, username, email, password }: SignupForm) => {
        const { data } = await axiosInstance.post("/auth/register", { name: name, username: username, email: email, password: password });
        return data;
    },
});