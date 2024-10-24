// App.jsx
import React, { useState, useEffect, useRef } from 'react';

function App() {
  // State for managing messages and user input
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [username, setUsername] = useState(`User${Math.floor(Math.random() * 1000)}`);
  const [connected, setConnected] = useState(false);
  
  // WebSocket reference
  const ws = useRef(null);
  
  // Message container reference for auto-scrolling
  const messageContainerRef = useRef(null);

  // Initialize WebSocket connection
  useEffect(() => {
    // Create WebSocket connection
    ws.current = new WebSocket('ws://localhost:3000');

    // Connection opened handler
    ws.current.onopen = () => {
      setConnected(true);
      console.log('Connected to WebSocket server');
    };

    // Message handler
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
      
      // Auto-scroll to bottom when new message arrives
      setTimeout(() => {
        if (messageContainerRef.current) {
          messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
      }, 0);
    };

    // Connection closed handler
    ws.current.onclose = () => {
      setConnected(false);
      console.log('Disconnected from WebSocket server');
    };

    // Cleanup on component unmount
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // Handle message submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    // Send message if connection is open
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'message',
        content: messageInput,
        sender: username
      }));
      setMessageInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Real-time Chat</h1>
          <div className="text-sm text-gray-500">
            Status: {connected ? 'Connected' : 'Disconnected'}
          </div>
        </div>

        {/* Messages Container */}
        <div 
          ref={messageContainerRef}
          className="h-96 overflow-y-auto p-4 space-y-2"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                msg.sender === username
                  ? 'bg-blue-100 ml-auto'
                  : 'bg-gray-100'
              } max-w-[80%] break-words`}
            >
              <div className="text-xs text-gray-500">{msg.sender}</div>
              <div>{msg.content}</div>
            </div>
          ))}
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!connected}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;