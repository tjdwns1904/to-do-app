import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import TaskCard from "../TaskCard";
import AddTask from "../AddTask";
import TaskDetail from "../TaskDetail";
import LoadingPage from "../../components/Common/LoadingPage";
import DeleteConfirm from "../DeleteConfirm";
import EmptyPage from "../EmptyPage";
import Calendar from "./_components/Calendar";

function Today({ user, tags, getTags, projects, getProjects }) {
    const [tasks, setTasks] = useState([]);
    const [isAddModalShown, setIsAddModalShown] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
    const [isDetailShown, setIsDetailShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmShown, setIsConfirmShown] = useState(false);
    const [task, setTask] = useState({});
    const [tasksLeft, setTasksLeft] = useState(0);
    const getTasks = () => {
        let taskLeft = 0;
        setIsLoading(true);
        axios.post("http://localhost:3000/tasks", {
            id: user.id
        })
            .then(res => {
                const todayTasks = res.data.filter(task => {
                    if (task.date) {
                        if (!task.isDone) {
                            const date = new Date();
                            const now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +
                                date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                            const d1 = new Date(task.date).toDateString();
                            const d2 = new Date(now).toDateString();
                            if(d1 === d2){ taskLeft++; }
                            return d1 === d2;
                        }
                    } else {
                        if (!task.isDone) { taskLeft++; }
                        return task;
                    }
                });
                const sortedTasks = todayTasks.sort((a, b) => a.time.localeCompare(b.time));
                setTasksLeft(taskLeft);
                setTasks(sortedTasks);
            })
            .finally(() => setIsLoading(false));
    };
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
    const handleAddModalShow = () => { setIsAddModalShown(true) };
    const handleAddModalClose = () => { setIsAddModalShown(false) };
    const handleDetailShow = () => setIsDetailShown(true);
    const handleDetailClose = () => setIsDetailShown(false);
    const handleTaskClick = (task) => {
        setTask(task);
        handleDetailShow();
    };
    const handleConfirmShow = (task) => {
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
                {isDetailShown && <TaskDetail user={user} getTasks={getTasks} selectedTask={task} handleClose={handleDetailClose} getProjects={getProjects} getTags={getTags} tags={tags} projects={projects} />}
                {isAddModalShown && <AddTask user={user} getTasks={getTasks} handleClose={handleAddModalClose} getProjects={getProjects} getTags={getTags} tags={tags} projects={projects} />}
                <Header user={user} tags={tags} projects={projects} getProjects={getProjects} getTags={getTags} isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
                <div className="main-container today">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="page-title">Today</h2>
                        <p className="task-left">{tasksLeft + "/" + tasks.length}</p >
                    </div>
                    <div className="add-task-btn" onClick={handleAddModalShow}>+ Click here to add tasks</div>
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
                <Calendar tasks={tasks}/>
            </div>
        </>
    )
}

export default Today;