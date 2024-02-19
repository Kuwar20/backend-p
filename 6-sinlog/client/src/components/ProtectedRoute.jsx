import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = (props) => {

    const { Component } = props;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let Login = localStorage.getItem('Login');
        if (!Login) {
            navigate('/login');
            return;
        }
        setIsLoading(false);
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

export default ProtectedRoute;