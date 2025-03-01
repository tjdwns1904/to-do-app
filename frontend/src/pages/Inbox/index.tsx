import { useState } from "react";
import Header from "@/components/Registered/Header";
import TaskCard from "@/components/Registered/Task/ViewTask/TaskCard";
import AddTask, { AddTaskForm } from "@/components/Registered/Task/AddTask/AddTask";
import TaskDetail from "@/components/Registered/Task/ViewTask/TaskDetail";
import LoadingPage from "../LoadingPage";
import DeleteConfirm from "@/components/Registered/Task/DeleteTask/DeleteConfirm";
import EmptyPage from "../EmptyPage";
import { Task } from "@/types/common";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useAddTask } from "@/hooks/useAddTask";
import useModal from "@/hooks/useModal";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import { useUpdateState } from "@/hooks/useUpdateState";

function Inbox() {
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
    const [search, setSearch] = useState("");
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tasks, refetch: refetchTasks, isLoading: taskIsLoading } = useGetTasks(user.id, {
        queryKey: ["tasks", user.id],
        staleTime: 1000 * 60 * 5
    });
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
        updateState({id: task.id, userID: task.userID, isDone: task.isDone});
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
                        <h2 className="page-title">Inbox</h2>
                        <div className="search-bar-container">
                            <input className="search-bar" type="text" name="title" id="search-text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="search-btn" />
                        </div>
                    </div>
                    <div className="add-task-btn" onClick={openAddTaskModal}>+ Click here to add tasks</div>
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
            </div>
        </>
    )
}

export default Inbox;