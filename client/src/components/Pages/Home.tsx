import { makeTrackId } from "../../context/trackID";
import { useTasks } from "../../context/TasksContext";
import AlbumCard from "../StaticComps/AlbumCard";
import HorizontalScroller from "../StaticComps/HorizontalScroller";

type HomeProps = {
  // callback when an album/playlist is clicked
  onPlaylistClick?: (data: any) => void;
  // navigation function (has extra data in case I get a mood swing and change how it functions)
  navigateTo?: (page: "home" | "browse" | "task" | "settings" | "playlist", data?: any) => void;
};

const Home = ({onPlaylistClick, navigateTo}: HomeProps) => {
  // will change after db is set up
  const placeholderCover =
    "https://images.stockcake.com/public/f/3/4/f34aafcd-59a7-44b0-932f-668d82341c43_large/sci-fi-squad-ready-stockcake.jpg";

  const {tasks, setSelectedTaskId, toggleTaskCompletion} = useTasks();
  const pendingTop5 = tasks.filter((t) => !t.completed).slice(0,5);

  // again, will change after db is set up
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

  // takes all the content and fits it in the AlbumCard format
  const normalizeToAlbum = (item: any) => {
    const cover = item.coverUrl || item.artUrl || item.album?.coverUrl || placeholderCover;
    const title = item.title || item.album?.title || "Untitled";
    const artist = item.artist || item.madeby || item.album?.artist || "";
    return { title, artist, coverUrl: cover };
  };

  const handleAlbumClick = (item: any) => {
    const normalized = normalizeToAlbum(item);
    const songCount = Math.floor(Math.random() * 15) + 8;
    const tracks = Array.from({length: songCount}).map((_,i) => ({
      id: makeTrackId(normalized.title, i),
      title: `${normalized.title} - Track ${i+1}`,
      artist: normalized.artist,
      duration: Math.floor(Math.random()*200)+140, // seconds
      artUrl: normalized.coverUrl
    }));
    const playlistData = {
      title: normalized.title,
      type: item.type === "album" ? "Album" : "Playlist",
      creator: normalized.artist,
      songCount: songCount,
      duration: `${Math.floor(Math.random() * 2) + 1} hr ${Math.floor(Math.random() * 60)} min`,
      coverArt: normalized.coverUrl,
      tracks,
    };
    onPlaylistClick?.(playlistData);
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    navigateTo?.("task");
  };

  return (
    <div className="w-full h-full flex flex-col overflow-y-auto p-4 gap-8">
      
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pending Tasks</h2>  
          <button
            onClick={() => navigateTo?.("task")}
            className="text-sm text-gray-400 hover:text-white transition"
          >
            Show all
          </button>
        </div>
        <div className="space-y-2 overflow-y-auto max-h-60 pr-2 text-center py-12">
          {/* I changed it to show all the pending tasks instead of only top 5 */}
          {pendingTop5.length === 0 ? (
            <div className="text-gray-400">No pending tasks</div>
          ) : (
            pendingTop5.map((task) => (
              <div key={task.id} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition group">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="w-6 h-6 rounded-lg border-2 border-blue-500 flex items-center justify-center flex-shrink-0 hover:bg-blue-500/20 transition-all duration-200 active:scale-90"
                  title="Toggle completion"
                >
                  {task.completed && <span className="text-blue-400">✓</span>}
                </button>

                <button
                  onClick={() => handleTaskClick(task.id)}
                  className="flex-1 min-w-0 overflow-hidden text-left cursor-pointer"
                >
                  <div className="flex items-baseline gap-2">
                    <p className={`font-medium whitespace-nowrap ${task.completed ? "text-gray-400 line-through" : "text-gray-200"}`}>
                      {task.name ?? (task as any).title}
                    </p>
                    {task.description && (
                      <p className={`text-sm truncate flex-1 ${task.completed ? "text-gray-600 line-through" : "text-gray-500"}`}>
                        {task.description}
                      </p>
                    )}
                  </div>
                </button>

                <div className={`px-2 py-1 rounded text-xs font-semibold flex-shrink-0 ${task.priority === "high" ? "bg-red-500/20 text-red-300" : task.priority === "medium" ? "bg-yellow-500/20 text-yellow-300" : "bg-green-500/20 text-green-300"}`}>
                  {task.priority}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Recommended For You</h2>
        </div>

        <HorizontalScroller className="p-4">
          {recommendedMixed.map((item, idx) => {
            const albumLike = normalizeToAlbum(item);
            return (
              <div key={idx} className="flex-shrink-0 w-48">
                <AlbumCard 
                  album={albumLike}
                  onClick={() => handleAlbumClick(item)}
                />
              </div>
            );
          })}
        </HorizontalScroller>
      </div>
    </div>
  );
};

export default Home;
