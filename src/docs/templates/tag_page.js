import React from 'react';
import { graphql } from 'gatsby';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard';

const getCodeBlocks = str => {
  const regex = /```[.\S\s]*?```/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  results = results.map(v => v.replace(/```js([\s\S]*?)```/g, '$1').trim());
  return {
    code: results[0],
    example: results[1]
  };
};

const TagRoute = (props) => {
  const posts = props.data.allMarkdownRemark.edges;
  const tag = props.pageContext.tag;
  const totalCount = props.data.allMarkdownRemark.totalCount;
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? '' : 's'
    } tagged in “${tag}”`;
    
  return (
    <>
      <Meta
        title={tag}
      />
      <Shell>
        {posts &&
          posts.map(({ node }) => (
            <SnippetCard key={node.id} snippetData={{
              title: node.frontmatter.title,
              html: node.html,
              code: getCodeBlocks(node.rawMarkdownBody).code,
              tags: node.frontmatter.tags.split(',').map(v => v.trim())
            }} />
          ))}
      </Shell>
    </>
  );
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagPage($tagRegex: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___title], order: ASC }
      filter: { frontmatter: { tags: { regex: $tagRegex } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
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