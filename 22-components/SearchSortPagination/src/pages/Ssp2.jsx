import React, { useEffect, useState } from 'react'

const ErrorMessage = ({ message }) => (
    <div className="w-full p-4 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
        <div className="flex items-center">
            <span className="font-bold">Error:</span>
            <p className="ml-2">{message}</p>
        </div>
    </div>
);

const SkeletonLoader = () => (
    <div className="border rounded-lg shadow-md p-4 flex flex-col items-center animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-6 bg-gray-300 w-3/4 rounded mb-2"></div>
        <div className="h-6 bg-gray-300 w-1/4 rounded"></div>
    </div>
);

const Ssp2 = () => {
    const [posts, setPosts] = useState([])
    const [showScrollToTop, setScrollToTop] = useState(false)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [error, setError] = useState(null)
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const responseData = await response.json();
                console.log(responseData)
                setPosts(responseData)
                setError(null)
            } catch (error) {
                setError(error.message || 'Failed to fetch posts')
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollToTop(window.scrollY > 100)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const searchedPosts = posts.filter((post) => (
        post.title?.toLowerCase().includes(search.toLowerCase()) ||
        post.body?.toLowerCase().includes(search.toLowerCase())
    ))

    /*     
      const sortProduct = (productToSort) => {
          return productToSort.sort((a, b) => {
              if (sortOrder === 'asc') {
                  return a.title.localeCompare(b.title);
              } else {
                  return b.title.localeCompare(a.title);
              }
          })
      }
      const sortedProduct = sortProduct([...searchedProduct]);
  */

    const sortedPosts = searchedPosts.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    })

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPosts = sortedPosts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.max(1, Math.ceil(sortedPosts.length / itemsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    return (
        <div className='flex flex-col items-center min-h-screen p-4'>
            {error && <ErrorMessage message={error} />}
            <div className="w-full max-w-2xl bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center space-x-4">
                <input
                    type="text"
                    placeholder='Search Post using Title or Body'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                    required
                />
                <button
                    className='bg-blue-500 text-white px-4 py-2 rounded-lg'
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >Sort {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}</button>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 w-full max-w-6xl'>
                {loading ? (
                    Array.from({ length: itemsPerPage }, (_, index) => (
                        <SkeletonLoader key={index} />
                    ))
                ) :
                    currentPosts.length > 0 ? (
                        currentPosts.map((post) => (
                            <div key={post.id}
                                className='border rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
                            >
                                <h3>Title: {post.title.split(" ").slice(0, 4).join(" ")}</h3>
                                <p>Body: {post.body.split(" ").slice(0, 4).join(" ")}</p>
                            </div>
                        ))) : (
                        <div>No Post Found..</div>
                    )
                }
            </div>
            <div className='mt-4'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-3 py-1 mx-1 rounded-lg border ${currentPage === index + 1
                            ? 'bg-blue-500 text-white'
                            : 'bg-white text-gray-500'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            {showScrollToTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
                >
                    ↑
                </button>
            )}
        </div>
    )
}

export default Ssp2