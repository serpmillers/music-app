import home from '../../assets/spotifyButtons/home.png';
import search from '../../assets/spotifyButtons/search.png';
import queue from '../../assets/spotifyButtons/queue.png';

type Props = {
  setPage: (page: "home" | "browse" | "task") => void;
}

const MainOptions = ({ setPage }: Props) => {
  return (
    <div className="w-full component">
      <div className="p-2 flex-col flex gap-2">
        <div
          className="flex items-center py-1 hover:text-white text-gray-300 cursor-pointer transition-colors duration-300"
          onClick={() => setPage("home")}
        >
          <img src={home} alt="Home" className="w-5 h-5 mx-3" />
          <span>Home</span>
        </div>
        <div
          className="flex items-center py-1 hover:text-white text-gray-300 cursor-pointer transition-colors duration-300"
          onClick={() => setPage("browse")}
        >
          <img src={search} alt="Browse" className="w-5 h-5 mx-3" />
          <span>Browse</span>
        </div>
        <div
          className="flex items-center py-1 hover:text-white text-gray-300 cursor-pointer transition-colors duration-300"
          onClick={() => setPage("task")}
        >
          <img src={queue} alt="Browse" className="w-5 h-5 mx-3" />
          <span>Tasks</span>
        </div>
      </div>
    </div>
  )
}

export default MainOptions
