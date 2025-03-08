import { Tag } from "@/types/common";
import { kyInstance } from "@/utils/ky"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetTags = (id: string, props: UseQueryOptions<Tag[], unknown>) => useQuery({
    ...props,
    queryFn: async () => {
        const data = await kyInstance.get(`tags/${id}`).json<Tag[]>();
        return data;
    }
});