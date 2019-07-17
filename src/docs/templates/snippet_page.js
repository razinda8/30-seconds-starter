import React from 'react';
import { graphql } from 'gatsby';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard';

const SnippetPage = (props) => {
  const post = props.data.markdownRemark;
  const postData = props.data.snippetDataJson.data.find(v => v.title === post.frontmatter.title);
  console.dir(post);
  console.dir(postData);

  return (
    <>
      <Meta 
        title={post.frontmatter.title}
        description={post.excerpt} 
      />
      <Shell>
        <SnippetCard snippetData={{
          title: postData.title,
          html: post.html,
          code: postData.attributes.codeBlocks.code,
          example: postData.attributes.codeBlocks.example,
          tags: postData.attributes.tags,
          text: postData.attributes.text
        }} />
      </Shell>
    </>
  );
};

export default SnippetPage;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    logo: file(absolutePath: {regex: "/logo_reverse_md.png/"}) {
      id
      childImageSharp {
        fixed(height: 45, width: 45) {
          src
        }
      }
    }
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
          }
        }
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
      }
    }
    snippetDataJson(meta: {type: {eq: "snippetArray"}}) {
      data {
        title
        id
        attributes {
          text
          codeBlocks {
            code
            example
          }
          tags
        }
      }
    }
  }
`;
