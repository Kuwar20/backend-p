import React, { useState } from 'react'
import "./FormSearch.css"

const FormSearch = () => {

    const [inputValue, setInputValue] = useState('');
    const [searchResponse, setSearchResponse] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNumber = !isNaN(parseFloat(inputValue)) && isFinite(inputValue);
        const isEmail = inputValue.includes('@');
        if (!inputValue.trim()) {
            alert('Please enter a value to search');
            return;
        }

        if(isNumber){
            //call api for number search
            fetchNumberAPI(inputValue);
        }
        else if(isEmail){
            //call api for email search
            fetchEmailAPI(inputValue);
        }
        else{
            //call api for number search
            fetchNameAPI(inputValue);
        }
    }
    const fetchNumberAPI = async (number) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/by-number/${number}`);
            const data = await response.json();
            setSearchResponse(data);
        } catch (error) {
            console.error(error);
        }
        console.log(`Fetching number API for: ${number}`);
    }

    const fetchNameAPI = async (name) => {
        console.log(`Fetching name API for: ${name}`);
        try {
            const response = await fetch(`http://localhost:3000/api/user/by-name/${name}`);
            const data = await response.json();
            setSearchResponse(data);
            } catch (error) {
            console.error(error);
        }
    }
    
    const fetchEmailAPI = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/api/user/by-email/${email}`);
            const data = await response.json();
            setSearchResponse(data);
        } catch (error) {
            console.error(error);
        }
    }
    const handleReset = () => {
        setInputValue('');
        setSearchResponse(null);
    }

    return (
        <div className='form-search'>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter whatever you remember:
                    <input
                        type="text"
                        placeholder='Enter Detail'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </label>
                <br />
                <button type='submit'>Search</button>
                <button type='button' onClick={handleReset}>Reset</button>
                {searchResponse && (Array.isArray(searchResponse) ? searchResponse:[searchResponse]).map((item, index) => (
                    <div key={index} style={{ borderBottom: '1px solid black' }}>
                        <p>Name: {item.name}</p>
                        <p>Number: {item.number}</p>
                        <p>Email: {item.email}</p>
                    </div>
                ))}
            </form>
        </div>
    )
}

export default FormSearch