import { Project } from "@/types/common";
import { kyInstance } from "@/utils/ky"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetProjects = (id: string, props: UseQueryOptions<Project[], unknown>) => useQuery({
    ...props,
    queryFn: async () => {
        const data  = await kyInstance.get(`projects/${id}`).json<Project[]>();
        return data;
    }
});