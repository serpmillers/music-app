import {useState} from "react";
import { PlayerProvider } from "./context/PlayerContext";
import { TasksProvider } from "./context/TasksContext";
import { PomodoroSettingsProvider } from "./context/PomodoroSettingsContext";
import Library from "./components/Pages/Library";
import PlayProg from "./components/Pages/PlayProg";
import SongTitle from "./components/StaticComps/Title";
import MainOptions from "./components/Pages/MainOptions";
import Active from "./components/StaticComps/Active";
import Greeting from "./components/StaticComps/Greetings";
import ListenTogether from "./components/Pages/ListenTogether";
import Pomodoro from "./components/Pages/Pomodoro";

type PageType = "home" | "browse" | "task" | "settings" | "playlist";

function App() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [pageHistory, setPageHistory] = useState<PageType[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [playlistData, setPlaylistData] = useState<any>(null);
  const [direction, setDirection] = useState<1|-1>(1);

  const navigateTo = (page: PageType, data?: any) => {
    const newHistory = pageHistory.slice(0, historyIndex + 1);
    newHistory.push(page);
    setPageHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActivePage(page);
    setDirection(1);
    if (page === "playlist" && data) {
      setPlaylistData(data);
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActivePage(pageHistory[newIndex]);
      setDirection(-1);
    }
  };

  const goForward = () => {
    if (historyIndex < pageHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActivePage(pageHistory[newIndex]);
      setDirection(1);
    }
  };

  return (
    <PlayerProvider>
      <TasksProvider>
        <PomodoroSettingsProvider>
          <div className="flex flex-row h-screen w-screen text-gray-300 overflow-hidden overflow-y-auto backdrop-blur-sm backdrop-saturate-150 backdrop-brightness-90 backdrop-grayscale-40">
            <div className="flex flex-col w-[80%] h-full  min-h-0 min-w-0 ">
              
              <div className="flex flex-row flex-1 backdrop-blur-xl rounded-[21px] p-1 bg-gray-900/40 m-2 min-h-0 min-w-0 border-gray-700 border-2">
                <div className="flex-col overflow-hidden w-[20%] flex  gap-1 animate-fade-in">
                  <MainOptions setPage={navigateTo} />
                  <ListenTogether />
                  <Pomodoro />
                </div>
                <div className="flex-1 flex w-[80%] flex-col ml-1 min-h-0 min-w-0 animate-fade-in">
                  <Greeting 
                    index={0} 
                    onPrev={goBack} 
                    onNext={goForward} 
                    onSettings={() => navigateTo("settings")} 
                  />
                  <Active
                    activePage={activePage}
                    slideDirection={direction === 1 ? "left" : "right"}
                    playlistData={playlistData}
                    onNavigate={navigateTo}
                  />
                </div>
              </div>

              <div className="backdrop-blur-xl rounded-[21px] p-1 bg-gray-900/40 m-2 border-gray-700 border-2">
                <SongTitle />
              </div>

            </div>
            
            <div className="w-[20%] flex flex-col backdrop-blur-xl rounded-[21px] bg-gray-900/40 m-2 border-gray-700 border-2">
              {/* pass the handler so Library can open playlist pages */}
              <Library onPlaylistClick={(data) => navigateTo("playlist", data)} />
              <PlayProg />
            </div>
          </div>
        </PomodoroSettingsProvider>
      </TasksProvider>
    </PlayerProvider>
  );
}

export default App;
