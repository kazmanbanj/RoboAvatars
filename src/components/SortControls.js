import React from 'react';

const SORT_OPTIONS = [
  { value: 'id', label: 'Default' },
  { value: 'az', label: 'A → Z' },
  { value: 'za', label: 'Z → A' },
];

function SortControls({ sortOrder, onSortChange }) {
  return (
    <div className="sort-controls">
      <span className="sort-label">Sort:</span>
      {SORT_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          className={`sort-btn${sortOrder === opt.value ? ' active' : ''}`}
          onClick={() => onSortChange(opt.value)}
          aria-pressed={sortOrder === opt.value}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default SortControls;
