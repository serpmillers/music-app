import Active from "../StaticComps/Active";

const Navigation = () => {
  return (
    <div className="flex-1 bg-gray-900/60 backdrop-blur-3xl rounded-2xl p-2 mx-2 my-2">
      {/* <h1 className="text-3xl font-bold text-white mb-4">Navigation</h1> */}
        <nav className="flex flex-row justify-items-normal gap-2 px-3 space-y-4">
            <a href="#home" className="text-lg text-gray-300 hover:text-white">Library</a>
            <a href="#about" className="text-lg text-gray-300 hover:text-white">All Music</a>
        </nav>

      <Active />
    </div>
  );
}

export default Navigation