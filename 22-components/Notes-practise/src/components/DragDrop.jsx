import React, { useState, useRef, useCallback, useMemo } from 'react';

// Custom hook to manage drag and drop state
const useDragAndDrop = (initialItems) => {
  const [items, setItems] = useState(initialItems);
  const draggedRef = useRef(null);
  const draggedOverRef = useRef(null);

  const handleDragStart = useCallback((e, index) => {
    draggedRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
    // Slightly reduce opacity to show dragging state
    e.target.style.opacity = '0.5';
  }, []);

  const handleDragEnter = useCallback((e, index) => {
    e.preventDefault();
    draggedOverRef.current = index;
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDragEnd = useCallback((e) => {
    // Restore opacity
    e.target.style.opacity = '1';

    // Reorder items if a valid drag and drop occurred
    if (draggedRef.current !== null && draggedOverRef.current !== null) {
      const newItems = [...items];
      const [reorderedItem] = newItems.splice(draggedRef.current, 1);
      newItems.splice(draggedOverRef.current, 0, reorderedItem);

      setItems(newItems);
      draggedRef.current = null;
      draggedOverRef.current = null;
    }
  }, [items]);

  return { 
    items, 
    handleDragStart, 
    handleDragEnter, 
    handleDragOver, 
    handleDragEnd 
  };
};

// Main Drag and Drop List Component
const DraggableList = () => {
  // Initial list of items with some complexity
  const initialItems = [
    { 
      id: 1, 
      title: 'Learn React', 
      description: 'Deep dive into React hooks and component lifecycle',
      onClick: () => alert('Clicked: Learn React')
    },
    { 
      id: 2, 
      title: 'Build Project', 
      description: 'Create a complex web application from scratch',
      onClick: () => alert('Clicked: Build Project')
    },
    { 
      id: 3, 
      title: 'Deploy Application', 
      description: 'Set up continuous integration and deployment',
      onClick: () => alert('Clicked: Deploy Application')
    },
    { 
      id: 4, 
      title: 'Optimize Performance', 
      description: 'Implement code splitting and memoization',
      onClick: () => alert('Clicked: Optimize Performance')
    }
  ];

  const { 
    items, 
    handleDragStart, 
    handleDragEnter, 
    handleDragOver, 
    handleDragEnd 
  } = useDragAndDrop(initialItems);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Draggable Task List</h2>
      {items.map((item, index) => (
        <div 
          key={item.id}
          draggable
          onClick={item.onClick}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnter={(e) => handleDragEnter(e, index)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          className="
            p-4 mb-2 bg-blue-100 rounded-lg 
            cursor-move hover:bg-blue-200 
            transition-all duration-200 
            flex flex-col
            select-none
          "
        >
          <div className="font-bold text-lg">{item.title}</div>
          <div className="text-sm text-gray-600">{item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default function BeautifulDragDrop() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <DraggableList />
    </div>
  );
}