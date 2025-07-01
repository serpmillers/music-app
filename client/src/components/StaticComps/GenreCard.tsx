type GenreCardProps = {
  name: string;
}

const GenreCard = ({ name }: GenreCardProps) => {
  return (
    <div className="bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-xl text-center cursor-pointer transition-all">
      <span className="font-semibold">{name}</span>
    </div>
  )
}

export default GenreCard