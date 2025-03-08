import { Task } from "@/types/common";
import dayjs from "dayjs";

interface Props {
  task: Task;
  handleClick: (task: Task) => void;
  handleDelete: (task: Task) => void;
  handleUpdateState: (task: Task) => void;
}

function TaskCard({
  task,
  handleUpdateState,
  handleClick,
  handleDelete,
}: Props) {
  return (
    <div
      key={task.id}
      className="relative mb-[10px] flex items-center rounded-[10px] px-[20px] py-[10px] shadow-md shadow-[#c6c6c6] duration-[.2s] ease-in-out hover:translate-x-[5px] hover:translate-y-[-5px]"
      onClick={() => handleClick(task)}
    >
      <div
        className={`mr-[20px] h-[22px] w-[22px] rounded-[50%] border border-[#b8b8b8] ${task.isDone && "!border-none bg-[#bb3abd] bg-[url('@/assets/images/check-mark.png')] bg-center bg-no-repeat invert-[1]"}`}
        onClick={(e) => {
          e.stopPropagation();
          handleUpdateState(task);
        }}
      />
      <div>
        <p
          className={`!mb-0 !text-[20px] !leading-[40px] !font-bold text-[#484848] ${task.isDone && "line-through"}`}
        >
          {task.title}
        </p>
        <div className="flex w-full">
          {task.project && task.project !== "" && (
            <p
              className={`text-secondary after:mx-[5px] after:inline-block after:size-[20px] after:bg-transparent after:bg-[url('@/assets/images/full-stop.png')] after:!bg-[position:0_8px] after:bg-no-repeat`}
            >
              {task.project}
            </p>
          )}
          {task.tags &&
            task.tags.length !== 0 &&
            JSON.parse(task.tags).map((tag: string) => {
              return (
                <p
                  key={tag}
                  className={`text-secondary after:mx-[5px] after:inline-block after:size-[20px] after:bg-transparent after:bg-[url('@/assets/images/full-stop.png')] after:!bg-[position:0_8px] after:bg-no-repeat`}
                >
                  {tag}
                </p>
              );
            })}

          <p
            className={`text-secondary mt-1 ${!task.date && "bg-transparent bg-[url('@/assets/images/refresh.png')] bg-[position:0_3px] bg-no-repeat pl-[20px]"}`}
          >
            {task.date
              ? dayjs(task.date).format("YYYY-MM-DD") + " " + task.time
              : task.time}
          </p>
        </div>
      </div>
      <button
        className="absolute top-[5px] right-[5px] h-[20px] w-[20px] border-none bg-[url('@/assets/images/close.png')] bg-center bg-no-repeat duration-[.06s] ease-in-out hover:scale-[1.2]"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(task);
        }}
      />
    </div>
  );
}

export default TaskCard;
