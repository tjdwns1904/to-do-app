import { useEffect, useState } from "react";
import Header from "@/components/Registered/Header";
import axios from "axios";
import TaskCard from "@/components/Registered/Task/ViewTask/TaskCard";
import AddTask from "@/components/Registered/Task/AddTask/AddTask";
import TaskDetail from "@/components/Registered/Task/ViewTask/TaskDetail";
import LoadingPage from "../LoadingPage";
import DeleteConfirm from "@/components/Registered/Task/DeleteTask/DeleteConfirm";
import EmptyPage from "../EmptyPage";
import { Task } from "@/types/common";
import { useGetTasks } from "@/hooks/useGetTasks";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";

function Upcoming({ getTags, getProjects }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isAddModalShown, setIsAddModalShown] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [isDetailShown, setIsDetailShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmShown, setIsConfirmShown] = useState(false);
    const [task, setTask] = useState<Task>();
    const [search, setSearch] = useState("");
    const [originalTasks, setOriginalTasks] = useState<Task[]>([]);
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data } = useGetTasks(user.id, {
        queryKey: ["tasks", user.id],
        staleTime: 1000 * 60 * 5
    });
    const getTasks = () => {
        setIsLoading(true);
        axios.post("http://localhost:3000/tasks", {
            id: user.id
        })
            .then(res => {
                const upcomingTasks = res.data.filter((task: Task) => {
                    if (task.date) {
                        if (!task.isDone) {
                            const date = new Date();
                            const now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
                                date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            const d1 = task.date;
                            const d2 = new Date(now).toISOString();
                            return d1 > d2;
                        }
                    } else {
                        return task;
                    }
                });
                const sortedTasks = upcomingTasks.sort((a: Task, b: Task) => a.time.localeCompare(b.time));
                setOriginalTasks(sortedTasks);
                setTasks(sortedTasks);
            })
            .finally(() => setIsLoading(false));
    };
    const deleteTask = () => {
        if (!task) return;
        setIsLoading(true);
        axios.post("http://localhost:3000/task/delete", {
            userId: user.id,
            taskId: task.id,
        })
            .then(res => {
                if (res.data.msg) {
                    getTasks();
                } else {
                    console.log(res.data.err);
                }
            })
            .finally(() => {
                setIsLoading(false);
                handleConfirmClose();
            })
    };
    const handleTaskClick = (task: Task) => {
        setTask(task);
        handleDetailShow();
    };
    const searchTask = () => {
        const filteredTasks = originalTasks.filter(task => { return task.title.toLowerCase().includes(search.toLowerCase()) });
        setTasks(filteredTasks);
    }
    const handleAddModalShow = () => { setIsAddModalShown(true) };
    const handleAddModalClose = () => { setIsAddModalShown(false) };
    const handleDetailShow = () => setIsDetailShown(true);
    const handleDetailClose = () => setIsDetailShown(false);
    const handleConfirmShow = (task: Task) => {
        setTask(task);
        setIsConfirmShown(true);
    };
    const handleConfirmClose = () => setIsConfirmShown(false);
    useEffect(() => {
        getTasks();
    }, []);
    return (
        <>
            {isLoading && <LoadingPage />}
            {isConfirmShown && <DeleteConfirm type="task" handleClose={handleConfirmClose} handleDelete={deleteTask} />}
            <div className="page-container" onClick={() => setIsMenuShown(false)}>
                {isDetailShown && <TaskDetail user={user} getTasks={getTasks} selectedTask={task} handleClose={handleDetailClose} getProjects={getProjects} getTags={getTags} />}
                {isAddModalShown && <AddTask getTasks={getTasks} handleClose={handleAddModalClose} getProjects={getProjects} getTags={getTags} />}
                <Header getProjects={getProjects} getTags={getTags} isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
                <div className="main-container">
                    <div className="d-flex justify-content-between">
                        <h2 className="page-title">Upcoming</h2>
                        <div className="search-bar-container">
                            <input className="search-bar" type="text" name="title" id="search-text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button className="search-btn" onClick={searchTask} />
                        </div>
                    </div>
                    <div className="add-task-btn" onClick={handleAddModalShow}>+ Click here to add tasks</div>
                    {data ?
                        <div className="tasks-container">
                            {data.map(task => {
                                return (
                                    <TaskCard key={task.id} user={user} task={task} getTasks={getTasks} handleClick={handleTaskClick} handleDelete={handleConfirmShow} />
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

export default Upcoming;