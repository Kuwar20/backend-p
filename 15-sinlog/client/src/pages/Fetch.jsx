// import React, { useState } from "react";

// const Fetch = () => {
//     const [search, setSearch] = useState('')
//     const [data, setData] = useState([])

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         console.log(search)
//         const response = await fetch(`https://666fc0fe0900b5f872481dcc.mockapi.io/login`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         const data = await response.json()
//         if (response.ok) {
//             console.log(data);
//             setData(data)
//         }
//     }

//     return (
//         <div>
//             <h1>Fetch user data</h1>
//             <div>
//                 <h1>Search all</h1>
//             </div>
//             <form onSubmit={handleSearch}>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
//                     />
//                     <button
//                         className="bg-green-500 p-2 rounded-md mt-2"
//                     >Search
//                     </button>
//                 </div>
//             </form>
//             {
//                 data.length > 0 && (
//                     <div>
//                         <h2>Result all</h2>
//                         <ul>
//                             {
//                                 data.map((item, index) => (
//                                     <li key={index} className="bg-gray-200 p-2 rounded-md mb-2">
//                                         <p>Email:{item.email}</p>
//                                         <p>password:{item.password}</p>
//                                     </li>
//                                 ))}
//                         </ul>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default Fetch;


// import React, { useState } from "react";

// const Fetch = () => {
//     const [search, setSearch] = useState('')
//     const [data, setData] = useState(null)

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         console.log(search)
//         const response = await fetch(`https://666fc0fe0900b5f872481dcc.mockapi.io/login/1`, {
//             method: 'GET',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         })
//         const data = await response.json()
//         if (response.ok) {
//             console.log(data);
//             setData(data)
//         }
//     }

//     return (
//         <div>
//             <h1>Fetch user data</h1>
//             <div>
//                 <h1>Search all</h1>
//             </div>
//             <form onSubmit={handleSearch}>
//                 <div>
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                         className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
//                     />
//                     <button
//                         className="bg-green-500 p-2 rounded-md mt-2"
//                     >Search
//                     </button>
//                 </div>
//             </form>
//             {
//                 data && (
//                     <div>
//                         <ul>
//                             <p>Email:{data.email}</p>
//                             <p>password:{data.password}</p>
//                         </ul>
//                     </div>
//                 )
//             }
//         </div>
//     )
// }

// export default Fetch;

import React, { useState } from "react";

const Fetch = () => {
    const [search, setSearch] = useState('')
    const [data, setData] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault();
        console.log(search)
        const response = await fetch(`https://666fc0fe0900b5f872481dcc.mockapi.io/login?search=${search}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        })
        const data = await response.json()
        if (response.ok) {
            console.log(data);
            setData(data)
        }
    }

    return (
        <div>
            <h1>Fetch user data</h1>
            <div>
                <h1>Search all</h1>
            </div>
            <form onSubmit={handleSearch}>
                <div>
                    <input
                        type="text"
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
                    />
                    <button
                        className="bg-green-500 p-2 rounded-md mt-2"
                    >Search
                    </button>
                </div>
            </form>
            {
                data.length > 0 && (
                    <div>
                        <h2>Result all</h2>
                        <ul>
                            {
                                data.map((item, index) => (
                                    <li key={index} className="bg-gray-200 p-2 rounded-md mb-2">
                                        <p>Email:{item.email}</p>
                                        <p>password:{item.password}</p>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Fetch;