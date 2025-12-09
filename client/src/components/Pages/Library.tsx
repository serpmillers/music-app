import stack from '../../assets/spotifyButtons/stack.png';
import like from '../../assets/spotifyButtons/like.png';
import PlaylistCard from '../StaticComps/PlaylistCard';

const Sidebar = () => {
  return (
    <div className="p-1 w-[100%] flex-col gap-2 h-[60%] flex">

      <div className="flex flex-col h-[100%] min-h-0 component">
        <div className=" flex-col flex cursor-pointer h-full">
          <div className="flex items-center py-8 cursor-pointer text-white h-[32px] text-[18px] rounded-t-xl border-gray-800/0 border-b-gray-700 border-2">
            <img src={stack} alt="Home" className="w-5 h-5 mx-3" />
            <span>Library</span>
          </div>

          <div className='flex-1 min-h-0 overflow-hidden overflow-y-auto flex flex-col gap-3 p-2'>
            {/* Example playlists */}
            <PlaylistCard
              artUrl={like}
              name="Liked Songs"
              madeby="ScaredBeing"
            />
            <PlaylistCard
              artUrl={"https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"}
              name="Some Songs"
              madeby="ScaredBeing"
            />
            <PlaylistCard
              artUrl={"https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"}
              name="Some Songs"
              madeby="ScaredBeing"
            />
            <PlaylistCard
              artUrl={"https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"}
              name="Some Songs"
              madeby="ScaredBeing"
            />
            <PlaylistCard
              artUrl={"https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"}
              name="Some Songs"
              madeby="ScaredBeing"
            />
            <PlaylistCard
              artUrl={"https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"}
              name="Some Songs"
              madeby="ScaredBeing"
            />
            
          </div>

        </div>
      </div>
    </div>
  )
};

export default Sidebar