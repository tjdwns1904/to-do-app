import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Common/Header";
import TaskCard from "@/components/Registered/Task/ViewTask/TaskCard";
import TaskDetail from "@/components/Registered/Task/ViewTask/TaskDetail";
import LoadingPage from "./LoadingPage";
import DeleteConfirm from "@/components/Registered/Task/DeleteTask/DeleteConfirm";
import EmptyPage from "./EmptyPage";
import NotFound from "./NotFound";

function FilteredTask({ user, tags, getTags, projects, getProjects }) {
    const { type, name } = useParams();
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({});
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [isDetailShown, setIsDetailShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmShown, setIsConfirmShown] = useState(false);
    const getTasks = () => {
        setIsLoading(true);
        axios.post("http://localhost:3000/tasks", {
            id: user.id
        })
            .then(res => {
                const filteredTasks = res.data.filter(task => {
                    if (type === 'project') {
                        if (task.project) {
                            return task.project === name;
                        }
                    } else {
                        if (task.tags) {
                            const tags = JSON.parse(task.tags);
                            return tags.includes(name);
                        }
                    }
                });
                const sortedTasks = filteredTasks.sort((a, b) => a.time.localeCompare(b.time));
                setTasks(sortedTasks);
            })
            .finally(() => setIsLoading(false));
    }
    const deleteTask = () => {
        setIsLoading(true);
        axios.post("http://localhost:3000/task/delete", {
            userId: user.id,
            taskId: task.id
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
    const handleTaskClick = (task) => {
        setTask(task);
        handleDetailShow();
    };
    const handleDetailShow = () => setIsDetailShown(true);
    const handleDetailClose = () => setIsDetailShown(false);
    const handleConfirmShow = (task) => {
        setTask(task);
        setIsConfirmShown(true);
    };
    const handleConfirmClose = () => setIsConfirmShown(false);
    useEffect(() => {
        getTasks();
    }, [name]);
    return (
        <>
            {isLoading && <LoadingPage />}
            {isConfirmShown && <DeleteConfirm type="task" handleClose={handleConfirmClose} handleDelete={deleteTask} />}
            <div className="page-container">
                {isDetailShown && <TaskDetail user={user} getTasks={getTasks} selectedTask={task} handleClose={handleDetailClose} getProjects={getProjects} getTags={getTags} tags={tags} projects={projects} />}
                <Header user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
                <div className="main-container">
                    <h2 className="page-title">{name}</h2>
                    {tasks.length !== 0 ?
                        <div className="tasks-container">
                            {tasks.map(task => {
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

export default FilteredTask;