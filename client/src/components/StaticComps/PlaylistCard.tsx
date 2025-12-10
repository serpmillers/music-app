import React from "react";

interface PlaylistCardProps {
  artUrl: string;
  name: string;
  madeby: string;
  onClick?: () => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ artUrl, name, madeby, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="flex items-center w-full max-w-md p-4 rounded-xl backdrop-blur-2xl shadow-md transition hover:bg-white/20 border-gray-700 border-2 cursor-pointer"
    >
      <img
        src={artUrl}
        alt={name}
        className="w-10 h-10 rounded-lg object-cover mr-4 shadow"
      />
      <div className="flex flex-col justify-center ">
        <span className="text-lg font-semibold text-white drop-shadow-sm">{name}</span>
        <span className="text-sm text-gray-200 drop-shadow-sm">{madeby}</span>
      </div>
    </div>
  );
};

export default PlaylistCard;