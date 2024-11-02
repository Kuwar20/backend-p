import React from 'react'

const Login = () => {
    return (
        <div className='bg-gray-200 flex flex-col justify-center items-center min-h-screen'>
            <div className='w-full max-w-md'>
                <form>
                    <input type="email" placeholder='Email'
                        className='block m-2 p-2 border rounded-md'
                    />
                    <input type="password" placeholder='Password'
                        className='block m-2 p-2 border rounded-md'
                    />
                    <div>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login