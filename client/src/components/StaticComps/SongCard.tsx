// i just thought it'd be nice to have a single SongCard component that can do both grid and list layouts

// import React from "react";

type SongCardProps = {
  layout?: "grid" | "list";
  index?: number; // list
  artUrl: string;
  title: string;
  artist?: string;
  album?: string;
  dateAdded?: string;
  duration?: string;
  isPlaying?: boolean;
  onClick?: () => void;
};

const SongCard = ({
  layout = "grid",
  index = 0,
  artUrl,
  title,
  artist,
  album,
  dateAdded,
  duration,
  isPlaying = false,
  onClick,
}: SongCardProps) => {
  if (layout === "list") {
    // Full-width row mode
    return (
      <div
        onClick={onClick}
        role="button"
        aria-label={title}
        title={title}
        className={`
          grid grid-cols-[40px_1fr_1fr_1fr_80px]
          gap-4 px-4 py-3
          rounded-[18px]
          border border-gray-700
          hover:bg-white/5 hover:scale-[1.01]
          active:scale-95
          transition-all duration-150
          cursor-pointer
          ${isPlaying ? "border-green-500 bg-green-500/10" : ""}
        `}
      >
        {/* playing indicator */}
        <div className="flex items-center justify-center text-gray-400 group-hover:text-white">
          {isPlaying ? (
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <span className="group-hover:hidden">{index + 1}</span>
          )}
          <svg
            className="w-4 h-4 hidden group-hover:block"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>

        {/* Song Info */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={artUrl}
            alt={title}
            className="w-10 h-10 rounded-[12px] object-cover flex-shrink-0"
          />
          <div className="min-w-0">
            <div className={`font-medium truncate ${isPlaying ? "text-green-500" : "text-white"}`}>
              {title}
            </div>
            {artist && (
              <div className="text-sm text-gray-400 truncate">
                {artist}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center text-gray-400 text-sm truncate">{album}</div>
        <div className="flex items-center text-gray-400 text-sm">{dateAdded}</div>
        <div className="flex items-center justify-end text-gray-400 text-sm">{duration}</div>
      </div>
    );
  }

  // grid mode 
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className={`w-full text-left group transition-all duration-200 p-3 rounded-[21px] hover:scale-102 active:scale-95 border-2 border-gray-700 focus:outline-none ${
        isPlaying ? "border-green-500 bg-green-500/20" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 flex-shrink-0">
          <img src={artUrl} alt={title} className="w-full h-full object-cover rounded-2xl" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className={`font-medium truncate ${isPlaying ? "text-green-500" : "text-white"}`}>
              {title}
            </div>
          </div>

          {artist && <div className="text-sm text-gray-400 truncate">{artist}</div>}
        </div>

        {duration && <div className="text-sm text-gray-400 ml-4">{duration}</div>}
      </div>
    </button>
  );
};

export default SongCard;
