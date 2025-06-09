import home from '../assets/home.png';
import search from '../assets/search.png';
import playlist from '../assets/stack.png';
const Sidebar = () => {
  return (
    <div className="w-[15%] h-full p-2 m-2 flex-col  gap-2 hidden lg:flex bg-gray-300/20 backdrop-blur-3xl rounded-2xl">
      <div className="">
        <div className="item-center p-2 flex-col flex cursor-pointer">
          <div className="flex items-center py-1 cursor-pointer justify-around hover:text-white text-gray-300">
            <img src={home} alt="Home" className="w-5 h-5" />
            <span>Home</span>
          </div>
          <div className="flex items-center py-1 cursor-pointer justify-around hover:text-white text-gray-300">
            <img src={search} alt="Profile" className="w-5 h-5" />
            <span>Search</span>
          </div>
          <div className="flex items-center py-1 cursor-pointer justify-around hover:text-white text-gray-300">
            <img src={playlist} alt="Profile" className="w-5 h-5" />
            <span>Playlists</span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Sidebar