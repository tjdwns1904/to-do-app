import { Task, User } from "@/types/common";
import axios from "axios";

function TaskCard({ user, task, getTasks, handleClick, handleDelete } : {user: User, task: Task}) {
    const updateState = (id: string, isDone: boolean) => {
        axios.post("http://localhost:3000/task/updateState", {
            userId: user.id,
            taskId: id,
            isDone: isDone
        })
            .then(() => getTasks());
    };
    return (
        <div key={task.id} className="task-container">
            <div className={task.isDone ? "checkbox checked" : "checkbox"} onClick={() => updateState(task.id, task.isDone)} />
            <div onClick={() => handleClick(task)}>
                <p className={task.isDone ? "task-title done" : "task-title"}>{task.title}</p>
                <div className="task-sub-container">
                    {(task.project && task.project !== "") &&
                        <p className="text-secondary project-name">{task.project}</p>
                    }
                    {(task.tags && task.tags.length !== 0) && JSON.parse(task.tags).map(tag => {
                        return (
                            <p key={tag} className="text-secondary project-name">{tag}</p>
                        )
                    })}

                    <p className={task.date ? "text-secondary mt-1" : "text-secondary mt-1 repeat"}>{task.date ? new Date(task.date).toLocaleDateString() + " " + task.time.slice(0, task.time.lastIndexOf(":")) : task.time.slice(0, task.time.lastIndexOf(":"))}</p>
                </div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(task)} />
        </div>
    )
}

export default TaskCard;