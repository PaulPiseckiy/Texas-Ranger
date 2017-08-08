//@flow
import React from 'react';
import './index.css'


const Search = ({ value, onChange }: {value: string, onChange: (Function)}) => 
  <form onSubmit={(e: Event): void => {e.preventDefault()}} className="search-form">
    <label>Search:</label>
    <input 
      placeholder="..."
      value={value}
      onChange={onChange}
      type="text"
    />
  </form>

export default Search;