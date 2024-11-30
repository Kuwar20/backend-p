import React, { useEffect, useRef, useState } from 'react'
import { X, Search, ChevronDown, CheckIcon } from 'lucide-react';

const Dropdown1 = () => {
    const [options, setOptions] = useState([])
    const [filteredOptions, setFilteredOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState([]) // Corrected initial state
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await response.json()
                setOptions(data)
                setFilteredOptions(data)
            } catch (error) {
                console.error(error) // Use console.error for errors
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            // Ensure option is not already selected
            !selectedOption.some(selected => selected.id === option.id)
        );
        setFilteredOptions(filtered)
    }, [searchTerm, options, selectedOption])

    const toggleOption = (option) => {
        const isSelected = selectedOption.some(selected => selected.id === option.id)

        if (isSelected) {
            // Remove option if already selected
            setSelectedOption(selectedOption.filter(selected => selected.id !== option.id))
        } else {
            // Add option if not selected
            setSelectedOption([...selectedOption, option])
        }
    }

    const removeOption = (optionToRemove) => {
        setSelectedOption(selectedOption.filter(option => option.id !== optionToRemove.id))
    }

    const clearAllOptions = () => {
        setSelectedOption([])
        setSearchTerm('')
        inputRef.current?.focus() // Use optional chaining
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        // Corrected to mousedown
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div
            ref={dropdownRef}
            className='relative w-full max-w-lg mx-auto p-4'
        >
            <div className='border rounded-md p-2'>
                <div className='flex items-center'>
                    <Search className='mr-2 text-gray-400' />
                    <div className='flex flex-wrap flex-grow'>
                        {selectedOption.map(option => (
                            <span
                                key={option.id}
                                className='flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm mr-2 mb-1'
                            >
                                {option.name}
                                <X
                                    className='ml-1 cursor-pointer text-blue-600 hover:text-blue-900'
                                    onClick={() => removeOption(option)}
                                />
                            </span>
                        ))}
                        <input 
                            type="text"
                            ref={inputRef}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onFocus={() => setIsOpen(true)}
                            placeholder='Search...'
                            className='flex-grow outline-none'
                        />
                    </div>

                    {selectedOption.length > 0 && (
                        <X
                            onClick={clearAllOptions}
                            className='cursor-pointer text-gray-400 hover:text-gray-600'
                        />
                    )}
                    <ChevronDown
                        className={`ml-2 cursor-pointer ${isOpen ? 'transform rotate-180' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </div>

                {isOpen && (
                    <div className='mt-2 border rounded-md max-h-60 overflow-y-auto'>
                        {filteredOptions.length === 0 ? (
                            <div className='p-2 text-center text-gray-500'>
                                No options found
                            </div>
                        ) : (
                            filteredOptions.map(option => (
                                <div
                                    key={option.id}
                                    onClick={() => toggleOption(option)}
                                    className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
                                >
                                    {selectedOption.some(selected => selected.id === option.id) ? (
                                        <CheckIcon className='mr-2 text-blue-500' />
                                    ) : (
                                        <div className='w-5 mr-2'></div>
                                    )}
                                    {option.name}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown1