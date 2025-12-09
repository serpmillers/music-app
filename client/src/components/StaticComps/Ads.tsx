const Ads = () => {
  const song = {
    name: "Song Title",
    artist: "Artist Name",
  };

  return (
    <div className="flex flex-row w-[100%] gap-4">
      {/* Left - Now Playing Info */}
      <div className="flex-1 my-4 mx-2 component flex items-center justify-start">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold text-white">{song.name}</h2>
          <span className="text-2xl text-gray-400">•</span>
          <p className="text-2xl font-semibold text-gray-300">{song.artist}</p>
        </div>
      </div>

      {/* Right - Quick Stats */}
      <div className="flex-1 my-4 mx-2 component flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Plays</div>
          <div className="text-2xl font-bold text-white">1,234</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Duration</div>
          <div className="text-2xl font-bold text-white">3:45</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Queue</div>
          <div className="text-2xl font-bold text-white">12</div>
        </div>
      </div>
    </div>
  );
}

export default Ads