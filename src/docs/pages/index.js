import React from "react";
import { graphql } from 'gatsby';
import { connect } from 'react-redux';
import { capitalize } from '../util';
import { pushNewPage, pushNewQuery } from '../state/app';

import Shell from "../components/Shell";
import Meta from "../components/Meta";
import Search from "../components/Search";
import SnippetCard from "../components/SnippetCard";

import { getRawCodeBlocks as getCodeBlocks } from '../util';

const IndexPage = (props) => {
  console.log(props);
  const snippets = props.data.snippetDataJson.data.map(snippet => ({
    title: snippet.title,
    html: props.data.allMarkdownRemark.edges.find(v => v.node.frontmatter.title === snippet.title).node.html,
    tags: snippet.attributes.tags,
    text: snippet.attributes.text,
    id: snippet.id,
    code: getCodeBlocks(props.data.allMarkdownRemark.edges.find(v => v.node.frontmatter.title === snippet.title).node.rawMarkdownBody).code,
  }));
  const site = props.data.site.siteMetadata;
  const tags = snippets.reduce((acc, snippet) => {
    if (!snippet.attributes || !snippet.attributes.tags)
      return acc;
    const primaryTag = snippet.attributes.tags[0];
    if (!acc.includes(primaryTag))
      acc.push(primaryTag);
    return acc;
  }, []);
  // const taggedSnippets = tags.map(tag => ({
  //   tag,
  //   snippets: snippets.filter(snippet => snippet.attributes && snippet.attributes.tags && snippet.attributes.tags[0] === tag)
  // }));
  
  const [searchQuery, setSearchQuery] = React.useState(props.searchQuery);
  const [searchResults, setSearchResults] = React.useState(snippets);

  React.useEffect(() => {
    props.dispatch(pushNewQuery(searchQuery));
    let q = searchQuery.toLowerCase();
    let results = snippets;
    if (q.trim().length)
      results = snippets.filter(v => v.tags.filter(t => t.indexOf(q) !== -1).length || v.title.toLowerCase().indexOf(q) !== -1);
      // results = taggedSnippets.reduce((acc, tagData) => {
      //   const matches = tagData.snippets.filter(v => v.attributes.tags.filter(t => t.indexOf(q) !== -1).length || v.title.toLowerCase().indexOf(q) !== -1);
      //   if (matches.length > 0)
      //     acc.push({
      //       tag: tagData.tag,
      //       snippets: matches
      //     });
      //   return acc;
      // }, []);
    setSearchResults(results);
  }, [searchQuery]);

  React.useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);


  React.useEffect(() => {
    props.dispatch(pushNewPage('Home', '/'))
  }, []);

  return (
    <>
      <Meta />
      <Shell withIcon={false} isSearch>
        <Search setSearchQuery={setSearchQuery} defaultValue={props.searchQuery}/>
        <p className='light-sub'>Click on a snippet's name to view its code.</p>
        {
          searchQuery.length === 0 ? 
          <>
            <div className='page-graphic search-empty'>
              <p className='empty-page-text search-page-text'>Start typing a keyword to see matching snippets.</p>
            </div>
          </>
          : searchResults.length === 0 ?
          <>
            <div className='page-graphic search-no-results'>
              <p className='empty-page-text'><strong>No results found</strong><br /></p>
              <p className='empty-page-subtext'>We couldn't find any results for the keyword <strong>{searchQuery}</strong>.</p>
            </div>
          </>
          :
          <>
            <h2 className='page-sub-title'>Search results</h2>
            {searchResults.map(snippet => (
              <SnippetCard short key={snippet.id} snippetData={snippet} isDarkMode={props.isDarkMode} />
            ))}
          </>
        }
      </Shell>
    </>
  );
}

export default connect(state => ({
  isDarkMode: state.app.isDarkMode,
  lastPageTitle: state.app.lastPageTitle,
  lastPageUrl: state.app.lastPageUrl,
  searchQuery: state.app.searchQuery
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
          text
        }
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
    ) {
      totalCount
      edges {
        node {
          id
          html
          rawMarkdownBody
          fields {
            slug
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
  }
`;
