import React, { useState } from 'react'

const Login1 = () => {
    const [formData, setFormData] = useState({
        email: " ",
        password: " ",
    })
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div>
            <div className='max-w-md'>
                <form onSubmit={handleSubmit}>
                    <input type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                    />
                    <input type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="border border-gray-300 w-full p-2 rounded-lg"
                    />
                    <div>
                        <button
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login1