import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, required }) => {
    
    return (
        <div>
            
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                required={required}
                value={value}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
        </div>
    );
};

export default InputField;
