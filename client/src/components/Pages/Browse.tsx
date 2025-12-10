import { useState } from "react";
import GenreCard from "../StaticComps/GenreCard";
import AlbumCard from "../StaticComps/AlbumCard";
import HorizontalScroller from "../StaticComps/HorizontalScroller";

type BrowseProps = {
  onPlaylistClick?: (data: any) => void;
};

const Browse = ({onPlaylistClick}: BrowseProps) => {
  const [search, setSearch] = useState("");
  const genres = ["Pop", "Lo-Fi", "Rock", "Classical", "EDM", "Jazz", "Hip-Hop", "Indie", "Country", "Reggae"];
  const albums = [
    { title: "Midnight Vibes", artist: "DJ Chill", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Neon Nights", artist: "Synthwave Corp", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Unplugged", artist: "Acoustic Soul", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Sunset Drive", artist: "Roadtrip", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Dreamscape", artist: "Night Owl", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Electric Pulse", artist: "Pulsewave", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Golden Hour", artist: "Aurora", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Chillhop Essentials", artist: "Various Artists", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Retro Future", artist: "Vaporwave", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
    { title: "Acoustic Mornings", artist: "Sunny Side", coverUrl: "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg" },
  ];

  const handleAlbumClick = (album: any) => {
    const playlistData = {
      title: album.title,
      type: "Album",
      creator: album.artist,
      songCount: Math.floor(Math.random() * 15) + 8,
      duration: `${Math.floor(Math.random() * 2) + 1} hr ${Math.floor(Math.random() * 60)} min`,
      coverArt: album.coverUrl
    };
    onPlaylistClick?.(playlistData);
  };

  return (
    <div className="flex flex-col pb-3 pt-0 h-full min-h-0">
      <div className="flex justify-center p-2 pb-[11px] rounded-t-xl border-gray-800/0 border-b-gray-700 border-2">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search music, artists, albums..."
          className="w-full max-w-md px-4 py-2 rounded-full bg-gray-800 opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white ring-gray-700 ring-2 transition-all duration-300 hover:opacity-80 focus:opacity-100"
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-hidden gap-6 p-5 px-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Trending Albums</h3>
          <HorizontalScroller className="p-4">
            {albums.map((album) => (
              <div key={album.title} className="flex-shrink-0 w-48">
                <AlbumCard
                  album={album}
                  onClick={() => handleAlbumClick(album)}
                />
              </div>
            ))}
          </HorizontalScroller>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <div className="grid grid-cols-3 gap-4 overflow-x-auto pb-2 p-4">
            {genres.map((genre) => (
              <div key={genre} className="flex-shrink-0 flex-1">
                <GenreCard name={genre} />
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Browse;