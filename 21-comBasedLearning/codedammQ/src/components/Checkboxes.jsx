import React, { useState } from 'react';

const Checkboxes = () => {
    const [checkboxes, setCheckboxes] = useState([
        { id: 1, label: 'Dog', checked: false },
        { id: 2, label: 'Cat', checked: false },
        { id: 3, label: 'Bird', checked: false },
        { id: 4, label: 'Fish', checked: false }
    ]);

    const handleOptionSelect = (id) => {
        const updatedCheckboxes = checkboxes.map(checkbox => {
            if (checkbox.id === id) {
                return {
                    ...checkbox,
                    checked: !checkbox.checked
                };
            }
            return checkbox;
        });
        setCheckboxes(updatedCheckboxes);
    };

    const selectAll = () => {
        const allSelected = checkboxes.every(checkbox => checkbox.checked);

        const updatedCheckboxes = checkboxes.map(checkbox => ({
            ...checkbox,
            checked: !allSelected
        }));

        setCheckboxes(updatedCheckboxes);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Select Your Pets</h1>
            <button
                onClick={selectAll}
                className="bg-blue-500 text-white px-4 py-2 mb-4 rounded hover:bg-blue-700"
            >
                {checkboxes.every(checkbox => checkbox.checked) ? 'Deselect All' : 'Select All'}
            </button>

            <div className="space-y-2">
                {checkboxes.map(checkbox => (
                    <label key={checkbox.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={checkbox.checked}
                            onChange={() => handleOptionSelect(checkbox.id)}
                            className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
                        />
                        <span className="text-lg">{checkbox.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default Checkboxes;
