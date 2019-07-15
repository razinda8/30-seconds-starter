import React from 'react';
import { graphql } from 'gatsby';

import '../styles/index.scss';
import Meta from '../components/Meta';
import Shell from '../components/Shell';

const SnippetPage = (props) => {
  const post = props.data.markdownRemark;

  return (
    <>
      <Meta 
        title={post.frontmatter.title}
        description={post.excerpt} 
      />
      <Shell>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
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
  }
`;
