import Library from "../Pages/Library"
import Browser from "../Pages/Browse"
import Playlists from "../Pages/Playlist"

/* Logic goes here */ 

const ActiveComponent = {
  library: Library,
  browser: Browser,
  playlists: Playlists,
}

const Active = () => {
  return (
    <div className="flex flex-col grow items-center justify-center">
      
      


      
      <h1 className="text-2xl font-bold mb-4">Active Component</h1>
      <p className="text-gray-700">This is the active component content.</p>
    </div>
  )
}

export default Active