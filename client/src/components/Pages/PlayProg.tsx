import play from "../../assets/spotifyButtons/play.png";
import pause from "../../assets/spotifyButtons/pause.png";
import prev from "../../assets/spotifyButtons/prev.png";
import next from "../../assets/spotifyButtons/next.png";
import { useState } from "react";

const PlayProg = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30); // seconds
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
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
    <div className="flex-1 flex overflow-hidden rounded-2xl m-1 relative group border-gray-700 border-2">
      
      {/* Album Art Background - full coverage */}
      <img
        src={song.art}
        alt="Song Art"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
      />
      
      {/* Dark overlay vignette from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />
      
      {/* Full blur overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 pointer-events-none" />
      
      {/* Player controls centered in the middle */}
      <div className="absolute inset-0 flex items-center justify-center group">
        {/* Controls overlay, visible on hover */}
        <div className="flex items-center rounded-2xl justify-center backdrop-blur-[5px] bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 gap-4">
          <button
            className={`transition-all duration-200 hover:scale-125 active:scale-90 ${isShuffle ? 'text-blue-400' : 'text-white'}`}
            onClick={() => setIsShuffle(!isShuffle)}
            aria-label="Shuffle"
            title="Shuffle"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.59 9.38L6.5 5.5H8v-2H2v6h2v-1.5h2.59L9.38 13l-6.79 6.79L4.21 21 11 14.21l6.79 6.79 1.41-1.41L12.59 13l6.79-6.79-1.41-1.41L11 11.59z" />
            </svg>
          </button>

          <button
            className="mx-2 text-white text-2xl transition-all duration-200 hover:scale-125 active:scale-90"
            onClick={() => {/* prev logic */}}
            aria-label="Previous"
          >
            <img src={prev} alt="prev" className="w-5 h-5 justify-center items-center " />
          </button>
          <button
            className="mx-2 text-white text-4xl transition-all duration-200 hover:scale-125 active:scale-90"
            onClick={() => setIsPlaying(p => !p)}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <img src={pause} alt="Pause" className="w-7 h-7 justify-center items-center " /> : <img src={play} alt="Play" className="w-7 h-7 justify-center items-center " />}
          </button>
          <button
            className="mx-2 text-white text-2xl transition-all duration-200 hover:scale-125 active:scale-90"
            onClick={() => {/* next logic */}}
            aria-label="Next"
          >
            <img src={next} alt="Next" className="w-5 h-5 justify-center items-center " />
          </button>

          <button
            className={`transition-all duration-200 hover:scale-125 active:scale-90 ${isRandom ? 'text-green-400' : 'text-white'}`}
            onClick={() => setIsRandom(!isRandom)}
            aria-label="Random"
            title="Random"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Bottom vignette section - Progress bar only */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-4 z-10">
        {/* Progress bar */}
        <div className="w-full flex flex-col items-center">
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
                  #888 ${percent + transitionWidth / 2}%,
                  #444 100%
                )
              `
            }}
          />
          <div className="flex justify-between w-full text-xs text-gray-300 mt-1">
            <span>{Math.floor(progress / 60)}:{String(progress % 60).padStart(2, "0")}</span>
            <span>{Math.floor(song.duration / 60)}:{String(song.duration % 60).padStart(2, "0")}</span>
          </div>
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