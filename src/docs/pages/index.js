import React from "react";
import { graphql } from 'gatsby';

import Shell from "../components/Shell";
import Meta from "../components/Meta";
import MenuTagList from "../components/MenuTagList";
import Search from "../components/Search";

const IndexPage = (props) => {
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
        <Search setSearchQuery={setSearchQuery}/>
        <p className='light-sub'>Click on a snippet's name to view its code.</p>
        {/* <h1 className='landing-title'>{site.title}<small>{site.description}</small></h1>
        <div className='category-list card'>
          <Search className="home-search" setSearchQuery={setSearchQuery}/>
          {
            tags.map(tag => ((
              <MenuTagList tagName={tag} snippets={snippets} searchQuery={searchQuery} />
            )))
          }
        </div> */}
      </Shell>
    </>
  );
}

export default IndexPage;

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
