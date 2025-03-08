import { Task } from "@/types/common";
import { memo, useEffect, useState } from "react";

interface Schedule {
  time: string;
  tasks: Task[];
}

const Calendar = memo(({ tasks }: { tasks: Task[] }) => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);

  useEffect(() => {
    const newSchedules = [];
    for(let i = 0; i < 25; i++){
      const time = ("0" + i + ":00").slice(-5);
      const filteredTask = tasks.filter((task) => parseInt(task.time.slice(0, 2)) === i);
      newSchedules.push({time: time, tasks: [...filteredTask]});
    }
    setSchedules(newSchedules);
  }, [tasks, setSchedules]);

  return (
    <div className="w-[50%] py-[15px] pr-[30px]">
      <h2 className="!mb-[40px] !ml-[8px] !font-black">Event Calendar</h2>
      <div className="h-[85vh] overflow-y-scroll rounded-[10px] bg-white p-[20px] shadow-sm shadow-[#b0b0b0]">
        {schedules.map(({time, tasks}) => {
          return (
            <div key={time} className="flex items-start">
              <p className="mr-[10px] mb-0 text-[#929292]">{time}</p>
              <div className="mt-[10px] flex h-[60px] w-full border-t-[.5px] border-t-[#f1f1f1]">
                {tasks.map((task) => {
                    return (
                      <div
                        key={task.id}
                        className="relative top-(--space) h-fit w-full border-l-[5px] border-l-[#3085C3] bg-[#3882f069] px-[20px] py-[7px]"
                        style={
                          {
                            "--space":
                              (Number(task.time.slice(3, 5)) / 60) * 100 + "%",
                          } as React.CSSProperties
                        }
                      >
                        <p className="mb-[5px] !text-[11px] font-bold text-[#363636]">
                          {task.time.localeCompare("12:00") !== -1
                            ? task.time + " PM"
                            : task.time + " AM"}
                        </p>
                        <p className="mb-0 text-[18px] font-bold text-[#363636]">
                          {task.title}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Calendar;
