import React, { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        if (!response.ok) {
          // Throw an error if the response is not ok
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        // Catch and set the error to display to the user
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      ) : (
        !error && <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
