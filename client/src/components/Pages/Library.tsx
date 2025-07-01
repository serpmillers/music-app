import stack from '../../assets/spotifyButtons/stack.png';
import PlaylistCard from '../StaticComps/PlaylistCard';

const Sidebar = () => {
  return (
    <div className="p-2 w-[100%] flex-col gap-2 h-[60%] flex">

      <div className="flex flex-col h-[100%] min-h-0 component">
        <div className="p-2 flex-col flex cursor-pointer h-full">
          <div className="flex items-center py-1 cursor-pointer text-white h-[32px]">
            <img src={stack} alt="Home" className="w-5 h-5 mx-3" />
            <span>Library</span>
          </div>

          <div className='flex-1 min-h-0 overflow-hidden overflow-y-auto'>
            
          </div>

        </div>
      </div>
    </div>
  )
};

export default Sidebar