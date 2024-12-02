// import React, { useEffect, useRef, useState } from 'react'
// import { X, Search, ChevronDown, CheckIcon } from 'lucide-react';

// const Dropdown2 = () => {
//     const [options, setOptions] = useState([])
//     const [filteredOptions, setFilteredOptions] = useState([])
//     const [selectedOption, setSelectedOption] = useState([])
//     const [searchTerm, setSearchTerm] = useState('')
//     const [isOpen, setIsOpen] = useState(false)

//     const dropdownRef = useRef(null)
//     const inputRef = useRef(null)

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('https://jsonplaceholder.typicode.com/users')
//                 const data = await response.json()
//                 setOptions(data)
//                 setFilteredOptions(data)
//                 console.log(data)
//             } catch (error) {
//                 console.error(error)
//             }
//         }
//         fetchData()
//     }, [])

//     useEffect(() => {
//         const filtered = options.filter(option =>
//             option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//             !selectedOption.some(selected => selected.id === option.id)
//         )
//         setFilteredOptions(filtered)
//     }, [searchTerm, options, selectedOption])

//     const toggleOption = (option) => {
//         const isSelected = selectedOption.some(selected => selected.id === option.id)

//         if (isSelected) {
//             setSelectedOption(selectedOption.filter(selected => selected.id !== option.id))
//         } else {
//             setSelectedOption([...selectedOption, option])
//         }
//     }

//     const removeOption = (optionToRemove) => {
//         setSelectedOption(selectedOption.filter(option => option.id !== optionToRemove.id))
//     }

//     const clearAllOptions = () => {
//         setSelectedOption([])
//         setSearchTerm('')
//         inputRef.current?.focus()
//     }

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false)
//             }
//         }
//         document.addEventListener('mousedown', handleClickOutside)
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside)
//         }
//     }, [])

//     return (
//         <div
//             ref={dropdownRef}
//             className='relative w-full max-w-lg mx-auto p-4'
//         >
//             <div className='border rounded-md p-2'>
//                 <div className='flex items-center'>
//                     <Search />
//                     <div className='flex flex-wrap flex-grow'>
//                         {
//                             selectedOption.map(option => (
//                                 <span
//                                     key={option.id}
//                                     className='flex items-center bg-gray-200 rounded-full p-1 m-1'
//                                 >
//                                     {option.name}
//                                     <X onClick={() => removeOption(option)} />
//                                 </span>
//                             ))
//                         }
//                         <input
//                             type="text"
//                             ref={inputRef}
//                             value={searchTerm}
//                             onChange={e => setSearchTerm(e.target.value)}
//                             placeholder='Search...'
//                             className='flex-grow outline-none p-1'
//                             onFocus={() => setIsOpen(true)}
//                         />
//                     </div>

//                     {
//                         selectedOption.length > 0 && (
//                             <X onClick={clearAllOptions}
//                                 className='cursor-pointer text-blue-600 hover:text-blue-900'
//                             />
//                         )
//                     }
//                     <ChevronDown onClick={() => setIsOpen(!isOpen)}
//                         className='cursor-pointer text-blue-600 hover:text-blue-900'
//                     />
//                 </div>
//                 {
//                     isOpen && (
//                         <div
//                             className='mt-2 border rounded-md max-h-60 overflow-y-auto'
//                         >
//                             {
//                                 filteredOptions.length === 0 ? (
//                                     <div
//                                         className='p-2 text-center text-gray-400'
//                                     >
//                                         No options found
//                                     </div>
//                                 ) : (
//                                     filteredOptions.map(option => (
//                                         <div
//                                             key={option.id}
//                                             onClick={() => toggleOption(option)}
//                                             className='flex items-center p-2 hover:bg-gray-100 cursor-pointer'
//                                         >
//                                             {selectedOption.some(selected => selected.id === option.id) ? (
//                                                 <CheckIcon className='mr-2 text-blue-600' />
//                                             ) : (
//                                                 <div className='w-5 mr-2'></div>
//                                             )}
//                                             {option.name}
//                                         </div>
//                                     ))
//                                 )
//                             }
//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default Dropdown2

import React, { useEffect, useState } from 'react'
import { X, Search, ChevronDown, CheckIcon } from 'lucide-react';

const Dropdown2 = () => {
    const [options, setOptions] = useState([])
    const [filteredOptions, setFilteredOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [dropdownElement, setDropdownElement] = useState(null)
    const [inputElement, setInputElement] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                const data = await response.json()
                setOptions(data)
                setFilteredOptions(data)
                console.log(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const filtered = options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !selectedOption.some(selected => selected.id === option.id)
        )
        setFilteredOptions(filtered)
    }, [searchTerm, options, selectedOption])

    const toggleOption = (option) => {
        const isSelected = selectedOption.some(selected => selected.id === option.id)

        if (isSelected) {
            setSelectedOption(selectedOption.filter(selected => selected.id !== option.id))
        } else {
            setSelectedOption([...selectedOption, option])
        }
    }

    const removeOption = (optionToRemove) => {
        setSelectedOption(selectedOption.filter(option => option.id !== optionToRemove.id))
    }

    const clearAllOptions = () => {
        setSelectedOption([])
        setSearchTerm('')
        if (inputElement) {
            inputElement.focus()
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownElement && !dropdownElement.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownElement])

    return (
        <div
            ref={e => setDropdownElement(e)}
            className='relative w-full max-w-lg mx-auto p-4'
        >
            <div className='border rounded-md p-2'>
                <div className='flex items-center'>
                    <Search />
                    <div className='flex flex-wrap flex-grow'>
                        {
                            selectedOption.map(option => (
                                <span
                                    key={option.id}
                                    className='flex items-center bg-gray-200 rounded-full p-1 m-1'
                                >
                                    {option.name}
                                    <X onClick={() => removeOption(option)} />
                                </span>
                            ))
                        }
                        <input
                            type="text"
                            ref={el => setInputElement(el)}
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder='Search...'
                            className='flex-grow outline-none p-1'
                            onFocus={() => setIsOpen(true)}
                        />
                    </div>

                    {
                        selectedOption.length > 0 && (
                            <X onClick={clearAllOptions}
                                className='cursor-pointer text-blue-600 hover:text-blue-900'
                            />
                        )
                    }
                    <ChevronDown onClick={() => setIsOpen(!isOpen)}
                        className='cursor-pointer text-blue-600 hover:text-blue-900'
                    />
                </div>
                {
                    isOpen && (
                        <div
                            className='mt-2 border rounded-md max-h-60 overflow-y-auto'
                        >
                            {
                                filteredOptions.length === 0 ? (
                                    <div
                                        className='p-2 text-center text-gray-400'
                                    >
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
                                                <CheckIcon className='mr-2 text-blue-600' />
                                            ) : (
                                                <div className='w-5 mr-2'></div>
                                            )}
                                            {option.name}
                                        </div>
                                    ))
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Dropdown2