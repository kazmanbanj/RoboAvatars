import React from 'react';

const ROLES = ['All', 'Engineer', 'Designer', 'Manager', 'Analyst'];

function FilterBar({ activeRole, onRoleChange }) {
  return (
    <div className="filter-bar">
      <span className="filter-label">Role:</span>
      {ROLES.map((role) => (
        <button
          key={role}
          className={`filter-btn${activeRole === role ? ' active' : ''}`}
          onClick={() => onRoleChange(role)}
          aria-pressed={activeRole === role}
        >
          {role}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
