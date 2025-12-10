type Album = {
  title: string;
  artist: string;
  coverUrl: string;
};

type AlbumCardProps = {
  album: Album;
  onClick?: () => void;
};

const AlbumCard = ({ album, onClick }: AlbumCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 border-gray-700 border-2"
    >
      <img
        src={album.coverUrl}
        alt={`${album.title} cover`}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <div>
        <h3 className="text-base font-semibold truncate">{album.title}</h3>
        <p className="text-sm text-gray-400 truncate">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;