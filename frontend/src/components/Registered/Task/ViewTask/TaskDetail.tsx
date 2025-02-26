import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { Form } from 'react-bootstrap';
import AddForm from "@/components/Registered/Form/AddForm";
import axios from "axios";
import LoadingPage from "@/pages/LoadingPage";
import { Task } from "@/types/common";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useSessionStorage } from "@uidotdev/usehooks";

function TaskDetail({ selectedTask, handleClose, getTasks, getTags, getProjects }
    : {
        selectedTask: Task,
    }) {
    const [task, setTask] = useState({ ...selectedTask, tags: JSON.parse(selectedTask.tags) });
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState("");
    const [isAddModalShown, setIsAddModalShown] = useState(false);
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tags } = useGetTags(user.id, {
        queryKey: ["tags", user.id],
        staleTime: 1000 * 60 * 5
    });
    const { data: projects } = useGetProjects(user.id, {
        queryKey: ["projects", user.id],
        staleTime: 1000 * 60 * 5
    });
    const date = useRef(task.date);
    const time = useRef(task.time);
    const addTag = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        if (task.tags) {
            if (!task.tags.includes(id)) {
                setTask({ ...task, tags: [...task.tags, id] });
            }
        } else {
            const newTags = [id];
            setTask({ ...task, tags: newTags });
        }
    }

    const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        const newTags = task.tags.filter((tag: string) => {
            return tag !== id;
        });
        setTask({ ...task, tags: newTags });
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTask(prev => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            )
        });
    };
    const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        if (id !== selected) { setSelected(id); }
        else {
            handleSelectionClose();
        }
    }
    const handleSelectionClose = () => {
        setSelected("");
    }
    const handleOk = () => {
        setTask({ ...task, date: date.current, time: time.current });
        handleSelectionClose();
    }
    const updateTask = () => {
        if (task.title !== "") {
            setIsValid(true);
            setIsLoading(true);
            if (task.tags) {
                axios.post("http://localhost:3000/task/update", {
                    userId: user.id,
                    taskId: task.id,
                    task: task,
                    tags: JSON.stringify(task.tags)
                })
                    .then(res => {
                        if (res.data.msg) {
                            if (res.data.msg.endsWith("successfully!")) {
                                getTasks();
                            }
                        } else {
                            console.log(res.data.err);
                        }
                    })
                    .finally(() => {
                        setIsLoading(false);
                        handleClose();
                    });
            } else {
                axios.post("http://localhost:3000/task/update", {
                    userId: user.id,
                    taskId: task.id,
                    task: task,
                    tags: null
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
                        handleClose();
                    });
            }
        } else {
            setIsValid(false);
        }
    };
    const handleAddModalShow = () => setIsAddModalShown(true);
    const handleAddModalClose = () => setIsAddModalShown(false);
    const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        setTask({ ...task, project: id });
    }
    const removeProject = () => setTask({ ...task, project: "" });
    useEffect(() => {
        getProjects();
        getTags();
    }, []);
    return (
        <>
            {isLoading && <LoadingPage />}
            {isAddModalShown && <AddForm type={selected} getProjects={getProjects} getTags={getTags} handleClose={handleAddModalClose} />}
            <div className="background" onClick={handleClose}>
            </div>
            <div className="modal-container">
                <h2>Edit task</h2>
                <Form>
                    <Form.Control className="mb-2" name="title" defaultValue={task.title} onChange={handleChange} />
                    <Form.Control className="mb-4" as="textarea" name="description" defaultValue={task.description} onChange={handleChange} />
                    {((task.tags && task.tags.length !== 0) || (task.project && task.project !== "")) &&
                        <div className="tag-project-container">
                            {(task.project && task.project !== "") &&
                                <div className="task-project-container">
                                    <p>#{task.project}</p>
                                    <button className="delete-btn2" onClick={(e) => {
                                        e.preventDefault();
                                        removeProject();
                                    }} />
                                </div>
                            }
                            {(task.tags && task.tags.length !== 0) && task.tags.map((tag: string) => {
                                return (
                                    <div key={tag} className="task-tags-container">
                                        <p>{tag}</p>
                                        <button id={tag} className="delete-btn2" onClick={(e) => {
                                            e.preventDefault();
                                            deleteTag(e);
                                        }} />
                                    </div>
                                )
                            })}
                        </div>
                    }
                    <div className="btn-container">
                        <button id="datetime" className="schedule-btn" onClick={(e) => {
                            e.preventDefault();
                            handleSelect(e);
                        }
                        }>
                            {(task.time === "") ? "Schedule" : task.date ? new Date(task.date).toLocaleDateString() + " " + task.time.slice(0, task.time.lastIndexOf(":")) : task.time.slice(0, task.time.lastIndexOf(":"))}
                        </button>
                        <div>
                            <button id="tag" className="tag-btn" onClick={(e) => {
                                e.preventDefault();
                                handleSelect(e);
                            }
                            }
                            />
                            <button id="project" className="project-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleSelect(e);
                                }
                                }
                            />
                        </div>
                    </div>
                    {selected !== "" &&
                        <div className="option-container">
                            {selected === "datetime" &&
                                <div className="options datetime-container">
                                    <p>Due</p>
                                    <button className="delete-btn" onClick={handleSelectionClose} />
                                    <div className="datetime-input-container">
                                        <input type="date" name="date" className="me-2" onChange={(e) => date.current = e.target.value} />
                                        <input type="time" name="time" onChange={(e) => time.current = e.target.value + ":00"} />
                                    </div>
                                    <div className="ok-btn-container">
                                        <button className="ok-btn" onClick={() => {
                                            handleOk();
                                        }}>OK</button>
                                    </div>
                                </div>
                            }
                            {selected === "tag" &&
                                <div className="options tags-container">
                                    <p className="mb-1 text-secondary">Tags</p>
                                    <button className="delete-btn" onClick={handleSelectionClose} />
                                    {tags && tags.length !== 0 && tags.map(tag => {
                                        return (
                                            <p key={tag.id} id={tag.name} className="option-item" onClick={(e) => addTag(e)}>{tag.name}</p>
                                        )
                                    })}
                                    <p className="option-item text-success" onClick={handleAddModalShow}>+ Add new tag</p>
                                </div>
                            }
                            {selected === "project" &&
                                <div className="options projects-container">
                                    <p className="mb-1 text-secondary">Project</p>
                                    <button className="delete-btn" onClick={handleSelectionClose} />
                                    {projects && projects.length !== 0 && projects.map(project => {
                                        return (
                                            <p key={project.id} id={project.name} className="option-item" onClick={(e) => setProject(e)}>{project.name}</p>
                                        )
                                    })}
                                    <p className="option-item text-success" onClick={handleAddModalShow}>+ Add new project</p>
                                </div>
                            }
                        </div>
                    }
                    <div className="mt-5">
                        {!isValid && <p className="text-danger">Please enter a task name and its due date.</p>}
                        <button className="add-btn me-1" onClick={(e) => {
                            e.preventDefault();
                            updateTask();
                        }}>Edit</button>
                        <button className="cancel-btn" onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}
                        >
                            Cancel
                        </button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default TaskDetail;