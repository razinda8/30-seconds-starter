import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";
import { CopyToClipboard } from 'react-copy-to-clipboard';

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

// Optimizes nodes in an HTML string
const optimizeNodes = (data, regexp, replacer) => {
  let count = 0;
  let output = data;
  do {
    output = output.replace(regexp, replacer);
    count = 0;
    while (regexp.exec(output) !== null)
      ++count;

  } while (count > 0);
  return output;
};

const optimizeAllNodes = (html) => {
  let output = html;
  // Optimize punctuation nodes
  output = optimizeNodes(
    output,
    /<span class="token punctuation">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token punctuation">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token punctuation">${p1}${p2}${p3}</span>`
  );
  // Optimize operator nodes
  output = optimizeNodes(
    output,
    /<span class="token operator">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token operator">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token operator">${p1}${p2}${p3}</span>`
  );
  // Optimize keyword nodes
  output = optimizeNodes(
    output,
    /<span class="token keyword">([^\0<]*?)<\/span>([\n\r\s]*)<span class="token keyword">([^\0]*?)<\/span>/gm,
    (match, p1, p2, p3) => `<span class="token keyword">${p1}${p2}${p3}</span>`
  );
  return output;
}

const CardCorner = ({ difficulty = 'intermediate' }) => (
  <div className={`corner ${difficulty}`} aria-label={difficulty} title={difficulty} />
);

const SnippetCard = ({snippetData}) => {
  const [examplesOpen, setExamplesOpen] = React.useState(false);

  let cardContentHtml = `
    <h4 id=${snippetData.title}>${snippetData.title}</h4>
    ${getTextualContent(snippetData.html)}
  `;
  let cardCodeHtml = `${optimizeAllNodes(getCodeBlocks(snippetData.html).code)}`;
  let cardExamplesHtml = `${optimizeAllNodes(getCodeBlocks(snippetData.html).example)}`;
  let difficulty = snippetData.tags.includes('advanced') ? 'advanced' : snippetData.tags.includes('beginner') ? 'beginner' : 'intermediate';

  return ( 
    <div className="card code-card">
      <CardCorner difficulty={difficulty} />
      <div className="section card-content" 
        dangerouslySetInnerHTML={{__html: cardContentHtml}}
      />
      <div className="copy-button-container">
        <CopyToClipboard 
          text={snippetData.code}
          onCopy={() => {
            let tst = document.createElement('div');
            tst.classList = 'toast';
            tst.innerHTML = 'Snippet copied to clipboard!';
            document.body.appendChild(tst);
            setTimeout(function () {
              tst.style.opacity = 0;
              setTimeout(function () {
                document.body.removeChild(tst);
              }, 300);
            }, 1700);
          }}
        >
          <button className="copy-button" aria-label="Copy to clipboard" />
        </CopyToClipboard>
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
