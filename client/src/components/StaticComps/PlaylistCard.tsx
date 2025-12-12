import React, { useState } from "react";
import play from "../../assets/spotifyButtons/play.png";

interface PlaylistCardProps {
  artUrl: string;
  name: string;
  madeby: string;
  onClick?: () => void; // open playlist
  onPlay?: () => void; // play playlist
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({
  artUrl,
  name,
  madeby,
  onClick,
  onPlay
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="
        relative w-full max-w-md p-3 rounded-xl 
        backdrop-blur-2xl transition hover:bg-white/6 
        border border-gray-700 cursor-pointer flex items-center gap-3
      "
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onClick?.(); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Open ${name}`}
    >
      <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden shadow">
        <img
          src={artUrl}
          alt={name}
          className="w-full h-full object-cover"
        />

      </div>

      <div className="flex flex-col justify-center min-w-0">
        <div className="text-pretty font-semibold text-white truncate">{name}</div>
        <div className="text-sm text-gray-300 truncate">{madeby}</div>
      </div>

        <button
          className={`
            absolute right-3 
            bg-gray-700/40 backdrop-blur-sm p-3 rounded-2xl
            transition-all duration-200 transform
            ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}
            pointer-events-auto
          `}
          onClick={(e) => { 
            e.stopPropagation(); 
            onPlay?.(); 
          }}
          aria-label={`Play ${name}`}
        >
          <img src={play} alt="Play" className="w-5 h-5" />
        </button>
    </div>
  );
};

export default PlaylistCard;
