// import React, { useState, useEffect } from 'react';

// const MyComponent = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
//         if (!response.ok) {
//           throw new Error(`HTTP error ${response.status}`);
//         }
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setData({ error: 'Failed to fetch data' });
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//           {data ? (
//             data.error ? (
//               <div>Error: {data.error}</div>
//             ) : (
//               <div>Data: {JSON.stringify(data)}</div>
//             )
//           ) : (
//             <div>Loading...</div>
//           )}
//     </div>
//   );
// };

// export default MyComponent;

import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch data. Please try again later.'); // More descriptive error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>Error: {error}</div>
      ) : (
        <div>Data: {JSON.stringify(data)}</div>
      )}
    </div>
  );
};

export default MyComponent;
