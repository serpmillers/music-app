import Home from "../Pages/Home";
import Browse from "../Pages/Browse";
import TaskList from "../Pages/TaskList";
import Settings from "../Pages/Settings";

type PageType = "home" | "browse" | "task" | "settings";

type Props = {
  activePage: PageType;
  slideDirection?: "up" | "down";
};

const Active = ({ activePage }: Props) => {
  return (
    <div className="flex flex-col grow component min-h-0 animate-fade-in">
      {activePage === "home" && <Home />}
      {activePage === "browse" && <Browse />}
      {activePage === "task" && <TaskList />}
      {activePage === "settings" && <Settings />}
    </div>
  );
};

export default Active;
