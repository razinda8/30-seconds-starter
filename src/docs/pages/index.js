import React from "react";
import { Link, graphql } from 'gatsby';

import Shell from "../components/Shell";
import Meta from "../components/Meta";

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

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

  console.log(tags);

  return (
    <>
      <Meta />
      <Shell>
        <h1 className='landing-title'>{site.title}<small>{site.description}</small></h1>
        <input type='search' className='body-search' placeholder='Search for snippets'></input>
        <h4>Snippet categories</h4>
        <ul>
          { tags.map(tag => (
            <li key={tag}><Link to={`/tags/${tag}`}>{capitalize(tag)}</Link></li>
          ))}
        </ul>
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
        title
        attributes {
          tags
        }
      }
    }
  }
`;
