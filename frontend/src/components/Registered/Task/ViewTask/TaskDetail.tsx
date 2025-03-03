import { MouseEvent, useState } from "react";
import { Form } from 'react-bootstrap';
import AddForm from "@/components/Registered/Form/AddForm";
import { Task } from "@/types/common";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useSessionStorage } from "@uidotdev/usehooks";
import useModal from "@/hooks/useModal";
import { useAddTag } from "@/hooks/useAddTag";
import { useAddProject } from "@/hooks/useAddProject";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    selectedTask: Task;
    onConfirm: (task: Task) => void;
    onCloseModal: () => void;
}

const schema = z.object({
    id: z.string(),
    userID: z.string(),
    isDone: z.boolean(),
    title: z.string().min(1, "Please enter the task name"),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    project: z.string(),
    tags: z.string()
});

export type UpdateTaskForm = z.infer<typeof schema>;

function TaskDetail({ selectedTask, onConfirm, onCloseModal }: Props) {
    const [userProject, setUserProject] = useState<string>(selectedTask.project);
    const [userTags, setUserTags] = useState<string[]>(JSON.parse(selectedTask.tags) || []);
    const { getValues, register, setValue, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: { ...selectedTask, id: selectedTask.id.toString(), isDone: !!selectedTask.isDone }
    })
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
    const addTaskTag = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        if (!userTags.includes(id)) {
            setUserTags([...userTags, id]);
        }
    }

    const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        const newTags = userTags.filter((tag: string) => {
            return tag !== id;
        });
        setUserTags(newTags);
    }
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
        if (getValues("time") === "") {
            setValue("time", "00:00");
        }
        handleSelectionClose();
    };

    const handleConfirm = (task: UpdateTaskForm) => {
        if (userTags.length > 0) {
            onConfirm({ ...task, tags: JSON.stringify(userTags), project: userProject });
        } else {
            onConfirm({ ...task, tags: "[]", project: userProject });
        }
    }
    const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
        const { id } = e.currentTarget;
        setUserProject(id);
    }
    const removeProject = () => setUserProject("");
    return (
        <>
            <AddFormModal type={selected} onConfirm={handleAddItem} />
            <div className="modal-container">
                <h2>Edit task</h2>
                <Form onSubmit={handleSubmit(handleConfirm)}>
                    <Form.Control className="mb-2" {...register("title")} />
                    <Form.Control className="mb-4" as="textarea" {...register("description")} />
                    {((userTags && userTags.length > 0) || (userProject && userProject !== "")) &&
                        <div className="tag-project-container">
                            {(userProject && userProject !== "") &&
                                <div className="task-project-container">
                                    <p>#{userProject}</p>
                                    <button className="delete-btn2" onClick={(e) => {
                                        e.preventDefault();
                                        removeProject();
                                    }} />
                                </div>
                            }
                            {(userTags && userTags.length !== 0) && userTags.map((tag: string) => {
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
                            {(getValues("date") === "" && getValues("time") === "") ? "Schedule" : getValues("date") !== "" ? new Date(getValues("date")).toLocaleDateString() + " " + getValues("time") : getValues("time")}
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
                                        <input type="date" className="me-2" {...register("date")} />
                                        <input type="time" {...register("time")} />
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
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                        <button className="add-btn me-1" type="submit">Edit</button>
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