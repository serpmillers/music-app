import React from 'react';
import stack from '../../assets/spotifyButtons/stack.png';
import like from '../../assets/spotifyButtons/like.png';
import PlaylistCard from '../StaticComps/PlaylistCard';
import { makeTrackId } from "../../context/trackID";
import { usePlayer } from "../../context/PlayerContext";

type PlaylistItem = {
  artUrl?: string;
  name: string;
  madeby?: string;
  // for when we fetch from backend db.
  [k: string]: any;
};

type LibraryProps = {
  onPlaylistClick?: (data: any) => void;
  playlists?: PlaylistItem[]; // fetched playlists
};

const Library = ({ onPlaylistClick, playlists: externalPlaylists }: LibraryProps) => {
  const { setQueue } = usePlayer();

  const placeholderCover =
    "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg";

  // for debugging
  const defaultPlaylists: PlaylistItem[] = [
    { artUrl: placeholderCover, name: "Some Songs", madeby: "ScaredBeing" },
    { artUrl: placeholderCover, name: "Late Night Vibes", madeby: "Various" },
    { artUrl: placeholderCover, name: "Focus Mode", madeby: "You" },
    { artUrl: placeholderCover, name: "Chillhop", madeby: "Curator" },
    { artUrl: placeholderCover, name: "Roadtrip", madeby: "ScaredBeing" },
  ];

  // liked songs go here (will remain at top)
  const likedSongItem: PlaylistItem = {
    artUrl: like,
    name: "Liked Songs",
    madeby: "You",
  };

  // debugging.
  const sourcePlaylists = externalPlaylists && externalPlaylists.length > 0 ? externalPlaylists : defaultPlaylists;

  const normalizedSeen = new Set<string>();
  const mergedPlaylists: PlaylistItem[] = [];

  // push Liked Songs first (and mark as seen)
  mergedPlaylists.push(likedSongItem);
  normalizedSeen.add(likedSongItem.name.toLowerCase());

  // then add other playlists while skipping duplicates of Liked Songs
  for(const pl of sourcePlaylists){
    const key = (pl.name || '').toLowerCase();
    if(!normalizedSeen.has(key)){
      mergedPlaylists.push(pl);
      normalizedSeen.add(key);
    }
  }

  // helper to build the same playlistData shape used in Home.tsx (generating random playlist data for now)
  const buildPlaylistData = (item: PlaylistItem) => {
    const title = item.name;
    const artist = item.madeby || "Unknown";
    const coverUrl = item.artUrl || placeholderCover;

    const songCount = Math.floor(Math.random() * 15) + 8;

    const tracks = Array.from({ length: songCount }).map((_, i) => ({
      id: makeTrackId(title, i),
      title: `${title} - Track ${i + 1}`,
      artist,
      duration: Math.floor(Math.random() * 200) + 140,
      artUrl: coverUrl,
    }));

    return {
      title,
      type: "Playlist",
      creator: artist,
      songCount,
      duration: `${Math.floor(Math.random() * 2) + 1} hr ${Math.floor(Math.random() * 60)} min`,
      coverArt: coverUrl,
      tracks,
    };
  };

  // open the playlist page
  const handleOpen = (item: PlaylistItem) => {
    const data = buildPlaylistData(item);
    onPlaylistClick?.(data);
  };

  // play the playlist immediately
  const handlePlay = (item: PlaylistItem) => {
    const data = buildPlaylistData(item);
    setQueue(data.tracks, 0, true);
  };

  return (
    <div className="p-1 w-[100%] flex-col gap-2 h-[60%] flex animate-fade-in">
      <div className="flex flex-col h-[100%] min-h-0 component">
        <div className=" flex-col flex cursor-pointer h-full">
          <div className="flex items-center py-8 cursor-pointer text-white h-[32px] text-[18px] rounded-t-xl border-gray-800/0 border-b-gray-700 border-2">
            <img src={stack} alt="Library" className="w-5 h-5 mx-3" />
            <span>Library</span>
          </div>

          <div className='flex-1 min-h-0 overflow-hidden overflow-y-auto flex flex-col gap-3 p-2 px-3'>
            {mergedPlaylists.map((pl) => {
              // safe key: prefer unique name but append maker if necessary to reduce collisions
              const key = `${pl.name}::${pl.madeby ?? ''}`;

              return (
                <div
                  key={key}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(pl)}
                  onKeyDown={(e) => { if(e.key === "Enter" || e.key === " ") handleOpen(pl); }}
                  className="
                    rounded-md
                    p-1
                    transition-transform duration-150
                    transform
                    hover:scale-105
                    active:scale-95
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500
                    cursor-pointer
                  "
                  aria-label={`Open ${pl.name}`}
                >
                  <PlaylistCard
                    artUrl={pl.artUrl}
                    name={pl.name}
                    madeby={pl.madeby}
                    onClick={() => handleOpen(pl)}
                    onPlay={() => handlePlay(pl)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
