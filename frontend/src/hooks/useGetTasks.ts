import { Task } from "@/types/common";
import { TaskFilterPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky"
import { useQuery, UseQueryOptions } from "@tanstack/react-query";


export const useGetTasks = (
    filters: TaskFilterPayload,
    props: UseQueryOptions<Task[], unknown>,
) => useQuery({
    ...props,
    queryFn: async () => {
        const data = await kyInstance.get(`tasks`, { searchParams: { ...filters } }).json<Task[]>();
        const sortedTasks = data.sort((a: Task, b: Task) => a.time.localeCompare(b.time));
        return sortedTasks;
    }
});