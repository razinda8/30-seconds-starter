import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const MenuTagList = ({tagName, snippets, isOpen = false, searchQuery=''}) => {
  const [_isOpen, _setIsOpen] = React.useState(isOpen);

  let taggedSnippets = snippets.filter(v => v.attributes.tags[0] === tagName);
  let q = searchQuery.toLowerCase();

  let filteredSnippets = taggedSnippets.filter(v => v.attributes.tags.filter(t => t.indexOf(q) !== -1).length || v.title.toLowerCase().indexOf(q) !== -1);
  let filteredSnippetTitles = filteredSnippets.map(v => v.title);

  let __isOpen = (q === '' ? _isOpen : filteredSnippets.length !== 0 ? true : false);

  return (
    <>
      <h4 className={__isOpen ? "collapse toggled" : "collapse"} onClick={() => _setIsOpen(!_isOpen)}>{capitalize(tagName)}</h4>
      <ul>
        <li className="snippet-view-all"><Link to={`/tags/${tagName}`}>View all snippets</Link></li>
        {
          taggedSnippets.map(v => (
            <li style={{display: filteredSnippetTitles.includes(v.title) ? '' : 'none'}}>
              <Link tags={v.attributes.tags.join(',')} key={v.id} to={`/${v.id}`}>{v.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default MenuTagList;
