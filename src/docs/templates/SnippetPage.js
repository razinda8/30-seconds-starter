import React from 'react';
import { graphql, Link } from 'gatsby';

import Meta from '../components/Meta';
import Shell from '../components/Shell';
import SnippetCard from '../components/SnippetCard';
import BackArrowIcon from '../components/SVGs/BackArrowIcon';

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
        <Link className="link-back" to="/"><BackArrowIcon />&nbsp;&nbsp;Back to Function</Link>
        <SnippetCard snippetData={{
          title: postData.title,
          html: post.html,
          code: postData.attributes.codeBlocks.code,
          tags: postData.attributes.tags
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
