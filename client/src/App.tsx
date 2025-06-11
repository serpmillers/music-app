import MiniLibrary from "./components/Pages/MiniLibrary"
import Navigation from "./components/Pages/Navigation"
import PlayProg from "./components/Pages/PlayProg"
import Ads from "./components/StaticComps/Ads"
import MainOptions from "./components/Pages/MainOptions"
import Greeting from "./components/StaticComps/Top"
import ListenTogether from "./components/Pages/ListenTogether"
import Pomodoro from "./components/Pages/Pomodoro"

function App() {
  return (
    <div className="flex flex-row h-screen w-screen text-gray-300">
      <div className="flex flex-col w-[75%] backdrop-blur-3xl">
         <div className="backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-1"> 
          <Ads />
        </div>
        <div className="flex flex-row flex-1 backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-1">
          <div className="flex-col overflow-hidden w-[25%] flex m-2 gap-4">
            <MainOptions />
            <ListenTogether />
            <PlayProg />
          </div>

          <div className="flex-1 flex w-[50%] flex-col">
            <Greeting />
            <Navigation />
          </div>
        </div>
      </div>


      <div className="w-[25%] flex flex-col backdrop-blur-3xl rounded-2xl p-1 bg-gray-800/20 m-1">
        <MiniLibrary />
        <Pomodoro />
      </div>
    </div>
  )
}

export default App