import { useAddTask } from "@/hooks/useAddTask";
import LoadingPage from "@/pages/LoadingPage";
import { Task } from "@/types/common";
import { INITIAL_USER_VALUE } from "@/utils/storage_const";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import AddTask, { AddTaskForm } from "../AddTask/AddTask";
import useModal from "@/hooks/useModal";
import { useUpdateTask } from "@/hooks/useUpdateTask";
import { useUpdateState } from "@/hooks/useUpdateState";
import TaskDetail from "./TaskDetail";
import { useDeleteTask } from "@/hooks/useDeleteTask";
import DeleteConfirm from "../DeleteTask/DeleteConfirm";
import TaskCard from "./TaskCard";
import EmptyPage from "@/pages/EmptyPage";
import Header from "../../Header";
import { useGetTasks } from "@/hooks/useGetTasks";
import Calendar from "@/pages/Today/_components/Calendar";
import { TaskFilterPayload } from "@/types/payload";
import { keepPreviousData } from "@tanstack/react-query";
import dayjs from "dayjs";
import customToast from "@/utils/toast";

interface Props {
  title: string;
  type: string;
}

export default function TaskList({ title, type }: Props) {
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<
    Omit<TaskFilterPayload, "userID"> | undefined
  >();
  const [isMenuShown, setIsMenuShown] = useState(false);
  const [task, setTask] = useState<Task>({
    id: "",
    userID: "",
    title: "",
    description: "",
    time: "",
    project: "",
    tags: "",
    isDone: false,
    date: "",
  });
  const setSearchFilters = () => {
    let searchFilters = {};
    const today =
      dayjs().year() +
      "-" +
      ("0" + (dayjs().month() + 1)).slice(-2) +
      "-" +
      ("0" + dayjs().date()).slice(-2);
    if (type === "today") {
      searchFilters = { ...searchFilters, date: today };
    } else if (type === "upcoming") {
      const time =
        dayjs().hour() + ":" + dayjs().minute() + ":" + dayjs().second();
      searchFilters = {
        ...searchFilters,
        date: today,
        time: time,
        isDone: false,
      };
    } else if (type === "tag") {
      searchFilters = { ...searchFilters, tag: title };
    } else if (type === "project") {
      searchFilters = { ...searchFilters, project: title };
    }
    return searchFilters;
  };
  const [user] = useSessionStorage("user", INITIAL_USER_VALUE);
  const {
    data: tasks,
    refetch: refetchTasks,
    isLoading: taskIsLoading,
  } = useGetTasks(
    { userID: user.id, ...filters },
    {
      queryKey: ["tasks", user.id, filters],
      placeholderData: keepPreviousData,
    },
  );
  const { mutate: addTask } = useAddTask({
    onSuccess: (data) => {
      if (data.code && data.code === 201) {
        customToast.success(data.msg);
        refetchTasks();
      } else {
        customToast.error(data.msg);
      }
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeAddTaskModal();
    },
  });
  const {
    open: openAddTaskModal,
    close: closeAddTaskModal,
    Modal: AddTaskModal,
  } = useModal({ children: AddTask });

  const handleAddTask = (task: AddTaskForm) => {
    addTask({ ...task, isDone: false, userID: user.id });
  };

  const { mutate: updateTask } = useUpdateTask({
    onSuccess: (data) => {
      if (data.code && data.code === 200) {
        customToast.success(data.msg);
        refetchTasks();
      } else {
        customToast.error(data.msg);
      }
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeTaskDetailModal();
    },
  });

  const { mutate: updateState } = useUpdateState({
    onSuccess: () => {
      refetchTasks();
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeTaskDetailModal();
    },
  });

  const handleUpdateState = (task: Task) => {
    updateState({ id: task.id, userID: task.userID, isDone: task.isDone });
  };

  const {
    open: openTaskDetailModal,
    close: closeTaskDetailModal,
    Modal: TaskDetailModal,
  } = useModal({ children: TaskDetail });

  const handleUpdateTask = (task: Task) => {
    updateTask(task);
  };

  const { mutate: deleteTask, isPending } = useDeleteTask({
    onSuccess: (data) => {
      customToast.success(data.msg);
      refetchTasks();
    },
    onError: (error) => {
      customToast.error("Error: " + error.message);
    },
    onSettled: () => {
      closeDeleteConfirmModal();
    },
  });

  const {
    open: openDeleteConfirmModal,
    close: closeDeleteConfirmModal,
    Modal: DeleteConfirmModal,
  } = useModal({ children: DeleteConfirm });

  const handleOpenDeleteConfirmModal = (task: Task) => {
    setTask(task);
    openDeleteConfirmModal();
  };

  const handleDeleteTask = () => {
    if (!task) return;
    deleteTask(task.id);
  };
  const handleTaskClick = (task: Task) => {
    setTask(task);
    openTaskDetailModal();
  };
  const handleSearch = () => {
    setFilters({ ...filters, title: search });
  };
  useEffect(() => {
    setFilters(setSearchFilters());
  }, [type, title]);
  return (
    <>
      {(isPending || taskIsLoading) && <LoadingPage />}
      <DeleteConfirmModal type="task" onConfirm={handleDeleteTask} />
      <div className="flex font-[Nunito]" onClick={() => setIsMenuShown(false)}>
        <TaskDetailModal selectedTask={task} onConfirm={handleUpdateTask} />
        <AddTaskModal onConfirm={handleAddTask} />
        <Header isMenuShown={isMenuShown} setIsMenuShown={setIsMenuShown} />
        <div className="w-full lg:flex">
          <div className={`px-[30px] py-[15px] ${type === "today" ? "lg:w-2/3" : "w-full"} lg:px-[60px]`}>
            <div className="flex justify-between">
              <h2 className="!mb-[40px] !ml-[8px] !font-black">{title}</h2>
              <div className="flex items-start">
                <input
                  className="h-[40px] w-[200px] rounded-tl-[25px] rounded-bl-[25px] border-[.5px] border-[#b1b1b1] px-[15px] py-[8px] focus:border-[#4a8fc1] focus:outline-none lg:w-[300px]"
                  type="text"
                  name="title"
                  id="search-text"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button
                  className="!border-l-none h-[40px] w-[60px] !rounded-tr-[25px] !rounded-br-[25px] !border-[.5px] !border-[#b1b1b1] bg-[#f1f1f1] bg-[url('@/assets/images/search-btn.png')] bg-center bg-no-repeat hover:!bg-[#e9e9e9] hover:shadow-2xs"
                  onClick={handleSearch}
                />
              </div>
            </div>
            {!(type === "project" || type === "tag") && (
              <div
                className="mb-[10px] ml-[8px] rounded-[10px] border-2 border-transparent bg-[#e5e5e58e] px-[20px] py-[10px] text-[18px] leading-[30px] font-bold text-[#4d4d4dd1] hover:cursor-pointer hover:!border-[#bbbbbb]"
                onClick={openAddTaskModal}
              >
                + Click here to add tasks
              </div>
            )}
            {tasks && tasks.length > 0 ? (
              <div className="h-[80vh] overflow-x-hidden overflow-y-scroll p-[8px]">
                {tasks.map((task) => {
                  return (
                    <TaskCard
                      key={task.id}
                      task={task}
                      handleUpdateState={handleUpdateState}
                      handleClick={handleTaskClick}
                      handleDelete={handleOpenDeleteConfirmModal}
                    />
                  );
                })}
              </div>
            ) : (
              <EmptyPage />
            )}
          </div>
          {title === "Today" && tasks && <Calendar tasks={tasks} />}
        </div>
      </div>
    </>
  );
}
