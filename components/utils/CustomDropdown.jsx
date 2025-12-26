"use client";
import React, { useState, useRef, useEffect } from "react";

function CustomDropdown({ 
  options = [], 
  value = "", 
  onChange, 
  placeholder = "Select an option",
  label = "",
  required = false,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className="flex gap-2">
          <p className="text-gray-900">{label}</p>
          {required && <span className="text-red-500">*</span>}
        </div>
      )}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={`w-full p-2 border border-gray-300 rounded-md bg-white text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            disabled 
              ? "bg-gray-100 cursor-not-allowed opacity-60" 
              : "hover:border-gray-400 cursor-pointer"
          }`}
        >
          <span className={selectedOption ? "text-gray-900" : "text-gray-500"}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {options.length === 0 ? (
              <div className="p-3 text-gray-500 text-sm">No options available</div>
            ) : (
              options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                    value === option.value ? "bg-blue-50 text-blue-600" : "text-gray-900"
                  }`}
                >
                  {option.label}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomDropdown;

