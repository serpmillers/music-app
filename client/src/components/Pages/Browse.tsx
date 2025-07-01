import GenreCard from "../StaticComps/GenreCard";
import AlbumCard from "../StaticComps/AlbumCard";
import { useState } from "react";

const Browse = () => {
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

  return (
    <div className="flex flex-col p-4 gap-6 h-full min-h-0">
      <div className="flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search music, artists, albums..."
          className="w-full max-w-md px-4 py-2 rounded-full bg-gray-800 opacity-70 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto overflow-hidden gap-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Genres</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {genres.map((genre) => (
              <div key={genre} className="flex-shrink-0 w-40">
                <GenreCard name={genre} />
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-2">Trending Albums</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {albums.map((album) => (
              <div key={album.title} className="flex-shrink-0 w-48">
                <AlbumCard album={album} />
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default Browse;