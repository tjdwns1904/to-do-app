import { LoginForm } from "@/pages/Login";
import { axiosInstance } from "@/utils/axios";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

interface Response {
    msg: string;
}

export const useLogin = (props: UseMutationOptions<Response, unknown, LoginForm>) => useMutation({
    ...props,
    mutationFn: async ({ email, password }: LoginForm) => {
        const { data } = await axiosInstance.post("/auth/login", { email: email, password: password });
        return data;
    },
});