import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { connect } from 'react-redux';
import AniLink from "gatsby-plugin-transition-link/AniLink";
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import config from "../../../config";

import { toggleDarkMode } from '../state/app';
import Search from "./Search";

import SearchIcon from "./SVGs/SearchIcon";
import GithubIcon from "./SVGs/GithubIcon";
import DarkModeIcon from "./SVGs/DarkModeIcon";
import LightModeIcon from "./SVGs/LightModeIcon";
import ListIcon from "./SVGs/ListIcon";

const Shell = ({ isDarkMode, isSearch, isList, dispatch, withIcon = true, withTitle = true, children }) => {
  const data = useStaticQuery(graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    file(relativePath: {eq: "30s-icon.png"}) {
      id
      childImageSharp {
        original {
          src
        }
      }
    }
    snippetDataJson(meta: {type: {eq: "snippetListingArray"}}) {
      data {
        title
        id
        attributes {
          tags
        }
      }
    }
  }
  `);
  let viewportWidth = typeof window !== 'undefined' && window.innerWidth;
  
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  
  const tags = data.snippetDataJson.data.reduce((acc, snippet) => {
    if (!snippet.attributes || !snippet.attributes.tags)
    return acc;
    const primaryTag = snippet.attributes.tags[0];
    if (!acc.includes(primaryTag))
    acc.push(primaryTag);
    return acc;
  }, []);
  
  return (
    <div className={isDarkMode ? "page-container dark" : "page-container"}>
      {/* Menu */}
      <header className="menu">
        <AniLink 
          cover direction={viewportWidth < 600 ? "up" : "right"} bg={isDarkMode ? "#434E76" : "#FFFFFF"}
          to="/search" aria-label="Search" className={isSearch ? 'menu-button active' : 'menu-button'}>
        <SearchIcon />
        </AniLink>
        <AniLink
          cover direction={viewportWidth < 600 ? "up" : "right"} bg={isDarkMode ? "#434E76" : "#FFFFFF"}
          to="/list" aria-label="Snippet list" className={isList ? 'menu-button active' : 'menu-button'}>
          <ListIcon />
        </AniLink>
        <a href={config.repositoryUrl} rel="noopener" target="_blank" aria-label="View on GitHub" className='menu-button'>
          <GithubIcon />
        </a>
        <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={300} transitionLeaveTimeout={300} component ='button' className='menu-button' childComponent={React.Fragment}>
          {
            isDarkMode ? 
            <LightModeIcon key='lmit' onClick={() => dispatch(toggleDarkMode(!isDarkMode))} />
            :
            <DarkModeIcon key='dmit' onClick={() => dispatch(toggleDarkMode(!isDarkMode))} />
          }
        </ReactCSSTransitionReplace>
      </header>
      {/* Content */}
      <div className='content'>
        {withTitle ? <h1 className='website-title'>{data.site.siteMetadata.title}
        {withIcon ? <img src={data.file.childImageSharp.original.src} alt="Logo" className='website-logo'/>: ''}
        </h1> : ''}
        {children}
      </div>
    </div>
  );
};

export default connect(state => ({
  isDarkMode: state.app.isDarkMode,
  lastPageTitle: state.app.lastPageTitle,
  lastPageUrl: state.app.lastPageUrl,
  searchQuery: state.app.searchQuery
}), null)(Shell);
