// src/pages/Profile.jsx
import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { userName, setUserName } = useContext(UserContext);
  const { email, setEmail } = useContext(UserContext);

  const handleChangeUserName = () => {
    setUserName((prevName) => (prevName === 'John Doe' ? 'janu love' : 'John Doe'));
  };

  const handleChangeEmail = () => {
    setEmail((prevEmail) => (prevEmail === 'kuwarx1@gmail.com' ? 'sagarx1@gmail.com' : 'kuwarx1@gmail.com' ));
  };

  return (
    <div className="p-5 text-center">
      <h2 className="text-xl">Current User: {userName}</h2>
      <button onClick={handleChangeUserName} className="mt-4 p-2 bg-blue-500 text-white">
        Change Name
      </button>
        <br />
      <button
        onClick={handleChangeEmail}
        className='mt-4 p-2 bg-blue-500 text-white'
      >
        change email
      </button>
    </div>
  );
};

export default Profile;
