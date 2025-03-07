import { useParams } from "react-router-dom";
import NotFound from "../NotFound";
import TaskList from "@/components/Registered/Task/ViewTask/TaskList";

function FilteredTask() {
  const { type, name } = useParams();
  return name && type ? <TaskList title={name} type={type} /> : <NotFound />;
}

export default FilteredTask;
