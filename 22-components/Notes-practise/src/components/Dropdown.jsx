// import React, { useState, useEffect } from 'react';

// const MultiSelectDropdown = ({ apiUrl }) => {
//   const [options, setOptions] = useState([]); // Options fetched from API
//   const [searchTerm, setSearchTerm] = useState(''); // User's search input
//   const [selectedOptions, setSelectedOptions] = useState([]); // Selected tags
//   const [isOpen, setIsOpen] = useState(false); // Dropdown open/close state

//   // Fetch data from API
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();
//         setOptions(data); // Assuming data is an array of objects
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [apiUrl]);

//   // Filter options based on search term and exclude selected options
//   const filteredOptions = options
//     .filter(
//       (option) =>
//         option.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
//         !selectedOptions.includes(option.name) // Exclude already selected options
//     );

//   // Handle selection of options
//   const handleSelect = (option) => {
//     if (!selectedOptions.includes(option.name)) {
//       setSelectedOptions((prev) => [...prev, option.name]); // Store the name or relevant field
//     }
//   };

//   // Handle removing a tag
//   const handleRemove = (optionName) => {
//     setSelectedOptions((prev) => prev.filter((item) => item !== optionName));
//   };

//   // Clear all selected tags
//   const handleClearAll = () => {
//     setSelectedOptions([]);
//   };

//   return (
//     <div className="w-full max-w-md mx-auto mt-10 min-h-screen">
//       {/* Search bar with tags */}
//       <div
//         className="flex items-center flex-wrap gap-2 border border-gray-300 rounded-lg p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {selectedOptions.map((option, index) => (
//           <div
//             key={index}
//             className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
//           >
//             <span>{option}</span>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleRemove(option);
//               }}
//               className="hover:text-blue-900"
//             >
//               ✕
//             </button>
//           </div>
//         ))}
//         <input
//           type="text"
//           className="flex-grow focus:outline-none"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         {selectedOptions.length > 0 && (
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               handleClearAll();
//             }}
//             className="text-red-600 hover:text-red-800"
//           >
//             Clear All
//           </button>
//         )}
//       </div>

//       {/* Dropdown */}
//       {isOpen && (
//         <div className="border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto bg-white shadow-md">
//           {filteredOptions.map((option, index) => (
//             <div
//               key={index}
//               className="p-2 hover:bg-gray-100 cursor-pointer"
//               onClick={() => handleSelect(option)}
//             >
//               {option.name} {/* Change `name` to the correct key */}
//             </div>
//           ))}
//           {filteredOptions.length === 0 && (
//             <div className="p-2 text-gray-500">No options found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MultiSelectDropdown;

import React, { useState, useEffect, useRef } from 'react';
import { X, Search, ChevronDown, CheckIcon } from 'lucide-react';

const MultiSelectDropdown = ({ apiUrl }) => {
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setOptions(data);
        setFilteredOptions(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Filter options based on search term
  useEffect(() => {
    const filtered = options.filter(option => 
      option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !selectedOptions.some(selected => selected.id === option.id)
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options, selectedOptions]);

  // Toggle option selection
  const toggleOption = (option) => {
    const isSelected = selectedOptions.some(
      selected => selected.id === option.id
    );

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(selected => selected.id !== option.id)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  // Remove a selected option
  const removeOption = (optionToRemove) => {
    setSelectedOptions(
      selectedOptions.filter(option => option.id !== optionToRemove.id)
    );
  };

  // Clear all selected options
  const clearAllOptions = () => {
    setSelectedOptions([]);
    setSearchTerm('');
    inputRef.current?.focus();
  };

  return (
    <div 
      ref={dropdownRef} 
      className="relative w-full max-w-lg mx-auto min-h-screen mt-10"
    >
      {/* Search Input with Tags */}
      <div className="flex items-center border rounded-md focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <Search className="ml-3 text-gray-400" />
        <div className="flex flex-wrap flex-grow p-2">
          {selectedOptions.map(option => (
            <span 
              key={option.id} 
              className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-1 hover:bg-blue-200 transition-colors group"
            >
              {option.name}
              <X 
                onClick={() => removeOption(option)} 
                className="ml-1 w-4 h-4 text-blue-600 hover:text-blue-900 cursor-pointer group-hover:scale-110 transition-transform"
              />
            </span>
          ))}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search and select options"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
            className="flex-grow outline-none ml-2 placeholder-gray-400"
          />
        </div>
        
        {selectedOptions.length > 0 && (
          <X 
            onClick={clearAllOptions} 
            className="mr-3 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
          />
        )}
        
        <ChevronDown 
          onClick={() => setIsOpen(!isOpen)}
          className="mr-3 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-3 text-gray-500 text-center">
              No options found
            </div>
          ) : (
            filteredOptions.map(option => (
              <div
                key={option.id}
                onClick={() => toggleOption(option)}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer transition-colors"
              >
                {selectedOptions.some(selected => selected.id === option.id) ? (
                  <CheckIcon className="mr-2 text-blue-500" />
                ) : (
                  <div className="w-5 mr-2" />
                )}
                {option.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelectDropdown;