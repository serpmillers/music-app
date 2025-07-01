import MiniLibrary from "./components/Pages/Library"
import PlayProg from "./components/Pages/PlayProg"
import Ads from "./components/StaticComps/Ads"
import MainOptions from "./components/Pages/MainOptions"
import Active from "./components/StaticComps/Active"
import Greeting from "./components/StaticComps/Greetings"
import ListenTogether from "./components/Pages/ListenTogether"
import Pomodoro from "./components/Pages/Pomodoro"
import {useState} from "react";

function App() {
  const [activePage, setPage] = useState<"home" | "browse" | "task">("home");

  return (
    <div className="flex flex-row h-screen w-screen text-gray-300 overflow-hidden overflow-y-auto">
      <div className="flex flex-col w-[80%] h-full backdrop-blur-3xl min-h-0 min-w-0">
        <div className="backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-2">
          <Ads />
        </div>
        <div className="flex flex-row flex-1 backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-2 min-h-0 min-w-0">
          <div className="flex-col overflow-hidden w-[20%] flex m-2 gap-4">
            <MainOptions setPage={setPage} />
            <ListenTogether />
            <Pomodoro />
          </div>
          <div className="flex-1 flex w-[80%] flex-col m-2 min-h-0 min-w-0">
            <Greeting />
            <Active activePage={activePage} />
          </div>
        </div>
      </div>

      <div className="w-[20%] flex flex-col backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-2">
        <MiniLibrary />
        <PlayProg />
      </div>
    </div>
  );
}

export default App