import React from 'react'
import "./FormSearch.css"

const FormSearch = () => {
    return (
        <div className='form-search'>
            <form>
                <label>
                    Enter whatever you remember:
                    <input
                        type="text"
                        placeholder='Enter Detail'
                    />
                </label>
                <br />
                <button>Search</button>
            </form>
        </div>
    )
}

export default FormSearch