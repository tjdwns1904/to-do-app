import { UserEntity } from "@/types/common";
import { kyInstance } from "@/utils/ky";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetUser = (props: UseQueryOptions<UserEntity>) => useQuery({
    ...props,
    queryFn: async () => {
        const data = await kyInstance.get("auth").json<UserEntity>();
        return data;
    }
})