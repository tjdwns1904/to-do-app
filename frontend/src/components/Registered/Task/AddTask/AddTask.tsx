import axios from "axios";
import { MouseEvent, ChangeEvent, useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import AddForm from "@/components/Registered/Form/AddForm";
import LoadingPage from "@/pages/LoadingPage";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";

interface TaskFormContent {
    title: string;
    description: string;
    time: string;
    date: string | null;
    project: string;
}

function AddTask({ handleClose, getTasks, getTags, getProjects }) {
    const time = useRef("");
    const date = useRef("");
    const [task, setTask] = useState<TaskFormContent>({
        title: "",
        description: "",
        time: "",
        date: "",
        project: ""
    });
    const [userTags, setUserTags] = useState<string[]>([]);
    const [selected, setSelected] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isAddModalShown, setIsAddModalShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tags } = useGetTags(user.id, {
        queryKey: ["tags", user.id],
        staleTime: 1000 * 60 * 5
    });
    const { data: projects } = useGetProjects(user.id, {
        queryKey: ["projects", user.id],
        staleTime: 1000 * 60 * 5
    });
    const handleAddModalClose = () => setIsAddModalShown(false);
    const handleAddModalShow = () => setIsAddModalShown(true);
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTask(prev => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            );
        });
    }
    const addTag = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        if (!userTags.includes(id)) { setUserTags([...userTags, id]); }
    }
    const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        const newTags = userTags.filter(tag => {
            return tag !== id;
        });
        setUserTags(newTags);
    }
    const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        setTask({ ...task, project: id });
    }
    const removeProject = () => {
        setTask({ ...task, project: "" });
    }
    const addTask = () => {
        if (task.title !== "" && task.time !== "") {
            setIsLoading(true);
            setIsValid(true);
            axios.post("http://localhost:3000/task/add", {
                id: user.id,
                task: task,
                tags: JSON.stringify(userTags)
            })
                .then(res => {
                    if (res.data.msg) {
                        if (res.data.msg.endsWith("successfully!")) {
                            handleClose();
                            getTasks();
                        } else {
                            alert(res.data.msg);
                        }
                    } else {
                        console.log(res.data.err);
                    }
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsValid(false);
        }
    };
    const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        if (id !== selected) {
            setSelected(id);
        } else {
            handleSelectionClose();
        }
    };
    const handleSelectionClose = () => {
        setSelected("");
    };
    const handleOk = () => {
        if (date.current === "") {
            setTask({ ...task, date: null, time: time.current });
        } else {
            if (time.current === "") {
                time.current = "00:00";
            }
            setTask({ ...task, date: date.current, time: time.current });
        }
        handleSelectionClose();
    };
    useEffect(() => {
        getProjects();
        getTags();
    }, []);
    return (
        <>
            {isLoading && <LoadingPage />}
            {isAddModalShown && <AddForm type={selected} user={user} getProjects={getProjects} getTags={getTags} handleClose={handleAddModalClose} />}
            <div className="background" onClick={handleClose}>
            </div>
            <div className="modal-container">
                <h2>Add Task</h2>
                <Form>
                    <Form.Control placeholder="Task Name" className="mb-2" name="title" value={task.title} onChange={(e) => handleChange(e)} />
                    <Form.Control placeholder="Description" as="textarea" className="mb-4" name="description" value={task.description} onChange={(e) => handleChange(e)} />
                    {(userTags.length !== 0 || task.project !== "") &&
                        <div className="tag-project-container">
                            {task.project !== "" &&
                                <div className="task-project-container">
                                    <p>#{task.project}</p>
                                    <button className="delete-btn2" onClick={(e) => {
                                        e.preventDefault();
                                        removeProject();
                                    }} />
                                </div>
                            }
                            {userTags.length !== 0 && userTags.map(tag => {
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
                            {(date.current === "" && time.current === "") ? "Schedule" : task.date ? new Date(task.date).toLocaleDateString() + " " + task.time : task.time}
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
                                        <input type="time" name="time" onChange={(e) => time.current = e.target.value} />
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
                                    <p className="mb-1">Tags</p>
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
                                    <p className="mb-1">Projects</p>
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
                        {!isValid && <p className="text-danger">Please enter the task name and its due date.</p>}
                        <button className="add-btn me-1" onClick={(e) => {
                            e.preventDefault();
                            addTask();
                        }}>Add task</button>
                        <button className="cancel-btn" onClick={(e) => {
                            e.preventDefault();
                            handleClose();
                        }}>Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddTask;