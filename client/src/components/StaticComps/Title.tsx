const Ads = () => {
  const song = {
    name: "Song Title",
    artist: "Artist Name",
  };

  return (
    <div className="flex flex-col w-[100%]">
      <div className="my-2 mx-2 component flex items-center px-3">
        <div className="flex items-center gap-2 h-24 px-6">
          <h2 className="text-3xl font-bold text-white">{song.name}</h2>
          <span className="text-2xl text-gray-400">•</span>
          <p className="text-2xl font-semibold text-gray-300">{song.artist}</p>
        </div>
      </div>
    </div>
  );
}

export default Ads