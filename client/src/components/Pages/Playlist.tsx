import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "../../context/PlayerContext";
import { makeTrackId } from "../../context/trackID.tsx"; 
import play from "../../assets/spotifyButtons/play.png";
import pause from "../../assets/spotifyButtons/pause.png";
import SongCard from "../StaticComps/SongCard";

type PlaylistProps = {
  playlistData?: {
    id?: string;
    title?: string;
    description?: string;
    type?: string;
    creator?: string;
    songCount?: number;
    duration?: string;
    coverArt?: string;
    tracks?: any[];
  };
};

const Playlist = ({ playlistData }: PlaylistProps) => {
  const [layoutMode, setLayoutMode] = useState<"grid" | "list">("grid");
  const {
    currentTrack,
    isPlaying,
    setQueue, // to let the player load 
    playTrack,
    isCurrent,
    isShuffle,
    isLooped,
    toggleShuffle,
    toggleLoop
  } = usePlayer();

  // in case we need fallback data
  const playlist = playlistData || {
    id: "default-id",
    title: "Whatever you'd like to name it",
    type: "Public Playlist",
    creator: "ScaredBeing",
    songCount: 39,
    duration: "2 hr 4 min",
    coverArt:
      "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg",
    description:
      "A chilled selection of late-night electronic and indie tracks. Perfect for coding sessions, rainy walks, and existential 2 AM thoughts."
  };

  // again, fallback
  const songs = [
    { title: "Sliding Doors", artist: "DALE", album: "Sliding Doors", dateAdded: "Jul 27, 2025", duration: "2:53", cover: playlist.coverArt },
    { title: "Which Side Are You On", artist: "Morning Silk", album: "Dark City Silence", dateAdded: "Jul 27, 2025", duration: "3:24", cover: playlist.coverArt },
    { title: "Sometimes", artist: "Blue Imagined", album: "Sometimes / I Found Love", dateAdded: "Jul 27, 2025", duration: "2:58", cover: playlist.coverArt },
    { title: "Night Walks", artist: "Golden Cats", album: "Night Walks", dateAdded: "Jul 27, 2025", duration: "3:06", cover: playlist.coverArt },
    { title: "i don't wanna be alone", artist: "Camp Blu", album: "rooms i forgot", dateAdded: "Jul 27, 2025", duration: "2:28", cover: playlist.coverArt },
    { title: "Supersoaker", artist: "Kings of Leon", album: "Mechanical Bull (Expanded Edition)", dateAdded: "Jul 27, 2025", duration: "3:50", cover: playlist.coverArt },
  ];

  // to build the track list out of playlist data
  const tracks = useMemo(() => {
    const source = playlist.tracks && playlist.tracks.length ? playlist.tracks : songs;
    return source.map((song: any, idx: number) => ({
      id: String(
        song.id ??
        song.trackId ??
        makeTrackId((song.title ?? song.name ?? playlist.title ?? playlist.id ?? "playlist"), idx)
      ),
      title: song.title ?? song.name ?? `Track ${idx + 1}`,
      artist: song.artist ?? song.creator ?? "",
      album: song.album ?? "",
      dateAdded: song.dateAdded ?? "",
      duration: (() => {
        if (typeof song.duration === "string" && song.duration.includes(":")) {
          const [m, sec] = song.duration.split(":").map(Number);
          return m * 60 + sec;
        }
        return typeof song.duration === "number" ? song.duration : 180;
      })(),
      artUrl: song.cover || song.coverArt || song.art || playlist.coverArt || ""
    }));
  }, [playlist, songs]);

  const handleTrackClick = (index: number) => {
    setQueue(tracks, index, true);
  };

  // play/pause top button behavior
  const handleTopPlay = () => {
    if (!currentTrack) {
      setQueue(tracks, 0, true);
      return;
    }
    const idx = tracks.findIndex(song => song.id === currentTrack?.id);
    if (idx === -1) setQueue(tracks, 0, true);
    else playTrack(currentTrack, idx, { autoPlay: !isPlaying });
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="relative flex items-end gap-6 p-8 justify-around border-2 rounded-2xl border-gray-700 m-2 overflow-hidden">
        {/* Background image to fill header */}
        <div className="absolute inset-0 z-0">
          <img
            src={playlist.coverArt}
            alt={playlist.title}
            className="w-full h-full object-cover"
            style={{ filter: "blur(4px) brightness(0.4)" }}
          />
        </div>

        {/* Playlist info... and controls. */}
        <div className="relative z-10 flex flex-col gap-2 items-start flex-1">
          <div className="flex gap-2 text-sm text-gray-200">
            <span className="font-semibold text-white">{playlist.creator}</span>
            <span>|</span>
            <span>{playlist.songCount} songs</span>
            <span>|</span>
            <span>{playlist.duration}</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-2 drop-shadow-lg">
            {playlist.title}
          </h1>
          {playlist.description && (
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              {playlist.description}
            </p>
          )}
        </div>

        <div className="relative z-10 flex items-center gap-6 px-4">
          <button
            onClick={handleTopPlay}
            className="text-gray-300 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200"
            aria-label="Play / Pause"
          >
            {isPlaying ? (
              <img src={pause} alt="Pause" className="w-7 h-7 justify-center items-center " />
            ) : (
              <img src={play} alt="Play" className="w-7 h-7 justify-center items-center " />
            )}
          </button>

          <button
            className={`transition-all duration-200 hover:scale-125 active:scale-90 ${isShuffle ? "text-blue-400" : "text-white"}`}
            onClick={() => toggleShuffle()}
            aria-label="Shuffle"
            title="Shuffle"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10.59 9.38L6.5 5.5H8v-2H2v6h2v-1.5h2.59L9.38 13l-6.79 6.79L4.21 21 11 14.21l6.79 6.79 1.41-1.41L12.59 13l6.79-6.79-1.41-1.41L11 11.59z" />
            </svg>
          </button>

          <button
            className={`transition-all duration-200 hover:scale-125 active:scale-90 ${isLooped ? "text-green-400" : "text-white"}`}
            onClick={() => toggleLoop()}
            aria-label="Loop"
            title="Loop"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setLayoutMode(prev => (prev === "grid" ? "list" : "grid"))}
            className="transition-all duration-200 hover:scale-110 active:scale-95 text-gray-300 hover:text-white p-2 rounded"
            aria-label="Toggle layout"
            title={layoutMode === "grid" ? "Switch to list" : "Switch to grid"}
          >
            {layoutMode === "grid" ? (
              // list icon
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 10h8v-8h-8v8z" />
              </svg>
            ) : (
              // grid icon
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 13h18v-2H3v2zm0 5h18v-2H3v2zM3 6v2h18V6H3z" />
              </svg>
            )}
          </button>
          
          {/* have to add a drop down here. */}
          <button
            className="transition-all duration-200 hover:scale-125 active:scale-90 text-white"
            aria-label="More Options"
            title="More Options"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <circle cx="3" cy="12" r="3" />
              <circle cx="12" cy="12" r="3" />
              <circle cx="21" cy="12" r="3" />
            </svg>
          </button>
        </div>
        <img
          src={playlist.coverArt}
          alt={playlist.title}
          className="w-[100px] h-[100px] object-cover opacity-99 rounded-lg"
          // for some unknown reason, at opacity 100%, the image is transparent... but this works so I'll leave it be
        />
      </div>
      
      <div>
        <div className="gap-4 px-4 py-2 border-b mb-4 border-gray-700/50 sticky top-0" /> {/* Just for aesthetics /*}
        {/* only show the list header when in list mode thanks to this */}
        {layoutMode === "list" && (
          <div className="
            grid grid-cols-[40px_1fr_1fr_1fr_80px]
            gap-4 px-4 pb-2
            text-xs font-semibold text-gray-400
            uppercase tracking-wider
            border-b border-gray-700/50
          ">
            <div className="text-center">#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date Added</div>
            <div className="text-right">Duration</div>
          </div>
        )}
      </div>
      {/* scrollable area */}
      <div className="flex-1 overflow-y-auto px-2 pb-4 relative min-h-0">

        <div className="gap-4 px-4 py-2" />

        {/* songs area */}
        <AnimatePresence mode="wait">
          {layoutMode === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="
                grid gap-6
                grid-cols-[repeat(auto-fill,minmax(220px,1fr))]
                justify-items-stretch
                pb-2 mt-3
              "
            >
              {tracks.map((song, idx) => (
                <div key={song.id} className="flex-shrink-0 flex-1">
                  <SongCard
                    key={song.id}
                    layout="grid"
                    index={idx}
                    artUrl={song.artUrl}
                    title={song.title}
                    artist={song.artist}
                    duration={Math.floor((song.duration || 180) / 60) + ":" + String((song.duration || 180) % 60).padStart(2, "0")}
                    isPlaying={isCurrent(song.id) && isPlaying}
                    onClick={() => handleTrackClick(idx)}
                  />
                </div>
              ))}
            </motion.div>
          )}

          {layoutMode === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.96, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-1 mt-3"
            >
              {tracks.map((song, idx) => (
                <SongCard
                  key={song.id}
                  layout="list"
                  index={idx}
                  artUrl={song.artUrl}
                  title={song.title}
                  artist={song.artist}
                  album={song.album}
                  dateAdded={song.dateAdded}
                  duration={Math.floor((song.duration || 180) / 60) + ":" + String((song.duration || 180) % 60).padStart(2, "0")}
                  isPlaying={isCurrent(song.id) && isPlaying}
                  onClick={() => handleTrackClick(idx)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Playlist;
