import React, { useEffect, useState } from 'react'

const Ssp1 = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showScrollToTop, setScrollToTop] = useState(false)
    const [search, setSearch] = useState('')
    const [sortOrder, setSortOrder] = useState('asc')
    const [currentPage, setCurrentpage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts')
                if (!response.ok) {
                    throw new Error('HTTP error! status: ${response.status}')
                }
                const responseData = await response.json()
                setPosts(responseData)
                console.log(responseData)
            } catch (error) {
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
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.body.toLowerCase().includes(search.toLowerCase())
    ))

    // we are sorting by title, because it is main field of the post
    const sortedPosts = searchedPosts.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    })

    const indexOfLastIndex = currentPage * itemsPerPage;
    const indexOfFirstIndex = indexOfLastIndex - itemsPerPage;
    const currentProducts = sortedPosts.slice(indexOfFirstIndex, indexOfLastIndex);

    const totalPage = Math.max(1, Math.ceil(sortedPosts.length / itemsPerPage));

    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50'>

            <div className="w-full max-w-2xl bg-white p-4 mb-4 rounded-lg shadow-sm flex justify-between items-center space-x-4">
                <input type="text"
                    placeholder='Search posts'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none"
                />
                <button
                    className="px-2 py-2 bg-blue-500 text-white rounded-lg shadow-md transition-all hover:bg-blue-600"
                    onClick={(e) => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                >
                    Sort {sortOrder === 'asc' ? '(A-Z)' : '(Z-A)'}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl bg-white">
                {loading ? (
                    <p>Loading posts..</p>
                ) :
                    currentProducts.length > 0 ? (
                        currentProducts.map((post) => (
                            <li key={post.id}
                                className='border rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
                            >
                                <h3>Title: {post.title}</h3>
                                <br />
                                <p>Body: {post.body.split(" ").slice(0, 5).join(" ")}</p>
                            </li>
                        ))) : (
                        <p>No posts found</p>
                    )
                }
            </div>

            <div className='mt-4 space-x-2'>
                {
                    Array.from({ length: totalPage }, (_, index) => (
                        <button
                            onClick={() => setCurrentpage(index + 1)}
                            className={`border rounded px-3 py-1 font-medium
                                ${currentPage === index +1 
                                ? "bg-blue-500 text-white"
                                : " bg-gray-200 text-gray-700" 
                                } hover:bg-blue-400
                                `}
                        >
                            {index + 1}
                        </button>
                    ))
                }
            </div>

            {
                showScrollToTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 h-12 w-12 rounded-full bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all"
                    >
                        ↑
                    </button>
                )
            }
        </div>
    )
}

export default Ssp1