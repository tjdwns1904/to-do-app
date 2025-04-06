import { TaskFilterPayload, TaskListPayload } from "@/types/payload";
import { kyInstance } from "@/utils/ky"
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryOptions } from "@tanstack/react-query";


export const useGetTasks = (
    filters: TaskFilterPayload,
    props: UseInfiniteQueryOptions<TaskListPayload, unknown, InfiniteData<TaskListPayload>>,
) => useInfiniteQuery({
    ...props,
    queryFn: async ({ pageParam = 0 }) => {
        const data = await kyInstance.get(`tasks`, {
            searchParams: {
                ...filters, cursor: pageParam ? Number(pageParam) : 0, limit: 30
            }
        }).json<TaskListPayload>();
        return data;
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
});