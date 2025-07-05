import React, { useState, useEffect, useRef } from 'react';

interface Option {
  value: string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  'aria-label'?: string;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({ options, value, onChange, 'aria-label': ariaLabel }) => {
  const [filterTerm, setFilterTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOptionName = options.find(o => o.value === value)?.name || '';

  const filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const handleSelect = (selectedValue: string) => {
    onChange(selectedValue);
    setFilterTerm('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFilterTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const displayValue = isOpen ? filterTerm : selectedOptionName;

  return (
    <div className="searchable-select" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={(e) => {
          setFilterTerm(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => {
          setIsOpen(true);
          setFilterTerm('');
        }}
        placeholder="Search..."
        aria-label={ariaLabel}
        size={20}
      />
      {isOpen && (
        <ul className="options-list">
          {filteredOptions.map(option => (
            <li key={option.value} onMouseDown={(e) => {
              e.preventDefault();
              handleSelect(option.value);
            }}>
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;