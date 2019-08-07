import React from "react";
// import { Link } from "gatsby";
import AniLink from "gatsby-plugin-transition-link/AniLink";

const ListIcon = ({ className }) => (
  <AniLink cover direction="up" to="/list" bg="#ffffff" aria-label="Snippet list" className={className}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list">
      <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line>
    </svg>
  </AniLink>
);

export default ListIcon;