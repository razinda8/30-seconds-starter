import React from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { getTextualContent, getCodeBlocks, optimizeAllNodes } from '../util';

const SnippetCard = ({short, snippetData, ...rest}) =>  {
  let difficulty = snippetData.tags.includes('advanced') ? 'advanced' : snippetData.tags.includes('beginner') ? 'beginner' : 'intermediate';
  return short ? (
    <ShortCard snippetData={snippetData} difficulty={difficulty} {...rest} />
  ) : (
    <FullCard snippetData={snippetData} difficulty={difficulty} {...rest} />
  );
}

const CardCorner = ({ difficulty = 'intermediate' }) => (
  <div className={`card-corner ${difficulty}`} aria-label={difficulty} title={difficulty} />
);

const FullCard = ({ snippetData, difficulty }) => (
  <div className="card">
    <CardCorner difficulty={difficulty} />
    <h4 className="card-title">{snippetData.title}</h4>
  </div>
);

const ShortCard = ({ snippetData, difficulty }) => (
  <div className="card">
    <CardCorner difficulty={difficulty} />
    <h4 className="card-title">{snippetData.title}</h4>
    <p className="card-description" dangerouslySetInnerHTML={{ __html: `${getTextualContent(snippetData.html)}` }} />
  </div>
);



// const SnippetCard = ({snippetData}) => {
//   const [examplesOpen, setExamplesOpen] = React.useState(false);

//   let cardContentHtml = `
//     <h4 id=${snippetData.title}>${snippetData.title}</h4>
//     ${getTextualContent(snippetData.html)}
//   `;
//   let cardCodeHtml = `${optimizeAllNodes(getCodeBlocks(snippetData.html).code)}`;
//   let cardExamplesHtml = `${optimizeAllNodes(getCodeBlocks(snippetData.html).example)}`;
//   let difficulty = snippetData.tags.includes('advanced') ? 'advanced' : snippetData.tags.includes('beginner') ? 'beginner' : 'intermediate';

//   return ( 
//     <div className="card code-card">
//       <CardCorner difficulty={difficulty} />
//       <div className="section card-content" 
//         dangerouslySetInnerHTML={{__html: cardContentHtml}}
//       />
//       <div className="copy-button-container">
//         <CopyToClipboard 
//           text={snippetData.code}
//           onCopy={() => {
//             let tst = document.createElement('div');
//             tst.classList = 'toast';
//             tst.innerHTML = 'Snippet copied to clipboard!';
//             document.body.appendChild(tst);
//             setTimeout(function () {
//               tst.style.opacity = 0;
//               setTimeout(function () {
//                 document.body.removeChild(tst);
//               }, 300);
//             }, 1700);
//           }}
//         >
//           <button className="copy-button" aria-label="Copy to clipboard" />
//         </CopyToClipboard>
//       </div>
//       <pre className="section card-code language-js" 
//         dangerouslySetInnerHTML={{ __html: cardCodeHtml }}
//       />
//       <label className={examplesOpen? "collapse toggled" : "collapse"} onClick={() => setExamplesOpen(!examplesOpen)}>examples</label>
//       <pre className="section card-examples language-js"
//         dangerouslySetInnerHTML={{ __html: cardExamplesHtml }}
//       />
//     </div>
//   );
// };

export default SnippetCard;
