import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
/* (1/3)
    Here we are making a "main page" as protected route, we will check if user is logged in or not, if not, it will redirect to "login" page,
    only after login a user can access this main page
*/

const ProtectedRoute = (props) => {
    const { Component } = props;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // here we have naming conflict with 'login', so we are using 'Login instead with capital L', as a key to check if user is logged in or not
        let Login = localStorage.getItem('Login')
        // if user is not logged in, redirect to login page
        if (!Login) {
            navigate('/login')
        } else {
            setIsLoading(false);
        }
    }, [navigate]);

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <Component />
    )
}

export default ProtectedRoute