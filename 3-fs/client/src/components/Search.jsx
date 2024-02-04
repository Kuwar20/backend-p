import React from 'react'
import './Search.css'

const Search = () => {
    return (
        <div className='card-container'>
            <label>
                Name:
                <input type="text"
                    placeholder='search by name'
                />
            </label>
            <br />
            <label>
                Number:
                <input type="number"
                    placeholder='search by name'
                />
            </label>
            <br />
            <div className='button'>
                <button className="search-button">Search</button>
                <button className="delete-button">Delete</button>
            </div>
        </div>
    )
}

export default Search