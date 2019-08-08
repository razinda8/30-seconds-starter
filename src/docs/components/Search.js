import React from "react";

const Search = ({menuOpen, setSearchQuery, className=''}) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setSearchQuery(value);
  },[value]);

  return (
    <input className='search-box' type="search" id="searchInput" placeholder="Search..." aria-label="Snippet search" onKeyUp={(e) => { setValue(e.target.value); }}/>
  );
}

export default Search;
