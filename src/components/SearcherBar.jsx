import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearcherBar = ({ filterValue, onFilterChange, onDepartmentFilter }) => {
  const [inputValue, setInputValue] = useState(filterValue);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, onFilterChange]);

  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    onDepartmentFilter(department);
  };

  const clearSearch = () => {
    setInputValue('');
    onFilterChange('');
    setIsMobileSearchOpen(false);
  };

  return (
    <div className="search-section">
      {/* Mobile Search Toggle */}
      <div className="mobile-only">
        {!isMobileSearchOpen ? (
          <button 
            className="btn-primary mobile-search-toggle"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search size={20} />
            Search
          </button>
        ) : (
          <div className="mobile-search-expanded">
            <div className="search-bar">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search team members, tasks, skills..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="search-input"
                autoFocus
              />
              {inputValue && (
                <button 
                  onClick={clearSearch}
                  className="clear-search-btn"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            <button 
              onClick={() => setIsMobileSearchOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Desktop Search */}
      <div className="desktop-only">
        <div className="search-bar">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search team members, tasks, skills..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="filter-section desktop-only">
        <Filter size={16} />
        <select 
          value={selectedDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
          className="department-filter"
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>

      {/* Mobile Department Filter */}
      <div className="filter-section mobile-only">
        <Filter size={16} />
        <select 
          value={selectedDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
          className="department-filter"
        >
          <option value="All">All Depts</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>
      </div>
    </div>
  );
};

export default SearcherBar;