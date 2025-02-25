import { Task } from "@/types/common";

function Calendar({ tasks }: { tasks: Task[] }) {
    const times = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
        "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
        "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"
    ];
    return (
        <div className="calendar-container">
            <h2 className="page-title">Event Calendar</h2>
            <div className="calendar">
                {times.map(time => {
                    return (
                        <div key={time} className="time-container">
                            <p className="time-text">{time}</p>
                            <div className="timeline">
                                {tasks.filter(task => task.time.localeCompare(time) === 1 && task.time.localeCompare(times[times.indexOf(time) + 1]) === -1).map(task => {
                                    return (
                                        <div key={task.id} className="task-card" style={{ '--space': (Number(task.time.slice(3, 5)) / 60) * 100 + "%" }}>
                                            <p className="task-time">{
                                                task.time.slice(0, task.time.lastIndexOf(":")).localeCompare("12:00") === 1 ?
                                                    task.time.slice(0, task.time.lastIndexOf(":")) + " PM"
                                                    :
                                                    task.time.slice(0, task.time.lastIndexOf(":")) + " AM"
                                            }</p>
                                            <p className="task-title-text">{task.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Calendar;