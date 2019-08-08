import React from "react";
import { graphql } from 'gatsby';
import { connect } from 'react-redux';

import Shell from "../components/Shell";
import Meta from "../components/Meta";
import MenuTagList from "../components/MenuTagList";
import Search from "../components/Search";

const IndexPage = (props) => {
  console.log(props);
  const snippets = props.data.snippetDataJson.data;
  const site = props.data.site.siteMetadata;
  const tags = snippets.reduce((acc, snippet) => {
    if (!snippet.attributes || !snippet.attributes.tags)
      return acc;
    const primaryTag = snippet.attributes.tags[0];
    if (!acc.includes(primaryTag))
      acc.push(primaryTag);
    return acc;
  }, []);

  const [searchQuery, setSearchQuery] = React.useState('');

  const updateSearchQuery = (query) => {
    console.log(query);
    setSearchQuery(query);
  };

  return (
    <>
      <Meta />
      <Shell withIcon={false}>
        <Search setSearchQuery={updateSearchQuery}/>
        <p className='light-sub'>Click on a snippet's name to view its code.</p>
        {
          searchQuery.length === 0 ? 
          <>
            <div className='page-graphic search-no-results'>
              <p className='empty-page-text'>Start typing a keyword to see matching snippets.</p>
            </div>
          </>
          : <p>Got something!</p>
        }
      </Shell>
    </>
  );
}

export default connect(state => ({
  isDarkMode: state.app.isDarkMode
}), null)(IndexPage);

export const indexPageQuery = graphql`
  query snippetList {
    site {
      siteMetadata {
        title
        description
        author
      }
    }
    snippetDataJson(meta: {type: {eq: "snippetListingArray"}}) {
      data {
        id
        title
        attributes {
          tags
        }
      }
    }
  }
`;
