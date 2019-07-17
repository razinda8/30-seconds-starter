import React from "react"

import Shell from "../components/Shell";
import Meta from "../components/Meta";

const NotFoundPage = () => (
  <>
    <Meta title="404: Not found" />
    <Shell>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Shell>
  </>
);

export default NotFoundPage;
