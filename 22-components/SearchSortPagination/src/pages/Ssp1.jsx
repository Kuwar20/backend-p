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
            <div>
                <ol className='list-decimal'>
                    {loading ? (
                        <p>Loading posts..</p>
                    ) :
                        posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.id}>
                                    <h3>Title: {post.title}</h3>
                                    <p>Body: {post.body}</p>
                                </div>
                            ))) : (
                            <p>No posts found</p>
                        )
                    }
                </ol>
            </div>
            <div></div>
        </div>
    )
}

export default Ssp1