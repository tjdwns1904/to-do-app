import { ChangeEvent, MouseEvent, useRef, useState } from "react";
import { Form } from 'react-bootstrap';
import AddForm from "@/components/Registered/Form/AddForm";
import LoadingPage from "@/pages/LoadingPage";
import { Task } from "@/types/common";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useSessionStorage } from "@uidotdev/usehooks";
import useModal from "@/hooks/useModal";
import { useAddTag } from "@/hooks/useAddTag";
import { useAddProject } from "@/hooks/useAddProject";

interface Props {
    selectedTask: Task;
    onConfirm: (task: Task) => void;
    onCloseModal: () => void;
}

function TaskDetail({ selectedTask, onConfirm, onCloseModal }: Props) {
    const [task, setTask] = useState({...selectedTask, tags: JSON.parse(selectedTask.tags)});
    const [isValid, setIsValid] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [selected, setSelected] = useState("");
    const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
    const { data: tags, refetch: refetchTags } = useGetTags(user.id, {
        queryKey: ["tags", user.id],
        staleTime: 1000 * 60 * 5
    });
    const { data: projects, refetch: refetchProjects } = useGetProjects(user.id, {
        queryKey: ["projects", user.id],
        staleTime: 1000 * 60 * 5
    });
    const { mutate: addProject } = useAddProject({
        onSuccess: () => {
            refetchProjects();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeAddFormModal();
        }
    });

    const { mutate: addTag } = useAddTag({
        onSuccess: () => {
            refetchTags();
        },
        onError: (error) => {
            console.log(error);
        },
        onSettled: () => {
            closeAddFormModal();
        }
    });

    const {
        open: openAddFormModal,
        close: closeAddFormModal,
        Modal: AddFormModal
    } = useModal({ children: AddForm });
    
    const handleAddItem = (item: string) => {
        if (selected === "tag") {
            addTag({ name: item, userID: user.id });
        } else if (selected === "project") {
            addProject({ name: item, userID: user.id });
        }
    }
    const date = useRef(task.date);
    const time = useRef(task.time);
    const addTaskTag = (e: MouseEvent<HTMLParagraphElement>) => {
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

    const handleConfirm = () => {
        if (task.title !== "") {
            setIsValid(true);
            setIsLoading(true);
            if (task.tags) {
                onConfirm({...task, tags: JSON.stringify(task.tags)});
            } else {
                onConfirm({...task, tags: ""});
            }
        } else {
            setIsValid(false);
        }
    }
    const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        setTask({ ...task, project: id });
    }
    const removeProject = () => setTask({ ...task, project: "" });
    return (
        <>
            {isLoading && <LoadingPage />}
            <AddFormModal type={selected} onConfirm={handleAddItem} />
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
                                            <p key={tag.id} id={tag.name} className="option-item" onClick={(e) => addTaskTag(e)}>{tag.name}</p>
                                        )
                                    })}
                                    <p className="option-item text-success" onClick={openAddFormModal}>+ Add new tag</p>
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
                                    <p className="option-item text-success" onClick={openAddFormModal}>+ Add new project</p>
                                </div>
                            }
                        </div>
                    }
                    <div className="mt-5">
                        {!isValid && <p className="text-danger">Please enter a task name and its due date.</p>}
                        <button className="add-btn me-1" onClick={(e) => {
                            e.preventDefault();
                            handleConfirm();
                        }}>Edit</button>
                        <button className="cancel-btn" onClick={(e) => {
                            e.preventDefault();
                            onCloseModal();
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