import React, { useState } from 'react'
import axios from 'axios';
import './Search.css'

const Search = () => {
    const [nameInput, setNameInput] = useState('');
    const [numberInput, setNumberInput] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleSearch = async () => {
        if (nameInput) {
            // Call API 1 with nameInput as parameter
            try {
                const response = await axios.get(`http://localhost:3000/api/user/by-name/${nameInput}`);
                console.log(response.data);
                setResponseData(response.data);
            } catch (error) {
                console.error(error);
            }
        } else if (numberInput) {
            // Call API 2 with numberInput as parameter
            try {
                const response = await axios.get(`http://localhost:3000/api/user/by-number/${numberInput}`);
                console.log(response.data);
                setResponseData(response.data);
            } catch (error) {
                console.error(error);
            }
        }
    }
    const handleReset = () => {
        setNameInput('');
        setNumberInput('');
        setResponseData(null);
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
                    placeholder='search by name'
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                />
            </label>
            <br />
            <div className='button'>
                <button className="search-button" onClick={handleSearch} >Search</button>
                <button className="search-button">Search all</button>
                <button className="delete-button">Delete</button>
            </div>
            <br />
            <div className='reset'>
                <button onClick={handleReset}>Reset</button>
            </div>
            {/* {responseData && <div>{JSON.stringify(responseData)}</div>}
            this gives output as {"_id":"65bf782c65424719787ba59e","name":"nisha kumari","number":"1324567895","createdAt":"2024-02-04T11:42:36.495Z","__v":0} */}
            {responseData &&
                <div className='response'>
                    <p>Name: {responseData.name}</p>
                    <p>Number: {responseData.number}</p>
                </div>
            }
        </div>
    )
}

export default Search