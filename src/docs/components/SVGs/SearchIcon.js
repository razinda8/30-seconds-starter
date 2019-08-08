import React from "react";
// import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const SearchIcon = ({className}) => {
  let viewportWidth = typeof window !== 'undefined' && window.innerWidth;
  return (
    <AniLink cover direction={viewportWidth < 600 ? "up" : "right"} to="/search" bg="#ffffff" aria-label="Search" className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </AniLink>
  );
}




export default SearchIcon;