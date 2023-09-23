import React, { useState } from 'react';
import './Navbar.css';
import { ChevronDown, ChevronUp } from 'react-feather';

const Navbar = ({ sortingOption, onSortingChange, groupingOption, onGroupingChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='nav-bar'>
      <div className='drop-down' onClick={toggleDropdown}>
        <img src="https://cdn-icons-png.flaticon.com/128/8017/8017760.png" className='icon' alt='Menu' />
        <p className='bold'>Display</p>
        {isDropdownOpen ? <ChevronUp className='icon' /> : <ChevronDown className='icon' />}
      </div>
      {isDropdownOpen && (
        <div className='dropdown-options'>
          <DropdownOption label="Grouping" selectedValue={groupingOption} onSelectChange={onGroupingChange}>
            <option value='status'>Status</option>
            <option value='user'>User</option>
            <option value='priority'>Priority</option>
          </DropdownOption>
          <DropdownOption label="Ordering" selectedValue={sortingOption} onSelectChange={onSortingChange}>
            <option value='priority'>Priority</option>
            <option value='title'>Title</option>
          </DropdownOption>
        </div>
      )}
    </div>
  );
};

const DropdownOption = ({ label, selectedValue, onSelectChange, children }) => {
  return (
    <div className='dd-option'>
      <label>{label}</label>
      <select value={selectedValue} onChange={onSelectChange}>
        {children}
      </select>
    </div>
  );
};

export default Navbar;
