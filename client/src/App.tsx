import MiniLibrary from "./components/Pages/Library"
import PlayProg from "./components/Pages/PlayProg"
import SongTitle from "./components/StaticComps/Title"
import MainOptions from "./components/Pages/MainOptions"
import Active from "./components/StaticComps/Active"
import Greeting from "./components/StaticComps/Greetings"
import ListenTogether from "./components/Pages/ListenTogether"
import Pomodoro from "./components/Pages/Pomodoro"
// import Settings from "./components/Pages/Settings"
import {useState} from "react";

type PageType = "home" | "browse" | "task" | "settings";

function App() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [pageHistory, setPageHistory] = useState<PageType[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const navigateTo = (page: PageType) => {
    const newHistory = pageHistory.slice(0, historyIndex + 1);
    newHistory.push(page);
    setPageHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setActivePage(page);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setActivePage(pageHistory[newIndex]);
    }
  };

  const goForward = () => {
    if (historyIndex < pageHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setActivePage(pageHistory[newIndex]);
    }
  };

  return (
    <div className="flex flex-row h-screen w-screen text-gray-300 overflow-hidden overflow-y-auto backdrop-blur-sm backdrop-saturate-150 backdrop-brightness-90 backdrop-grayscale-40">
      <div className="flex flex-col w-[80%] h-full  min-h-0 min-w-0 ">
        
        <div className="flex flex-row flex-1 backdrop-blur-xl rounded-[21px] p-1 bg-gray-900/40 m-2 min-h-0 min-w-0 border-gray-700 border-2">
          <div className="flex-col overflow-hidden w-[20%] flex  gap-1">
            <MainOptions setPage={navigateTo} />
            <ListenTogether />
            <Pomodoro />
          </div>
          <div className="flex-1 flex w-[80%] flex-col ml-1 min-h-0 min-w-0">
            <Greeting 
              index={0} 
              onPrev={goBack} 
              onNext={goForward} 
              onSettings={() => navigateTo("settings")} 
            />
            <Active activePage={activePage} slideDirection="down" />
          </div>
        </div>

        <div className="backdrop-blur-xl rounded-[21px] p-1 bg-gray-900/40 m-2 border-gray-700 border-2">
          <SongTitle />
        </div>

      </div>
      
      <div className="w-[20%] flex flex-col backdrop-blur-xl rounded-[21px] bg-gray-900/40 m-2 border-gray-700 border-2">
        <MiniLibrary />
        <PlayProg />
      </div>
    </div>
  );
}

export default App