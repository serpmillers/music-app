import Sidebar from "./components/StaticComps/Sidebar"
import Navigation from "./components/Pages/Navigation"
import PlayProg from "./components/StaticComps/PlayProg"

function App() {
  return (
    <div className="flex flex-row h-screen text-gray-300">
      <div className="w-[20%] h-full backdrop-blur-3xl flex">
        <Sidebar />
      </div>

      <div className="flex-col flex-1 backdrop-blur-3xl flex">
        <Navigation />
        <PlayProg />
      </div>
    </div>
  )
}

export default App