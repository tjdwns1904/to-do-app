import { UserEntity } from "@/types/common";
import { axiosInstance } from "@/utils/axios";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetUser = (props: UseQueryOptions<UserEntity>) => useQuery({
    ...props,
    queryFn: async () => {
        const { data } = await axiosInstance.get("/auth", { withCredentials: true })
        return data;
    }
})