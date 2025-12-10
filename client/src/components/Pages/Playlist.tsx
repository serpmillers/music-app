import React, { useState } from "react";

type PlaylistProps = {
  playlistData?: {
    title: string;
    type: string;
    creator: string;
    songCount: number;
    duration: string;
    coverArt: string;
  };
};

const Playlist = ({ playlistData }: PlaylistProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<number | null>(null);

  const playlist = playlistData || {
    title: "Whatever you'd like to name it",
    type: "Public Playlist",
    creator: "ScaredBeing",
    songCount: 39,
    duration: "2 hr 4 min",
    coverArt: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg"
  };

  const songs = [
    { id: 1, title: "Sliding Doors", artist: "DALE", album: "Sliding Doors", dateAdded: "Jul 27, 2025", duration: "2:53", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { id: 2, title: "Which Side Are You On", artist: "Morning Silk", album: "Dark City Silence", dateAdded: "Jul 27, 2025", duration: "3:24", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { id: 3, title: "Sometimes", artist: "Blue Imagined", album: "Sometimes / I Found Love", dateAdded: "Jul 27, 2025", duration: "2:58", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { id: 4, title: "Night Walks", artist: "Golden Cats", album: "Night Walks", dateAdded: "Jul 27, 2025", duration: "3:06", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { id: 5, title: "i don't wanna be alone", artist: "Camp Blu", album: "rooms i forgot", dateAdded: "Jul 27, 2025", duration: "2:28", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { id: 6, title: "Supersoaker", artist: "Kings of Leon", album: "Mechanical Bull (Expanded Edition)", dateAdded: "Jul 27, 2025", duration: "3:50", cover: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
  ];

  const togglePlay = (songId: number) => {
    if (currentSong === songId) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(songId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 bg-gradient-to-b from-gray-800/50 to-gray-900/90">
      <div className="flex items-end gap-6 p-8 bg-gradient-to-b from-gray-700/40 to-transparent">

        <div className="w-56 h-56 rounded-lg overflow-hidden shadow-2xl flex-shrink-0">
          <img 
            src={playlist.coverArt} 
            alt={playlist.title}
            className="w-full h-full object-cover"
          />
        </div>


        <div className="flex flex-col justify-end gap-2 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
            {playlist.type}
          </span>
          <h1 className="text-6xl font-bold text-white mb-2">
            {playlist.title}
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="font-semibold text-white">{playlist.creator}</span>
            <span>•</span>
            <span>{playlist.songCount} songs</span>
            <span>•</span>
            <span>{playlist.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 px-8 py-6 bg-gradient-to-b from-black/20 to-transparent">

        <button 
          onClick={() => togglePlay(songs[0].id)}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 flex items-center justify-center transition-all duration-200 shadow-lg"
        >
          {isPlaying && currentSong === songs[0].id ? (
            <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
          ) : (
            <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          )}
        </button>


        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10.59 9.38L6.5 5.5H8v-2H2v6h2v-1.5h2.59L9.38 13l-6.79 6.79L4.21 21 11 14.21l6.79 6.79 1.41-1.41L12.59 13l6.79-6.79-1.41-1.41L11 11.59z" />
          </svg>
        </button>


        <button className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">

        <div className="grid grid-cols-[40px_1fr_1fr_1fr_80px] gap-4 px-4 py-2 border-b border-gray-700/50 text-xs font-semibold text-gray-400 uppercase tracking-wider sticky top-0 bg-gray-900/80 backdrop-blur-sm">
          <div className="text-center">#</div>
          <div>Title</div>
          <div>Album</div>
          <div>Date added</div>
          <div className="text-right">
            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>

        {songs.map((song, index) => (
          <div
            key={song.id}
            className="grid grid-cols-[40px_1fr_1fr_1fr_80px] gap-4 px-4 py-3 rounded-md hover:bg-white/10 group transition-colors cursor-pointer"
            onClick={() => togglePlay(song.id)}
          >
    
            <div className="flex items-center justify-center text-gray-400 group-hover:text-white">
              {currentSong === song.id && isPlaying ? (
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                </svg>
              ) : (
                <span className="group-hover:hidden">{index + 1}</span>
              )}
              <svg className="w-4 h-4 hidden group-hover:block" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
    
            <div className="flex items-center gap-3 min-w-0">
              <img 
                src={song.cover} 
                alt={song.title}
                className="w-10 h-10 rounded object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <div className={`font-medium truncate ${currentSong === song.id ? 'text-green-500' : 'text-white'}`}>
                  {song.title}
                </div>
                <div className="text-sm text-gray-400 truncate">{song.artist}</div>
              </div>
            </div>
    
            <div className="flex items-center text-gray-400 text-sm truncate">
              {song.album}
            </div>

            <div className="flex items-center text-gray-400 text-sm">
              {song.dateAdded}
            </div>

            <div className="flex items-center justify-end text-gray-400 text-sm">
              {song.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;