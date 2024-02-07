import React, { useState } from 'react'
import "./FormSearch.css"

const FormSearch = () => {

    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const isNumber = !isNaN(parseFloat(inputValue)) && isFinite(inputValue);

        if (!inputValue.trim()) {
            alert('Please enter a value to search');
            return;
        }

        if(isNumber){
            //call api for number search
            fetchNumberAPI(inputValue);
        }
        else{
            //call api for number search
            fetchNameAPI(inputValue);
        }
    }
    
    const fetchNumberAPI = (number) => {
        console.log(`Fetching number API for: ${number}`);
    }
    const fetchNameAPI = (name) => {
        console.log(`Fetching name API for: ${name}`);
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
                <button>Search</button>
            </form>
        </div>
    )
}

export default FormSearch