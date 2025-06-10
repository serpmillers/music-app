import home from '../../assets/spotifyButtons/home.png';
import search from '../../assets/spotifyButtons/search.png';
import stack from '../../assets/spotifyButtons/stack.png';
import MiniLibrary from './MiniLibrary';

const Sidebar = () => {
  return (
    <div className="p-2  w-[100%] flex-col gap-2 hidden h-[98.9%] lg:flex">

      <div className="flex flex-col  bg-gray-900/60 backdrop-blur-3xl rounded-2xl">
        <div className="p-2 flex-col flex cursor-pointer">
          <div className="flex items-center py-1 cursor-pointer hover:text-white text-gray-300">
            <img src={home} alt="Home" className="w-5 h-5 mx-3" />
            <span>Home</span>
          </div>
          <div className="flex items-center py-1 cursor-pointer hover:text-white text-gray-300">
            <img src={search} alt="Profile" className="w-5 h-5 mx-3" />
            <span>Browse</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gray-900/60 backdrop-blur-3xl grow min-h-0 rounded-2xl mt-2">
        <div className="p-2 flex-col flex cursor-pointer h-full">
          <div className="flex items-center py-1 cursor-pointer hover:text-white text-gray-300 ">
            <img src={stack} alt="Home" className="w-5 h-5 mx-3" />
            <span>Library</span>
          </div>

          <div className='flex-1 min-h-0 overflow-hidden'>
          <MiniLibrary />
          </div>

        </div>
      </div>

    </div>
  )
};

export default Sidebar