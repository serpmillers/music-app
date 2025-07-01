import Home from "../Pages/Home";
import Browse from "../Pages/Browse";
import TaskList from "../Pages/TaskList";

type Props = {
  activePage: "home" | "browse" | "task"
}

const Active = ({activePage}: Props) => {
  return (
    <div className="flex flex-col grow component min-h-0">
      {activePage === "home" && <Home />}
      {activePage === "browse" && <Browse />}
      {activePage === "task" && <TaskList />}
    </div>
  );
};

export default Active;
