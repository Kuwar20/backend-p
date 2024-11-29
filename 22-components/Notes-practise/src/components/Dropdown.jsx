import React, { useState, useEffect } from 'react';

const MultiSelectDropdown = ({ apiUrl }) => {
  const [options, setOptions] = useState([]); // Options fetched from API
  const [searchTerm, setSearchTerm] = useState(''); // User's search input
  const [selectedOptions, setSelectedOptions] = useState([]); // Selected tags
  const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setOptions(data); // Assuming data is an array of objects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Filter options based on search term and exclude selected options
  const filteredOptions = options
    .filter(
      (option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !selectedOptions.includes(option.name) // Exclude already selected options
    );

  // Handle selection of options
  const handleSelect = (option) => {
    if (!selectedOptions.includes(option.name)) {
      setSelectedOptions((prev) => [...prev, option.name]); // Store the name or relevant field
    }
  };

  // Handle removing a tag
  const handleRemove = (optionName) => {
    setSelectedOptions((prev) => prev.filter((item) => item !== optionName));
  };

  // Clear all selected tags
  const handleClearAll = () => {
    setSelectedOptions([]);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 min-h-screen">
      {/* Search bar with tags */}
      <div
        className="flex items-center flex-wrap gap-2 border border-gray-300 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOptions.map((option, index) => (
          <div
            key={index}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
          >
            <span>{option}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemove(option);
              }}
              className="hover:text-blue-900"
            >
              ✕
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow focus:outline-none"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {selectedOptions.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto bg-white shadow-md">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.name} {/* Change `name` to the correct key */}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;
