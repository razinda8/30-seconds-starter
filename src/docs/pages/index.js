import React from "react";
import { Link } from "gatsby";

import Shell from "../components/Shell";
import Meta from "../components/Meta";

const IndexPage = () => (
  <Shell>
    <Meta title="Home" />
    <h2>Hi people</h2>
    <p>Welcome to your new 30 seconds site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
  </Shell>
)

export default IndexPage;
