import React from 'react';

const DropdownMenu = ({ options, selectedOption, handleOptionChange }) => {
  return (
    <select value={selectedOption} onChange={handleOptionChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
