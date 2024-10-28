import React, { useEffect, useState } from 'react'

const Ssp1 = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <div className='flex flex-col justify-center items-center min-h-screen p-4'>
            <div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl bg-white">
                    {loading ? (
                        <p>Loading posts..</p>
                    ) :
                        posts.length > 0 ? (
                            posts.map((post) => (
                                <li key={post.id}
                                className='border rounded-lg shadow-sm p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105'
                                >
                                    <h3>Title: {post.title}</h3>
                                    <br />
                                    <p>Body: {post.body.split(" ").slice(0,5).join(" ")}</p>
                                </li>
                            ))) : (
                            <p>No posts found</p>
                        )
                    }
            </div>
            <div></div>
        </div>
    )
}

export default Ssp1