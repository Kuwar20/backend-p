import React, { useEffect, useState } from 'react';

const LocalStorageExample = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('name', name);
  };

  const handleClear = () => {
    localStorage.removeItem('name');
    setName('');
  };

  return (
    <div>
      <h1>Local Storage Example</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={handleSave}>Save to Local Storage</button>
      <button onClick={handleClear}>Clear Local Storage</button>
      <h2>{name ? `Stored Name: ${name}` : 'No name stored'}</h2>
    </div>
  );
};

export default LocalStorageExample;


// import React, { useEffect, useState } from 'react';

// const SessionStorageExample = () => {
//   const [sessionData, setSessionData] = useState('');

//   useEffect(() => {
//     const storedData = sessionStorage.getItem('sessionData');
//     if (storedData) {
//       setSessionData(storedData);
//     }
//   }, []);

//   const handleSave = () => {
//     sessionStorage.setItem('sessionData', sessionData);
//   };

//   const handleClear = () => {
//     sessionStorage.removeItem('sessionData');
//     setSessionData('');
//   };

//   return (
//     <div>
//       <h1>Session Storage Example</h1>
//       <input
//         type="text"
//         value={sessionData}
//         onChange={(e) => setSessionData(e.target.value)}
//         placeholder="Enter session data"
//       />
//       <button onClick={handleSave}>Save to Session Storage</button>
//       <button onClick={handleClear}>Clear Session Storage</button>
//       <h2>{sessionData ? `Stored Session Data: ${sessionData}` : 'No data stored'}</h2>
//     </div>
//   );
// };

// export default SessionStorageExample;

// import React, { useEffect, useState } from 'react';

// const CacheExample = () => {
//   const [data, setData] = useState(null);
//   const CACHE_NAME = 'my-cache';
  
//   const fetchData = async () => {
//     const cache = await caches.open(CACHE_NAME);
//     const cachedResponse = await cache.match('https://jsonplaceholder.typicode.com/posts/1');

//     if (cachedResponse) {
//       const cachedData = await cachedResponse.json();
//       setData(cachedData);
//     } else {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//       const newData = await response.json();
//       setData(newData);
      
//       // Cache the response
//       cache.put('https://jsonplaceholder.typicode.com/posts/1', new Response(JSON.stringify(newData)));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>Cache Example</h1>
//       {data ? (
//         <div>
//           <h2>{data.title}</h2>
//           <p>{data.body}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default CacheExample;
