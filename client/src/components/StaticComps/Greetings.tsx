import settings from "../../assets/spotifyButtons/gear.png";
import right from "../../assets/spotifyButtons/right_arrow.png";
import left from "../../assets/spotifyButtons/left_arrow.png";

type Props ={
  index: number
  onPrev: () => void
  onNext: () => void
}
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 5 && hour < 12) return "Good morning"
  if (hour > 12 && hour < 18) return "Good afternoon"
  if (hour > 18) return "Good evening"
  return "Sleep is for the weak"
}

const Greeting = ({index,onPrev,onNext}: Props) => {
  return (
    <div className="justify-between m-2 items-center flex ">
      <div className="backdrop-blur-3xl gap-2 rounded-4xl p-1">
        <button className="p-2 cursor-pointer" onClick={onPrev}>
          <img src={left} alt="left" className="w-5 h-5 inline" />
        </button>
        <span>{index}</span>
        <button className="p-2 cursor-pointer" onClick={onNext}>
          <img src={right} alt="right" className="w-5 h-5 inline" />
        </button>
      </div>

      <h1 className="text-4xl font-bold">{getGreeting()}</h1>

      <div className="flex-row flex justify-center items-center gap-2 backdrop-blur-3xl p-1 rounded-4xl">
        <div className="bg-gray-900/60 backdrop-blur-3xl rounded-4xl p-2">
          <img src={settings} alt="Settings" className="w-5 h-5 justify-center items-center " />
        </div>
        <div className="bg-gray-900/60 backdrop-blur-3xl py-2 px-4 rounded-4xl">
          login
        </div>
      </div>
    </div>
  );
};

export default Greeting;