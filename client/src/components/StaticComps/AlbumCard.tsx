import {useState} from "react";
import { usePlayer } from "../../context/PlayerContext";
import { makeTrackId } from "../../context/trackID"
import play from "../../assets/spotifyButtons/play.png";
import pause from "../../assets/spotifyButtons/pause.png";

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
  const { setQueue } = usePlayer();
  const [hovered, setHovered] = useState(false);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation();

    const fallbackCount = 6;
    const sourceTracks = (album as any).tracks && (album as any).tracks.length
      ? (album as any).tracks
      : Array.from({length: fallbackCount}).map((_,i) => ({
          id: makeTrackId(album.title, i),   // stable id
          title: `${album.title} - Track ${i+1}`,
          artist: album.artist,
          duration: 180,
          artUrl: album.coverUrl,
        }));

    const tracks = sourceTracks.map((song:any, idx:number) => ({
      id: String(song.id ?? makeTrackId(album.title, idx)),
      title: song.title ?? song.name ?? `Track ${idx + 1}`,
      artist: song.artist ?? album.artist ?? "",
      duration: typeof song.duration === "number" ? song.duration : 180,
      artUrl: song.artUrl ?? song.cover ?? album.coverUrl,
      ...song
    }));

    setQueue(tracks, 0, true);
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 border-gray-700 border-2"
      tabIndex={0}
    >
      <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3">
        <img
          src={album.coverUrl}
          alt={`${album.title} cover`}
          className="w-full h-full object-cover rounded-lg"
        />

        <button
          className={`
            absolute bottom-2 right-2 
            bg-gray-700/40 backdrop-blur-sm p-3 rounded-2xl
            transition-all duration-200 transform
            ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            pointer-events-auto
          `}
          onClick={handlePlay}
          aria-label={`Play ${album.title}`}
        >
          <img src={play} alt="Play" className="w-5 h-5" />
        </button>
      </div>

      <div>
        <h3 className="text-base font-semibold truncate">{album.title}</h3>
        <p className="text-sm text-gray-400 truncate">{album.artist}</p>
      </div>
    </div>
  );
};

export default AlbumCard;
