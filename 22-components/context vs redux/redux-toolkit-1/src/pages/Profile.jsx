// src/pages/Profile.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeName } from '../features/userSlice';

const Profile = () => {
    const dispatch = useDispatch();

    return (
        <div className="p-5 text-center">
            <button onClick={() => dispatch(changeName())} className="mt-4 p-2 bg-blue-500 text-white">
                Change Name
            </button>
        </div>
    );
};

export default Profile;
