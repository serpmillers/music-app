import settings from "../../assets/spotifyButtons/gear.png";
import right from "../../assets/spotifyButtons/right_arrow.png";
import left from "../../assets/spotifyButtons/left_arrow.png";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

const Greeting = () => {
  return (
    <div className="justify-around m-3 items-center flex ">
      <div className="">
        <img src={left} alt="left" className="w-5 h-5 inline mr-2" />
        <img src={right} alt="right" className="w-5 h-5 inline mr-2" />
      </div>

      <h1 className="text-4xl font-bold">{getGreeting()}!</h1>

      <div className="bg-gray-900/60 backdrop-blur-3xl py-2 px-4 rounded-4xl">
        <img src={settings} alt="Settings" className="w-5 h-5 inline mr-2" />
        login
      </div>
    </div>
  );
};

export default Greeting;