import React, { useState } from 'react'
import axios from 'axios';
import './Search.css'

const Search = () => {
    const [nameInput, setNameInput] = useState('');
    const [numberInput, setNumberInput] = useState('');
    //const [responseData, setResponseData] = useState(null);
    const [searchResponse, setSearchResponse] = useState(null);
    const [allResponse, setAllResponse] = useState(null);

    const handleSearch = async () => {
        setAllResponse(null);
        if (nameInput) {
            // Call API 1 with nameInput as parameter
            try {
                const response = await axios.get(`http://localhost:3000/api/user/by-name/${nameInput}`);
                console.log(response.data);
                setSearchResponse(response.data);
            } catch (error) {
                console.error(error);
            }
        } else if (numberInput) {
            // Call API 2 with numberInput as parameter
            try {
                const response = await axios.get(`http://localhost:3000/api/user/by-number/${numberInput}`);
                console.log(response.data);
                setSearchResponse(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
    const handleSearchAll = async () => {
        setSearchResponse(null);
        try {
            const response = await axios.get('http://localhost:3000/api/user/all');
            console.log(response.data);
            setAllResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleDelete = async () => {
        setSearchResponse(null);
        setAllResponse(null);
        if (nameInput) {
            // Call API to search for the user
            try {
                const response = await axios.get(`http://localhost:3000/api/user/by-name/${nameInput}`);
                console.log(response.data);  
                if (response.data.name) {
                    // If user is found, confirm the deletion
                    const confirmed = window.confirm(`Did you mean "${response.data.name}"?`);
                    if (confirmed) {
                        // If confirmed, delete the user
                        const deleteResponse = await axios.delete(`http://localhost:3000/api/user/delete-by-name/${response.data.name}`);
                        console.log(deleteResponse.data);
                        alert('User Deleted successfully');
                    }
                } else {
                    alert('User not found');
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
    
    const handleReset = () => {
        setNameInput('');
        setNumberInput('');
        setSearchResponse(null);
        setAllResponse(null);
    }

    return (
        <div className='card-container'>
            <label>
                Name:
                <input
                    type="text"
                    placeholder='search by name'
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />
            </label>
            <br />
            <label>
                Number:
                <input
                    type="number"
                    placeholder='search by number'
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                />
            </label>
            <br />
            <div className='button'>
                <button className="search-button" onClick={handleSearch} >Search</button>
                <button className="search-button" onClick={handleSearchAll}>Search all</button>
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </div>
            <br />
            <div className='reset'>
                <button onClick={handleReset}>Reset</button>
            </div>
            {/* {responseData && <div>{JSON.stringify(responseData)}</div>}
            this gives output as {"_id":"65bf782c65424719787ba59e","name":"nisha kumari","number":"1324567895","createdAt":"2024-02-04T11:42:36.495Z","__v":0} */}
            {searchResponse && (Array.isArray(searchResponse) ? searchResponse : [searchResponse]).map((item, index) => (
                <div key={index}>
                    <p>Name: {item.name}</p>
                    <p>Number: {item.number}</p>
                </div>
            ))}
            {allResponse && (
                <>
                    <p>Total people are: {allResponse.length}</p>
                    {allResponse.map((item, index) => (
                        <div key={index} style={{borderBottom: '1px solid #000', marginBottom: '1px'}} >
                            <p>{index + 1}: Name: {item.name}</p>
                            <p>Number: {item.number}</p>
                            <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </>
            )}

        </div>
    )
}

export default Search