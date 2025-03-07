import { Task } from "@/types/common";

function Calendar({ tasks }: { tasks: Task[] }) {
  const times = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  return (
    <div className="w-[50%] py-[15px] pr-[30px]">
      <h2 className="!mb-[40px] !ml-[8px] !font-black">Event Calendar</h2>
      <div className="h-[85vh] overflow-y-scroll rounded-[10px] bg-white p-[20px] shadow-sm shadow-[#b0b0b0]">
        {times.map((time) => {
          return (
            <div key={time} className="flex items-start">
              <p className="mr-[10px] mb-0 text-[#929292]">{time}</p>
              <div className="mt-[10px] flex h-[60px] w-full border-t-[.5px] border-t-[#f1f1f1]">
                {tasks
                  .filter(
                    (task) =>
                      task.time.localeCompare(time) === 1 &&
                      task.time.localeCompare(
                        times[times.indexOf(time) + 1],
                      ) === -1,
                  )
                  .map((task) => {
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
                          {task.time.localeCompare("12:00") === 1
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
}

export default Calendar;
