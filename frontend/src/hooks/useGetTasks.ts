import { Task } from "@/types/common";
import { axiosInstance } from "@/utils/axios"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const useGetTasks = (id: string, props: UseQueryOptions<Task[], unknown>) => useQuery({
    ...props,
    queryFn: async () => {
        const { data } = await axiosInstance.get(`/tasks/${id}`);
        const sortedTasks = data.sort((a: Task, b: Task) => a.time.localeCompare(b.time));
        return sortedTasks;
    }
});