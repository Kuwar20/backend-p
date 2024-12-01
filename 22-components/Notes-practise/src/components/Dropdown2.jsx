import React, { useEffect, useRef, useState } from 'react'

const Dropdown2 = () => {
    const [options, setOptions] = useState([])
    const [filteredOptions, setFilteredOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState([])
    const [searchTerm, setSearchTerm] = useState(false)

    const dropdownRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(()=>{
        const fetchData = async()=>{
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
    },[])
    return (
        <div>Dropdown2</div>
    )
}

export default Dropdown2