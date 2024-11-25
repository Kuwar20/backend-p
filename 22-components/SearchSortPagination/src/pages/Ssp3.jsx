// import React, { useEffect, useState } from 'react'
// import users from '../assets/users.json'

// const SkeletonLoader = () => (
//     <div className='border rounded shadow-md p-4 flex flex-col items-center animate-pulse'>
//         <div className='w-full h-48 object-contain rounded mb-2 bg-gray-300'></div>
//         <div className='w-3/4 h-6 bg-gray-300 mb-2 rounded'></div>
//         <div className='w-full h-6 bg-gray-300 mb-2 rounded'></div>
//         <div className='w-1/4 h-6 bg-gray-300 rounded'></div>
//     </div>
// )

// const ErrorMessage = ({ message }) => (
//     <div className="w-full p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
//         <div className="flex items-center">
//             <span className="font-bold">Error:</span>
//             <p className="ml-2">{message}</p>
//         </div>
//     </div>
// );

// const Ssp3 = () => {
//     const [products, setProducts] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [showScrollToTop, setShowScrollToTop] = useState(false)
//     const [search, setSearch] = useState('')
//     const [searched, setSearched] = useState([])
//     const [searchedHistory, setSearchedHistory] = useState([])
//     const [sortOrder, setSortOrder] = useState('asc')
//     const [currentPage, setCurrentPage] = useState(1)
//     const itemsPerPage = 8;
//     const [currentTime, setCurrentTime] = useState(new Date())

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://fakestoreapi.com/products')
//                 if (!response.ok) throw new Error('Something went wrong')
//                 const responseData = await response.json()
//                 setProducts(responseData)
//                 setSearched(responseData) // Set searched products initially
//                 // If the user hasn't performed a search yet, searched will be an empty array,
//                 // and the product list won't display. You should show products when searched is empty.
//                 setError(null)
//                 console.log("Response Data: ", responseData)
//                 console.log("Products: ", products)
//             } catch (error) {
//                 setError(error.message || "Failed to fetch products")
//                 setProducts([])
//             } finally {
//                 setLoading(false)
//             }
//         }
//         fetchData()
//     }, [])

//     useEffect(() => {
//         const handleScroll = () => {
//             setShowScrollToTop(window.scrollY > 100)
//         }
//         window.addEventListener('scroll', handleScroll)
//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])

//     const scrollToTop = () => {
//         window.scrollTo({
//             top: 0,
//             behavior: 'smooth'
//         })
//     }

//     const handleImageError = (e) => {
//         e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
//     }

//     const handleSearch = () => {
//         const searchedProduct = products.filter((product) =>
//             product?.title.toLowerCase().includes(search.toLowerCase()) ||
//             product?.description.toLowerCase().includes(search.toLowerCase()) ||
//             product?.price.toString().includes(search.toLowerCase())
//         )
//         setSearchedHistory((prevHistory) => {
//             if (search.trim() === '') return prevHistory
//             return [...prevHistory, search]
//         })
//         return setSearched(searchedProduct)
//     }

//     const sortedProduct = searched.sort((a, b) => {
//         if (!a.title || !b.title) return;
//         return sortOrder === 'asc'
//             ? a.title.localeCompare(b.title)
//             : b.title.localeCompare(a.title)
//     })

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = sortedProduct.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.max(1, Math.ceil(sortedProduct.length / itemsPerPage))

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentTime(new Date())
//         }, 1000)

//         return () => clearInterval(interval)
//     }, [])

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen'>
//             {error && <ErrorMessage message={error} />}

//             <div className='m-2'>
//                 {currentTime.toLocaleDateString()} : {currentTime.toLocaleTimeString()}
//                 <input type="text"
//                     className='p-2 m-1 border'
//                     placeholder='Search by Title, Description, Price'
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//                 />
//                 <button
//                     className='border p-2 rounded'
//                     onClick={handleSearch}
//                 >Search
//                 </button>

//                 <button
//                     className='border p-2 rounded'
//                     onClick={() => setSortOrder((prevOrder) => prevOrder === 'asc' ? "desc" : "asc")}
//                 >Sort{sortOrder === 'asc' ? " (A-Z)" : " (Z-A)"}
//                 </button>

//                 <div>
//                     {searchedHistory.map((history, index) => (
//                         <li key={index} className='flex items-center justify-between m-1 p-1 bg-gray-200 rounded'>{index}: {history}
//                             <button
//                                 onClick={() => setSearchedHistory((prevHistory) => prevHistory.filter((_, i) => i !== index))}
//                             >x</button>
//                         </li>
//                     ))}
//                 </div>
//             </div>

//             <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl'>
//                 {loading ? (
//                     Array.from({ length: itemsPerPage }, (_, index) => (
//                         <SkeletonLoader key={index} />
//                     )))
//                     : currentItems.length > 0 ? (
//                         currentItems.map((product) => (
//                             <div key={product.id}
//                                 className='border shadow-md p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
//                             >
//                                 <img src={product.image} alt={product.title}
//                                     onError={handleImageError}
//                                     className='w-full h-48 object-contain rounded mb-4'
//                                 />
//                                 <p>{product.title.split(" ").slice(0, 4).join(" ")}</p>
//                                 <p>{product.description.split(" ").slice(0, 5).join(" ")}</p>
//                                 <p>{product.price}</p>
//                             </div>
//                         ))) : (
//                         <p>No products found...</p>
//                     )}
//             </div>

//             <div className='mt-2'>
//                 {
//                     Array.from({ length: totalPages }, (_, index) => (
//                         <button
//                             key={index + 1}
//                             onClick={() => setCurrentPage(index + 1)}
//                             className={`border rounded px-3 py-1 font-medium mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}
//                             transition-colors hover:bg-blue-400 hover:text-white`}
//                         >{index + 1}</button>
//                     ))}
//             </div>
//             {
//                 showScrollToTop && (
//                     <button
//                         onClick={scrollToTop}
//                         className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
//                     >
//                         ↑
//                     </button>
//                 )
//             }
//             <div>
//                 <thead>
//                     <tr>
//                         {Object.keys(users[0]).map((key) => (
//                             <th>{key}</th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody>
//                         {users.map((user)=>(
//                             <tr key={user.id}>
//                                 <td>{user.id}</td>
//                                 <td>{user.name}</td>
//                                 <td>{user.age}</td>
//                                 <td>{user.occupation}</td>
//                             </tr>
//                         ))}
//                     {/* {users.map(({ id, name, age, occupation }) => (
//                         <tr>
//                             <td>{id}</td>
//                             <td>{name}</td>
//                             <td>{age}</td>
//                             <td>{occupation}</td>
//                         </tr>
//                     ))} */}
//                 </tbody>
//             </div>
//         </div>
//     )
// }

// export default Ssp3



// import React, { useEffect } from "react";

// function App() {
//     // Function to request permission and show notification
//     const showNotification = () => {
//         if (!("Notification" in window)) {
//             alert("This browser does not support notifications.");
//         } else if (Notification.permission === "granted") {
//             new Notification("Hello! This is your React ");
//         } else if (Notification.permission !== "denied") {
//             Notification.requestPermission().then((permission) => {
//                 if (permission === "granted") {
//                     new Notification("Permission granted! Here's your React notification.");
//                 }
//             });
//         }
//     };

//     return (
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//             <h1>React Notification Demo</h1>
//             <button onClick={showNotification}>Show Notification</button>
//         </div>
//     );
// }

// export default App;

import React, { useEffect, useState } from 'react'

const Ssp3 = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products?limit=20')
                const response2 = await fetch('https://fakestoreapi.com/products')
                const response3 = await fetch('https://dummyjson.com/products')

                const [responseData, responseData2, responseData3] = await Promise.all([response.json(), response2.json(), response3.json()])

                console.log("Response Data: ", responseData)
                console.log("Response Data2: ", responseData2)
                console.log("Response Data3: ", responseData3)
                
                const mergedData = [
                    ...responseData.map((item) => ({
                        ...item,
                        id: `escuelajs-${item.id}`
                    }))
                    ,
                    ...responseData2.map((item) => ({
                        ...item,
                        id: `fakestoreapi-${item.id}`
                    }))
                    ,
                    ...responseData3.products.map((item) => ({
                        ...item,
                        id: `dummyjson-${item.id}`
                    }))
                ]

                setProducts(mergedData)
                console.log("Merged Data: ", mergedData)
            } catch (error) {
                console.log("Error: ", error.message)
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            <div>
                <tbody>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </tbody>
                <tbody>
                    {
                        products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </div>
        </div>
    )
}

export default Ssp3