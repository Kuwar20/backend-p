import React, { useState } from 'react'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    return (
        <div className='bg-gray-200 flex flex-col justify-center items-center min-h-screen'>
            <div className='w-full max-w-md'>
                <form>
                    <input
                        type="email"
                        placeholder='Email'
                        className='block m-2 p-2 border rounded-md'
                        name='email'
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        className='block m-2 p-2 border rounded-md'
                        name='password'
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <div>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        >Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login