import { useState } from "react";
import AlbumCard from "../StaticComps/AlbumCard";
import PlaylistCard from "../StaticComps/PlaylistCard";
import HorizontalScroller from "../StaticComps/HorizontalScroller";

const Home = () => {
  const placeholderCover =
    "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg";

  const quickAccess = [
    { title: "Your Daily Mix", description: "Your favorite songs", artUrl: placeholderCover },
    { title: "New Releases", description: "Latest drops", artUrl: placeholderCover },
    { title: "Chill Vibes", description: "Relaxing tunes", artUrl: placeholderCover },
    { title: "Workout Mix", description: "High energy", artUrl: placeholderCover },
    { title: "Late Night", description: "Dark & deep", artUrl: placeholderCover },
    { title: "Focus Mode", description: "Concentration", artUrl: placeholderCover },
  ];

  const lastPlayed = [
    { title: "Midnight Vibes", artist: "DJ Chill", coverUrl: placeholderCover },
    { title: "Neon Nights", artist: "Synthwave Corp", coverUrl: placeholderCover },
    { title: "Unplugged", artist: "Acoustic Soul", coverUrl: placeholderCover },
    { title: "Sunset Drive", artist: "Roadtrip", coverUrl: placeholderCover },
    { title: "Dreamscape", artist: "Night Owl", coverUrl: placeholderCover },
    { title: "Electric Pulse", artist: "Pulsewave", coverUrl: placeholderCover },
  ];

  // Mixed recommended items: playlists + songs + albums
  const recommendedMixed: Array<any> = [
    { type: "playlist", title: "Daily Mix 1", madeby: "You", artUrl: placeholderCover },
    { type: "song", title: "Song A", artist: "Artist 1", coverUrl: placeholderCover },
    { type: "playlist", title: "Chillhop Essentials", madeby: "Various", artUrl: placeholderCover },
    { type: "album", album: { title: "Neon Nights", artist: "Synthwave Corp", coverUrl: placeholderCover } },
    { type: "song", title: "Song B", artist: "Artist 2", coverUrl: placeholderCover },
    { type: "playlist", title: "Workout Mix", madeby: "You", artUrl: placeholderCover },
    { type: "album", album: { title: "Dreamscape", artist: "Night Owl", coverUrl: placeholderCover } },
    { type: "song", title: "Song C", artist: "Artist 3", coverUrl: placeholderCover },
  ];

  // normalize any item to an album-like object { title, artist, coverUrl }
  const normalizeToAlbum = (item: any) => {
    const cover = item.coverUrl || item.artUrl || item.album?.coverUrl || placeholderCover;
    const title = item.title || item.album?.title || "Untitled";
    const artist = item.artist || item.madeby || item.album?.artist || "";
    return { title, artist, coverUrl: cover };
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto p-4 gap-8">
      
      {/* Quick access playlists section, will also be used for last played*/}
      {/* <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Last Played</h2>
          <a href="#" className="text-sm text-gray-400 hover:text-white">Show all</a>
        </div>
        <div className="grid gap-4 grid-cols-3 pb-2">
          
          {quickAccess.map((playlist) => (
            <div key={playlist.title} className="flex-shrink-0 flex-1 ">
              <PlaylistCard artUrl={playlist.artUrl} name={playlist.title} madeby={playlist.description} />
            </div>
          ))}
        </div>
      </div> */}

      {/* Last played section */}
      {/* <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Last Played</h2>
          <a href="#" className="text-sm text-gray-400 hover:text-white">Show all</a>
        </div>
        <HorizontalScroller>
          {lastPlayed.map((album) => (
            <div key={album.title} className="flex-shrink-0 w-48">
              <AlbumCard album={album} />
            </div>
          ))}
        </HorizontalScroller>
      </div> */}

      {/* Tasks that aren't complete */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Tasks</h2>
          {/* <a href="#" className="text-sm text-gray-400 hover:text-white">Show all</a> */}
        </div>
        
      </div>

      {/* Recommended For You - normalize everything and render AlbumCard for consistent tiles */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended For You</h2>
          {/* <a href="#" className="text-sm text-gray-400 hover:text-white">Show all</a> */}
        </div>

        <HorizontalScroller className="p-4">
          {recommendedMixed.map((item, idx) => {
            const albumLike = normalizeToAlbum(item);
            return (
              <div key={idx} className="flex-shrink-0 w-48">
                <AlbumCard album={albumLike} />
              </div>
            );
          })}
        </HorizontalScroller>
      </div>

    </div>
  );
};

export default Home;