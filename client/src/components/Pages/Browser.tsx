const Browser = () => {
    return (
        <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Browser</h1>
            <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700">Refresh</button>
            <button className="px-4 py-2 bg-green-600 rounded hover:bg-green-700">New Tab</button>
            </div>
        </div>
        <div className="flex-grow p-4 bg-gray-100">
            {/* Content goes here */}
        </div>
        </div>
    );
}

export default Browser