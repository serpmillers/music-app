import settings from "../../assets/spotifyButtons/gear.png";
import right from "../../assets/spotifyButtons/right_arrow.png";
import left from "../../assets/spotifyButtons/left_arrow.png";

type Props ={
  index: number
  onPrev: () => void
  onNext: () => void
  onSettings: () => void
}
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour > 5 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 18) return "Good afternoon"
  if (hour >= 17) return "Good evening"
  return "Sleep is for the weak"
}

const Greeting = ({index,onPrev,onNext,onSettings}: Props) => {
  return (
    <div className="justify-between mb-1 items-center flex ">
      <div className="backdrop-blur-3xl gap-2 rounded-4xl p-1 border-gray-700 border-2">
        <button className="p-2 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95" onClick={onPrev}>
          <img src={left} alt="left" className="w-5 h-5 inline" />
        </button>
        <button className="p-2 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95" onClick={onNext}>
          <img src={right} alt="right" className="w-5 h-5 inline" />
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-50">{getGreeting()}</h1>

      <div className="flex-row flex justify-center items-center gap-2 backdrop-blur-3xl p-1 rounded-4xl border-gray-700 border-2">
        <button
          onClick={onSettings}
          className="bg-gray-900/60 backdrop-blur-3xl rounded-4xl p-2 cursor-pointer hover:bg-gray-800/60 transition-all duration-300 hover:scale-110 active:scale-95"
          title="Settings"
        >
          <img src={settings} alt="Settings" className="w-5 h-5 justify-center items-center" />
        </button>
        <div className="bg-gray-900/60 backdrop-blur-3xl py-2 px-4 rounded-4xl ">
          login
        </div>
      </div>
    </div>
  );
};

export default Greeting;