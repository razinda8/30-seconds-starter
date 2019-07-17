import React from "react";

import Shell from "../components/Shell";
import Meta from "../components/Meta";

const IndexPage = (props) => {
  const post = props.data.snippetDataJson.data;

  console.log(post);

  return (
    <>
      <Meta title="Home" />
      <Shell>
        <h2>Hi people</h2>
        <p>Welcome to your new 30 seconds site.</p>
        <p>Now go build something great.</p>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      </Shell>
    </>
  );
}

export default IndexPage;

export const indexPageQuery = graphql`
  query snippetList {
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
