import home from '../../assets/spotifyButtons/home.png';
import search from '../../assets/spotifyButtons/search.png';

const MainOptions = () => {
  return (
    <div className="w-full component">
        <div className="p-2 flex-col flex cursor-pointer gap-2">
          <div className="flex items-center py-1 hover:text-white text-gray-300">
            <img src={home} alt="Home" className="w-5 h-5 mx-3" />
            <span>Home</span>
          </div>
          <div className="flex items-center py-1 hover:text-white text-gray-300">
            <img src={search} alt="Profile" className="w-5 h-5 mx-3" />
            <span>Browse</span>
          </div>
        </div>
      </div>
  );
}

export default MainOptions