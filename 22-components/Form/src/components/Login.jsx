// client/src/components/Login.jsx
import React, { useState } from 'react';
import InputField from './InputField';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('https://666fc0fe0900b5f872481dcc.mockapi.io/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ text: data.message, type: 'success' });
                // Redirect or perform any action after successful login here
            } else {
                setMessage({ text: data.error || 'Login failed. Please try again.', type: 'error' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setMessage({ text: 'An unexpected error occurred. Please try again later.', type: 'error' });
        } finally {
            setFormData({ email: '', password: '' });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12">
            <div className="w-full max-w-md">
                <h2 className="text-center text-2xl font-bold text-blue-600">Login</h2>
                <div className="bg-white shadow-md rounded-lg px-8 py-6 mt-6">
                    {message && (
                        <div className={`mb-4 p-2 text-center ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <div className='relative'>
                        <InputField
                            label="Password"
                            type={isPasswordVisible ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                            onClick={() => setIsPasswordVisible((prev) => !prev)}
                        >
                            {isPasswordVisible ? '🙈' : '👁️'}
                        </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-2 px-4 rounded-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                            >
                                {isSubmitting ? 'Loading...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
