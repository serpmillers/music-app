import Home from "../Pages/Home";
import Browse from "../Pages/Browse";
import TaskList from "../Pages/TaskList";
import Settings from "../Pages/Settings";
import Playlist from "../Pages/Playlist";

type PageType = "home" | "browse" | "task" | "settings" | "playlist";

type Props = {
  activePage: PageType;
  slideDirection?: "up" | "down";
  playlistData?: any;
};

const Active = ({ activePage, playlistData }: Props) => {
  return (
    <div className="flex flex-col grow component min-h-0 animate-fade-in">
      {activePage === "home" && <Home />}
      {activePage === "browse" && <Browse />}
      {activePage === "task" && <TaskList />}
      {activePage === "settings" && <Settings />}
      {activePage === "playlist" && <Playlist playlistData={playlistData} />}
    </div>
  );
};

export default Active;