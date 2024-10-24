// import { useEffect, useState } from 'react';

// function App() {
//   const [message, setMessage] = useState('');
//   const [serverMessage, setServerMessage] = useState('');

//   useEffect(() => {
//     // Connect to WebSocket server
//     const ws = new WebSocket('ws://localhost:3000');

//     // On receiving a message from the server
//     ws.onmessage = (event) => {
//       setServerMessage(event.data);
//     };

//     // Cleanup on component unmount
//     return () => ws.close();
//   }, []);

//   // Send message to server
//   const sendMessage = () => {
//     const ws = new WebSocket('ws://localhost:8080');
//     ws.onopen = () => ws.send(message);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h1 className="text-2xl font-bold mb-4">WebSocket Client</h1>
//         <input
//           type="text"
//           className="border p-2 w-full mb-4"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button
//           onClick={sendMessage}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Send Message
//         </button>
//         {serverMessage && (
//           <p className="mt-4 text-green-500">Server: {serverMessage}</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState, useRef } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    // Connect to WebSocket server
    ws.current = new WebSocket('ws://localhost:8080');

    // Listen for messages from the server
    ws.current.onmessage = (event) => {
      setChatLog((prevLog) => [...prevLog, event.data]);
    };

    // Cleanup WebSocket on component unmount
    return () => ws.current.close();
  }, []);

  // Send message to server
  const sendMessage = () => {
    if (message.trim()) {
      ws.current.send(message);
      setMessage(''); // Clear input after sending
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white w-full max-w-md p-6 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Real-Time Chat</h1>
        <div className="h-64 overflow-y-auto border p-4 rounded mb-4 bg-gray-50">
          {chatLog.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          type="text"
          className="border p-2 w-full mb-4"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
