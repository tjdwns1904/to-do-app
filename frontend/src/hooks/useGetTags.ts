import { Tag } from "@/types/common";
import { axiosInstance } from "@/utils/axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetTags = (id: string, props: UseQueryOptions<Tag[], unknown>) => useQuery({
    ...props,
    queryFn: async () => {
        const { data } = await axiosInstance.get(`/tags/${id}`);
        return data;
    }
});