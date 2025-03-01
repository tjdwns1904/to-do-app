import { MouseEvent, useState } from "react";
import { Form } from "react-bootstrap";
import AddForm from "@/components/Registered/Form/AddForm";
import { useGetTags } from "@/hooks/useGetTags";
import { useGetProjects } from "@/hooks/useGetProjects";
import { useSessionStorage } from "@uidotdev/usehooks";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import useModal from "@/hooks/useModal";
import { useAddProject } from "@/hooks/useAddProject";
import { useAddTag } from "@/hooks/useAddTag";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
    onCloseModal: () => void,
    onConfirm: (task: AddTaskForm) => void
}

const schema = z.object({
    title: z.string().min(1, "Please enter the task name"),
    description: z.string(),
    date: z.string(),
    time: z.string(),
    project: z.string(),
    tags: z.string()
});

export type AddTaskForm = z.infer<typeof schema>;

function AddTask({ onCloseModal, onConfirm }: Props) {
    const { getValues, setValue, register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            date: "",
            time: "",
            project: "",
            tags: "[]",
        }
    });
    const [userProject, setUserProject] = useState<string>("");
    const [userTags, setUserTags] = useState<string[]>([]);
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
        if (!userTags.includes(id)) { setUserTags([...userTags, id]); }
        handleSelectionClose();
    }
    const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
        const { id } = e.currentTarget;
        const newTags = userTags.filter(tag => {
            return tag !== id;
        });
        setUserTags(newTags);
    }
    const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
        setUserProject(e.currentTarget.id);
        handleSelectionClose();
    }
    const removeProject = () => {
        setUserProject("");
    }
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
        if (getValues("time") === "") {
            setValue("time", "00:00");
        }
        handleSelectionClose();
    };
    const handleAddTask = (task: AddTaskForm) => {
        setValue("tags", JSON.stringify(userTags));
        setValue("project", userProject);
        onConfirm(task);
    }
    return (
        <>
            <AddFormModal type={selected} onConfirm={handleAddItem} />
            <div className="background" onClick={onCloseModal}>
            </div>
            <div className="modal-container">
                <h2>Add Task</h2>
                <Form onSubmit={handleSubmit(handleAddTask)}>
                    <Form.Control placeholder="Task Name" className="mb-2" {...register("title")} />
                    <Form.Control placeholder="Description" as="textarea" className="mb-4" {...register("description")} />
                    {(userTags.length !== 0 || userProject !== "") &&
                        <div className="tag-project-container">
                            {userProject !== "" &&
                                <div className="task-project-container">
                                    <p>#{userProject}</p>
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
                                }}
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
                                    <p className="mb-1">Tags</p>
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
                                    <p className="mb-1">Projects</p>
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
                        <button className="add-btn me-1" type="submit">Add task</button>
                        <button className="cancel-btn" onClick={(e) => {
                            e.preventDefault();
                            onCloseModal();
                        }}>Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddTask;