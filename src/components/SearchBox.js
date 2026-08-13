import React from 'react';

function SearchBox({ searchChange, searchfield }) {
  return (
    <input
      className="search-box"
      type="search"
      placeholder="Search robots..."
      value={searchfield}
      onChange={searchChange}
      aria-label="Search robots by name"
    />
  );
}

export default SearchBox;
