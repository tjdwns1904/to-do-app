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
import dayjs from "dayjs";
import customToast from "@/utils/toast";

interface Props {
  onCloseModal: () => void;
  onConfirm: (task: AddTaskForm) => void;
}

const schema = z.object({
  title: z.string().min(1, "Please enter the task name"),
  description: z.string(),
  date: z.string(),
  time: z.string(),
  project: z.string(),
  tags: z.string(),
});

export type AddTaskForm = z.infer<typeof schema>;

function AddTask({ onCloseModal, onConfirm }: Props) {
  const {
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      date: "",
      time: "",
      project: "",
      tags: "[]",
    },
  });
  const [userProject, setUserProject] = useState<string>("");
  const [userTags, setUserTags] = useState<string[]>([]);
  const [selected, setSelected] = useState("");
  const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
  const { data: tags, refetch: refetchTags } = useGetTags(user.id, {
    queryKey: ["tags", user.id],
    staleTime: 1000 * 60 * 5,
  });
  const { data: projects, refetch: refetchProjects } = useGetProjects(user.id, {
    queryKey: ["projects", user.id],
    staleTime: 1000 * 60 * 5,
  });
  const { mutate: addProject } = useAddProject({
    onSuccess: (data) => {
      if (data.code && data.code === 201) {
        customToast.success(data.msg);
        refetchProjects();
      } else {
        customToast.error(data.msg);
      }
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeAddFormModal();
    },
  });

  const { mutate: addTag } = useAddTag({
    onSuccess: (data) => {
      if (data.code && data.code === 201) {
        customToast.success(data.msg);
        refetchTags();
      } else {
        customToast.error(data.msg);
      }
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeAddFormModal();
    },
  });

  const {
    open: openAddFormModal,
    close: closeAddFormModal,
    Modal: AddFormModal,
  } = useModal({ children: AddForm });
  const handleAddItem = (item: string) => {
    if (selected === "tag") {
      addTag({ name: item, userID: user.id });
    } else if (selected === "project") {
      addProject({ name: item, userID: user.id });
    }
  };
  const addTaskTag = (e: MouseEvent<HTMLParagraphElement>) => {
    const { id } = e.currentTarget;
    if (!userTags.includes(id)) {
      setUserTags([...userTags, id]);
    }
    handleSelectionClose();
  };
  const deleteTag = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    const newTags = userTags.filter((tag) => {
      return tag !== id;
    });
    setUserTags(newTags);
  };
  const setProject = (e: MouseEvent<HTMLParagraphElement>) => {
    setUserProject(e.currentTarget.id);
    handleSelectionClose();
  };
  const removeProject = () => {
    setUserProject("");
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
    if (getValues("time") === "") {
      setValue("time", "00:00");
    }
    handleSelectionClose();
  };
  const handleAddTask = (task: AddTaskForm) => {
    if (userTags.length > 0) {
      onConfirm({
        ...task,
        tags: JSON.stringify(userTags),
        project: userProject,
      });
    } else {
      onConfirm({ ...task, tags: "[]", project: userProject });
    }
  };
  return (
    <>
      <AddFormModal type={selected} onConfirm={handleAddItem} />
      <div
        className="absolute z-1 h-full w-full bg-[#b8b8b86a]"
        onClick={onCloseModal}
      ></div>
      <div className="absolute top-[50%] left-[calc(50%-300px)] z-2 h-fit w-[600px] translate-y-[-50%] rounded-[10px] bg-white p-[20px]">
        <h2 className="!mb-[20px] !text-[26px] !font-black">Add Task</h2>
        <Form onSubmit={handleSubmit(handleAddTask)}>
          <Form.Control
            placeholder="Task Name"
            className="mb-2"
            {...register("title")}
          />
          <Form.Control
            placeholder="Description"
            as="textarea"
            className="mb-4"
            {...register("description")}
          />
          {(userTags.length !== 0 || userProject !== "") && (
            <div className="flex">
              {userProject !== "" && (
                <div className="mr-[10px] mb-[10px] flex rounded-[10px] bg-[#aaffa6] py-[5px] pr-[5px] pl-[12px] text-[#454545]">
                  <p className="mb-0">#{userProject}</p>
                  <button
                    className="!mt-[4px] !ml-[5px] !size-[16px] !border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.1s] ease-in-out hover:scale-[1.1]"
                    onClick={(e) => {
                      e.preventDefault();
                      removeProject();
                    }}
                  />
                </div>
              )}
              {userTags.length !== 0 &&
                userTags.map((tag) => {
                  return (
                    <div
                      key={tag}
                      className="mr-[10px] mb-[10px] flex rounded-[10px] bg-[#39ffc0] py-[5px] pr-[5px] pl-[12px] text-[#454545]"
                    >
                      <p className="mb-0">{tag}</p>
                      <button
                        id={tag}
                        className="!mt-[4px] !ml-[5px] !size-[16px] !border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.1s] ease-in-out hover:scale-[1.1]"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteTag(e);
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              id="datetime"
              className="mr-[2px] !rounded-[5px] border !border-[#bbbbbb] bg-white bg-[url('@/assets/images/schedule.png')] bg-[position:10px_8px] bg-no-repeat py-[5px] pr-[10px] pl-[30px] !text-[#535353] duration-[.2s] ease-in-out hover:!border-black"
              onClick={(e) => {
                e.preventDefault();
                handleSelect(e);
              }}
            >
              {getValues("date") === "" && getValues("time") === ""
                ? "Schedule"
                : getValues("date") !== ""
                  ? dayjs(getValues("date")).format("YYYY-MM-DD") +
                    " " +
                    getValues("time")
                  : getValues("time")}
            </button>
            <div>
              <button
                id="tag"
                className="mr-[2px] !h-[35px] !w-[35px] !rounded-[5px] !border !border-transparent bg-white bg-[url('@/assets/images/task-tag.png')] bg-center bg-no-repeat duration-[.2s] ease-in-out hover:!bg-[#d6d6d6]"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(e);
                }}
              />
              <button
                id="project"
                className="mt-[5px] !h-[35px] !w-[35px] !rounded-[5px] !border !border-transparent bg-white bg-[url('@/assets/images/task-project.png')] bg-center bg-no-repeat duration-[.2s] ease-in-out hover:!bg-[#d6d6d6]"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(e);
                }}
              />
            </div>
          </div>
          {selected !== "" && (
            <div className="relative">
              {selected === "datetime" && (
                <div className="absolute left-0 w-fit rounded-[10px] border border-[#b8b8b8] bg-white">
                  <p className="border-b-[.1px] border-b-[#494949] px-[7px] py-[5px] !font-bold !text-[#494949]">
                    Due
                  </p>
                  <button
                    className="absolute top-[5px] right-[5px] h-[20px] w-[20px] border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.06s] ease-in-out hover:scale-[1.2]"
                    onClick={handleSelectionClose}
                  />
                  <div className="mt-[20px] px-[7px] py-[5px]">
                    <input
                      type="date"
                      className="me-2 cursor-text rounded-[5px] border border-[#3085c3] px-[7px] py-[5px]"
                      {...register("date")}
                    />
                    <input
                      type="time"
                      className="cursor-text rounded-[5px] border border-[#3085c3] px-[7px] py-[5px]"
                      {...register("time")}
                    />
                  </div>
                  <div className="mt-[10px] px-[7px] py-[5px] text-end">
                    <button
                      className="!rounded-[5px] border !border-[#bbbbbb] !bg-white px-[10px] py-[2px] duration-[.2s] ease-in-out hover:!border-black"
                      onClick={() => {
                        handleOk();
                      }}
                    >
                      OK
                    </button>
                  </div>
                </div>
              )}
              {selected === "tag" && (
                <div className="absolute right-0 w-fit rounded-[10px] border border-[#b8b8b8] bg-white">
                  <p className="mb-0 border-b-[.1px] border-b-[#494949] px-[7px] py-[5px] !font-bold !text-[#494949]">
                    Tags
                  </p>
                  <button
                    className="absolute top-[5px] right-[5px] h-[20px] w-[20px] border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.06s] ease-in-out hover:scale-[1.2]"
                    onClick={handleSelectionClose}
                  />
                  {tags &&
                    tags.length !== 0 &&
                    tags.map((tag) => {
                      return (
                        <p
                          key={tag.id}
                          id={tag.name}
                          className="mb-0 cursor-pointer border-b border-b-[#d1d1d1] px-[7px] py-[5px] !text-[#727272] hover:bg-[#f1f1f1]"
                          onClick={(e) => addTaskTag(e)}
                        >
                          {tag.name}
                        </p>
                      );
                    })}
                  <p
                    className="text-success mb-0 cursor-pointer rounded-br-[10px] rounded-bl-[10px] px-[7px] py-[5px] hover:bg-[#f1f1f1]"
                    onClick={openAddFormModal}
                  >
                    + Add new tag
                  </p>
                </div>
              )}
              {selected === "project" && (
                <div className="absolute right-0 w-fit rounded-[10px] border border-[#b8b8b8] bg-white">
                  <p className="mb-0 border-b-[.1px] border-b-[#494949] px-[7px] py-[5px] !font-bold !text-[#494949]">
                    Projects
                  </p>
                  <button
                    className="absolute top-[5px] right-[5px] h-[20px] w-[20px] border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.06s] ease-in-out hover:scale-[1.2]"
                    onClick={handleSelectionClose}
                  />
                  {projects &&
                    projects.length !== 0 &&
                    projects.map((project) => {
                      return (
                        <p
                          key={project.id}
                          id={project.name}
                          className="mb-0 cursor-pointer border-b border-b-[#d1d1d1] px-[7px] py-[5px] !text-[#727272] hover:bg-[#f1f1f1]"
                          onClick={(e) => setProject(e)}
                        >
                          {project.name}
                        </p>
                      );
                    })}
                  <p
                    className="text-success mb-0 cursor-pointer rounded-br-[10px] rounded-bl-[10px] px-[7px] py-[5px] hover:bg-[#f1f1f1]"
                    onClick={openAddFormModal}
                  >
                    + Add new project
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="mt-5">
            {errors.title && (
              <p className="text-danger">{errors.title.message}</p>
            )}
            <button
              className="me-1 !rounded-[5px] !border !border-transparent !bg-[#3882f0] px-[10px] py-[5px] text-white duration-[.2s] ease-in-out hover:!bg-[#3085C3]"
              type="submit"
            >
              Add task
            </button>
            <button
              className="!rounded-[5px] !border !border-[#bbbbbb] bg-white px-[10px] py-[5px] duration-[.2s] ease-in-out hover:!border-black"
              onClick={(e) => {
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
  );
}

export default AddTask;
