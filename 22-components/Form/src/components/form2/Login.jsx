import React from 'react'
import { useState } from 'react'

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value)
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = () => {
        e.preventDefault()
    }
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder='Enter your email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className='border px-2 py-2'
                    />

                    <input
                        type="password"
                        placeholder='Enter your password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className='border px-2 py-2'
                    />

                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login