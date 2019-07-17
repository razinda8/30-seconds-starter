import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const getTextualContent = str => {
  const regex = /([\s\S]*?)<div class="gatsby-highlight"/g;
  const results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  return results[1];
};

const getCodeBlocks = str => {
  const regex = /<pre[.\S\s]*?<\/pre>/g;
  let results = [];
  let m = null;
  while ((m = regex.exec(str)) !== null) {
    if (m.index === regex.lastIndex)
      regex.lastIndex += 1;

    m.forEach((match, groupIndex) => {
      results.push(match);
    });
  }
  results = results.map(v => v.replace(/<pre class="language-js"><code class="language-js">([\s\S]*?)<\/code><\/pre>/g, '$1').trim());
  return {
    code: results[0],
    example: results[1]
  };
};

const SnippetCard = ({snippetData}) => {
  const [examplesOpen, setExamplesOpen] = React.useState(false);


  let cardContentHtml = `
    <h4 id=${snippetData.title}>${snippetData.title}</h4>
    ${getTextualContent(snippetData.html)}
  `;
  let cardCodeHtml = `${getCodeBlocks(snippetData.html).code}`;
  let cardExamplesHtml = `${getCodeBlocks(snippetData.html).example}`;

  return ( 
    <div className="card code-card">
      <div className="section card-content" 
        dangerouslySetInnerHTML={{__html: cardContentHtml}}
      />
      <div className="copy-button-container">
        <button className="copy-button" aria-label="Copy to clipboard" />
      </div>
      <pre className="section card-code language-js" 
        dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
      />
      <label className={examplesOpen? "collapse toggled" : "collapse"} onClick={() => setExamplesOpen(!examplesOpen)}>examples</label>
      <pre className="section card-examples language-js"
        dangerouslySetInnerHTML={{ __html: cardExamplesHtml }}
      />
    </div>
  );
};

export default SnippetCard;