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
        // Determine if all are already selected
        const allSelected = checkboxes.every(checkbox => checkbox.checked);

        // Toggle select/deselect all based on previous state
        const updatedCheckboxes = checkboxes.map(checkbox => ({
            ...checkbox,
            checked: !allSelected
        }));

        setCheckboxes(updatedCheckboxes);
    };

    return (
        <div>
            <button onClick={selectAll}>
                {checkboxes.every(checkbox => checkbox.checked) ? 'Deselect All' : 'Select All'}
            </button>

            {checkboxes.map(checkbox => (
                <div key={checkbox.id}>
                    <input
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => handleOptionSelect(checkbox.id)}
                    />
                    <label>{checkbox.label}</label>
                </div>
            ))}
        </div>
    );
};

export default Checkboxes;
