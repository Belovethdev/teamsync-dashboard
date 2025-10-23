import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import styled from 'styled-components';
import { Flex } from '../../styles/styled/Layout';
import { Input, Select } from '../../styles/styled/Form';
import { SecondaryButton } from '../../styles/styled/Button';
import { theme } from '../../styles/styled/theme';

const SearcherSection = styled(Flex)`
  gap: ${theme.spacing.lg};
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.md};
  }
`;

const SearcherBarContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    width: 100%;
  }
`;

const SearchInput = styled(Input)`
  padding-left: ${theme.spacing.xl};
  width: 100%;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.textSecondary};
  pointer-events: none;
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: ${theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.surfaceLight};
    color: ${theme.colors.textPrimary};
  }
`;

const FilterSection = styled(Flex)`
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textSecondary};

  @media (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: space-between;
  }
`;

const DepartmentFilter = styled(Select)`
  min-width: 160px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    min-width: auto;
    flex: 1;
    margin-left: ${theme.spacing.sm};
  }
`;

// Mobile specific components
const MobileSearchToggle = styled(SecondaryButton)`
  width: 100%;
  justify-content: center;
  gap: ${theme.spacing.sm};

  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const MobileSearchExpanded = styled(Flex)`
  gap: ${theme.spacing.md};
  align-items: center;
  width: 100%;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: ${theme.spacing.sm};
  }

  @media (min-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`;

const DesktopSearch = styled.div`
  @media (max-width: ${theme.breakpoints.mobile}) {
    display: none;
  }
`;

const StyledSearcherBar = ({ filterValue, onFilterChange, onDepartmentFilter }) => {
  const [inputValue, setInputValue] = useState(filterValue);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
    <SearcherSection>
      {/* Mobile Search */}
      <div className="mobile-only">
        {!isMobileSearchOpen ? (
          <MobileSearchToggle
            onClick={() => setIsMobileSearchOpen(true)}
            mobileFull
          >
            <Search size={20} />
            Search
          </MobileSearchToggle>
        ) : (
          <MobileSearchExpanded>
            <SearcherBarContainer>
              <SearchIcon size={20} />
              <SearchInput
                type="text"
                placeholder="Search team members, tasks, skills..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              {inputValue && (
                <ClearSearchButton onClick={clearSearch}>
                  <X size={16} />
                </ClearSearchButton>
              )}
            </SearcherBarContainer>
            <SecondaryButton 
              onClick={() => setIsMobileSearchOpen(false)}
              mobileFull
            >
              Cancel
            </SecondaryButton>
          </MobileSearchExpanded>
        )}
      </div>

      {/* Desktop Search */}
      <DesktopSearch>
        <SearcherBarContainer>
          <SearchIcon size={20} />
          <SearchInput
            type="text"
            placeholder="Search team members, tasks, skills..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {inputValue && (
            <ClearSearchButton onClick={clearSearch}>
              <X size={16} />
            </ClearSearchButton>
          )}
        </SearcherBarContainer>
      </DesktopSearch>
      
      <FilterSection>
        <Filter size={16} />
        <DepartmentFilter
          value={selectedDepartment}
          onChange={(e) => handleDepartmentChange(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Product">Product</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </DepartmentFilter>
      </FilterSection>
    </SearcherSection>
  );
};

export default StyledSearcherBar;