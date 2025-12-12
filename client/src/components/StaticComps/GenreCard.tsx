// will implement into the playlist page later

type GenreCardProps = {
  name: string;
}

const GenreCard = ({ name }: GenreCardProps) => {
  return (
    <div className="border-gray-700 border-2 bg-gray-800/20 hover:bg-gray-800/50 text-white p-20 rounded-xl text-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95">
      <span className="font-semibold">{name}</span>
    </div>
  )
}

export default GenreCard