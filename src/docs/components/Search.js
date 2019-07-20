import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const Search = ({menuOpen, setSearchQuery}) => {
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    setSearchQuery(value);
  },[value]);

  return (
    <input className={menuOpen ? "col-nav" : ""} type="search" id="searchInput" placeholder="Search..." aria-label="Snippet search" onKeyUp={(e) => { setValue(e.target.value); }}/>
  );
}

export default Search;
