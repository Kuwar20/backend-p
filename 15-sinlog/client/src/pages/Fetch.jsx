import React from "react";

const Fetch = () => {
    return (
        <div>
            <h1>Fetch user data</h1>
            <div>
                <h1>Search all</h1>
            </div>
            <div>
                <input
                    type="search"
                    placeholder="Search"
                    className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                />
                <button className="bg-green-500 p-2 rounded-md mt-2">Search</button>
            </div>
        </div>

    )
}

export default Fetch;