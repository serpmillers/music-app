// did this for aesthetics, it might be changed to advertisements section later, most likely not though

import {useState} from "react";
import {usePlayer} from "../../context/PlayerContext";

const Title = () => {
  const { currentTrack } = usePlayer();
  const [isLiked, setIsLiked] = useState(false);

  const song = currentTrack ?? { name: "Song Title", artist: "Artist Name" };

  return (
    <div className="flex flex-col w-[100%] animate-fade-in">
      <div className=" component flex items-center justify-center">
        <div className="flex items-center gap-2 h-24 px-6">
          <h2 className="text-3xl font-bold text-white">{song.title ?? song.name}</h2>
          <span className="text-2xl text-gray-400">•</span>
          <p className="text-2xl font-semibold text-gray-300">{song.artist ?? song.artist}</p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <button
            className={`transition-all duration-200 hover:scale-125 active:scale-90 ml-4 ${isLiked ? 'text-green-500' : 'text-white'}`}
            onClick={() => setIsLiked(!isLiked)}
            aria-label="Like"
            title="Like"
          >
            <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Title;
