import React, { useState } from 'react'

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        //console.log(e.target)
        const { name, value } = e.target;
        setFormData((prev) => {
            console.log({...prev}); // Logs the form data before the update
            console.log(prev); // Logs the form data before the update
            return { ...prev, [name]: value };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder='Email'
                        name='email'
                        value={formData.email}
                        // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        onChange={handleChange}
                        className='border border-gray-300 p-2'
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className='border border-gray-300 p-2'
                    />
                    <button
                        className='bg-blue-500 text-white p-2 mt-2'
                    >Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login