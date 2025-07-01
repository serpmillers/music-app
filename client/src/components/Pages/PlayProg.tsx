import play from "../../assets/spotifyButtons/play.png";
import pause from "../../assets/spotifyButtons/pause.png";
import prev from "../../assets/spotifyButtons/prev.png";
import next from "../../assets/spotifyButtons/next.png";
import { useState } from "react";

const PlayProg = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // seconds
  const song = {
    duration: 120, //seconds
    name: "Song Title",
    artist: "Artist Name",
    art: "https://images.squarespace-cdn.com/content/v1/5ee52f7d9edc8a7ee635591a/8df50655-6b68-460e-ad6c-5230001b9d5a/240404+-+063944+-+001.jpg"
  };

  // Calculate percentage for the filled part
  const percent = (progress / song.duration) * 100;
  // The '2%' below controls the softness of the transition
  const transitionWidth = 2; // percent

  return (
    <div className="p-2 flex-col gap-2 flex-1 flex overflow-hidden items-center component m-2">
      <div className="relative w-48 h-48 rounded-lg mb-4 group">
        <img
          src={song.art}
          alt="Song Art"
          className="w-full h-full object-cover rounded-2xl"
        />
        {/* Controls overlay, visible on hover */}
        <div className="absolute inset-0 flex items-center rounded-2xl justify-center backdrop-blur-[5px] bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="mx-2 text-white text-2xl"
            onClick={() => {/* prev logic */}}
            aria-label="Previous"
          >
            <img src={prev} alt="prev" className="w-5 h-5 justify-center items-center " />
          </button>
          <button
            className="mx-2 text-white text-3xl"
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <img src={pause} alt="Pause" className="w-5 h-5 justify-center items-center " /> : <img src={play} alt="Play" className="w-5 h-5 justify-center items-center " />}
          </button>
          <button
            className="mx-2 text-white text-2xl"
            onClick={() => {/* next logic */}}
            aria-label="Next"
          >
            <img src={next} alt="Next" className="w-5 h-5 justify-center items-center " />
          </button>
        </div>
      </div>
      {/* Progress bar and song info */}
      <div className="w-48 flex flex-col items-center">
        <input
          type="range"
          min={0}
          max={song.duration}
          value={progress}
          onChange={e => setProgress(Number(e.target.value))}
          className="w-full h-1 bg-transparent cursor-pointer custom-range"
          style={{
            background: `
              linear-gradient(
                to right,
                white 0%,
                white ${Math.max(percent - transitionWidth / 2, 0)}%,
                #bbb ${percent}%,
                #374151 ${percent + transitionWidth / 2}%,
                #374151 100%
              )
            `
          }}
        />
        <div className="flex justify-between w-full text-xs text-gray-400 mt-1">
          <span>{Math.floor(progress / 60)}:{String(progress % 60).padStart(2, "0")}</span>
          <span>{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}</span>
        </div>
        <div className="mt-2 text-center">
          <div className="font-semibold text-white">{song.name}</div>
          <div className="text-gray-400 text-sm">{song.artist}</div>
        </div>
      </div>
      {/* Custom CSS for sleek progress bar */}
      <style>
        {`
          input[type="range"].custom-range {
            accent-color: white;
            height: 4px;
            border-radius: 8px;
            outline: none;
            appearance: none;
          }
          input[type="range"].custom-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 0;
            height: 0;
            background: transparent;
            box-shadow: none;
            border: none;
          }
          input[type="range"].custom-range::-moz-range-thumb {
            width: 0;
            height: 0;
            background: transparent;
            border: none;
          }
          input[type="range"].custom-range::-ms-thumb {
            width: 0;
            height: 0;
            background: transparent;
            border: none;
          }
        `}
      </style>
    </div>
  );
};

export default PlayProg;