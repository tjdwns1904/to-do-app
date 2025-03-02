import { useAddTask } from "@/hooks/useAddTask";
import LoadingPage from "@/pages/LoadingPage"
import { Task } from "@/types/common";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import AddTask, { AddTaskForm } from "../AddTask/AddTask";
import useModal from "@/hooks/useModal";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useUpdateState } from "@/hooks/useUpdateState";
import TaskDetail from "./TaskDetail";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import DeleteConfirm from "../DeleteTask/DeleteConfirm";
import TaskCard from "./TaskCard";
import EmptyPage from "@/pages/EmptyPage";
import Header from "../../Header";
import { useGetTasks } from "@/hooks/useGetTasks";
import Calendar from "@/pages/Today/_components/Calendar";
import { TaskFilterPayload } from "@/types/payload";

interface Props {
    title: string;
    type: string;
}

export default function TaskList({ title, type }: Props) {
    const [search, setSearch] = useState<string>("");
    const [filters, setFilters] = useState<Omit<TaskFilterPayload, "userID"> | undefined>();
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [task, setTask] = useState<Task>({
        id: "",
        userID: "",
        title: "",
        description: "",
        time: "",
        project: "",
        tags: "",
        isDone: false,
        date: "",
    });
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tasks, refetch: refetchTasks, isLoading: taskIsLoading } = useGetTasks(
        { userID: user.id, ...filters },
        {
            queryKey: ["tasks", user.id, filters],
            staleTime: 1000 * 60 * 5,
        }
    );
    const { mutate: addTask } = useAddTask({
        onSuccess: () => {
            refetchTasks();
        },
        onError: (error) => {
            if (error.response?.status === 409) {
                alert(error.response.data.message);
            }
        },
        onSettled: () => {
            closeAddTaskModal();
        }
    });
    const {
        open: openAddTaskModal,
        close: closeAddTaskModal,
        Modal: AddTaskModal
    } = useModal({ children: AddTask });

    const handleAddTask = (task: AddTaskForm) => {
        addTask({ ...task, isDone: false, userID: user.id });
    }

    const { mutate: updateTask } = useUpdateTask({
        onSuccess: () => {
            refetchTasks();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeTaskDetailModal();
        }
    });

    const { mutate: updateState } = useUpdateState({
        onSuccess: () => {
            refetchTasks();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeTaskDetailModal();
        }
    });

    const handleUpdateState = (task: Task) => {
        updateState({ id: task.id, userID: task.userID, isDone: task.isDone });
    }

    const {
        open: openTaskDetailModal,
        close: closeTaskDetailModal,
        Modal: TaskDetailModal
    } = useModal({ children: TaskDetail });

    const handleUpdateTask = (task: Task) => {
        updateTask(task);
    }

    const { mutate: deleteTask } = useDeleteTask({
        onSuccess: () => {
            refetchTasks();
            setIsLoading(false);
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeDeleteConfirmModal();
        }
    })

    const {
        open: openDeleteConfirmModal,
        close: closeDeleteConfirmModal,
        Modal: DeleteConfirmModal
    } = useModal({ children: DeleteConfirm });

    const handleOpenDeleteConfirmModal = (task: Task) => {
        setTask(task);
        openDeleteConfirmModal();
    }

    const handleDeleteTask = () => {
        if (!task) return;
        setIsLoading(true);
        deleteTask(task.id);
    };
    const handleTaskClick = (task: Task) => {
        setTask(task);
        openTaskDetailModal();
    };
    const handleSearch = () => {
        if (search !== "") setFilters({ ...filters, title: search });
        else setFilters({ ...filters, title: undefined });
    }
    const handleFilter = () => {
        const date = new Date();
        const today = date.getFullYear() + "-" + ('0' + (date.getMonth() + 1)).slice(-2) + "-" + ('0' + date.getDate()).slice(-2);
        if(type === "today"){
            setFilters({...filters, date: today})
        }else if(type === "upcoming"){
            const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            setFilters({...filters, date: today, time: time, isDone: false});
        }else if(type === "tag"){
            setFilters({...filters, project: undefined, tag: title});
        }else if(type === "project"){
            setFilters({...filters, project: title, tag: undefined});
        }
    }
    useEffect(() => {
        handleFilter();
    }, [type, title]);
    return (
        <>
            {(isLoading || taskIsLoading) && <LoadingPage />}
            <DeleteConfirmModal type="task" onConfirm={handleDeleteTask} />
            <div className="page-container" onClick={() => setIsMenuShown(false)}>
                <TaskDetailModal selectedTask={task} onConfirm={handleUpdateTask} />
                <AddTaskModal onConfirm={handleAddTask} />
                <Header isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
                <div className="main-container">
                    <div className="d-flex justify-content-between">
                        <h2 className="page-title">{title}</h2>
                        <div className="search-bar-container">
                            <input className="search-bar" type="text" name="title" id="search-text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="search-btn" onClick={handleSearch}/>
                        </div>
                    </div>
                    {!(type === "project" || type === "tag") && <div className="add-task-btn" onClick={openAddTaskModal}>+ Click here to add tasks</div>}
                    {tasks ?
                        <div className="tasks-container">
                            {tasks.map(task => {
                                return (
                                    <TaskCard key={task.id} task={task} handleUpdateState={handleUpdateState} handleClick={handleTaskClick} handleDelete={handleOpenDeleteConfirmModal} />
                                )
                            })}
                        </div>
                        :
                        <EmptyPage />
                    }
                </div>
                {(title === "Today" && tasks) && <Calendar tasks={tasks} />}
            </div>
        </>
    )
}
