import mic from '../../assets/spotifyButtons/mic.png';

const ListenTogether = () => {
  return (
    <div className="flex flex-col min-h-0 component overflow-hidden flex-1">
      <div className="p-2 flex flex-col h-full">
        
        
        <div className="flex items-center py-1 text-white">
          <img src={mic} alt="Mic" className="w-5 h-5 mx-3" />
          <span>Listen Together</span>
        </div>
        
        <div className="flex-1 overflow-y-auto mt-2">
          
        </div>
      </div>
    </div>
  );
};

export default ListenTogether;
