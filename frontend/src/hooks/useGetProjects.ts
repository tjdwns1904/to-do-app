import { Project } from "@/types/common";
import { axiosInstance } from "@/utils/axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetProjects = (id: string, props: UseQueryOptions<Project[], unknown>) => useQuery({
    ...props,
    queryFn: async () => {
        const { data } = await axiosInstance.get(`/projects/${id}`);
        return data;
    }
});