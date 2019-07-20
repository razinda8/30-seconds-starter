import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

const MenuTagList = ({tagName, snippets, isOpen = false}) => {
  const [_isOpen, _setIsOpen] = React.useState(isOpen);

  return (
    <>
      <h4 className={_isOpen ? "collapse toggled" : "collapse"} onClick={() => _setIsOpen(!_isOpen)}>{capitalize(tagName)}</h4>
      <ul>
        {
          snippets.filter(v => v.attributes.tags[0] === tagName).map(v => (
            <li>
              <Link tags={v.attributes.tags.join(',')} key={v.id} to={`/${v.id}`}>{v.title}</Link>
            </li>
          ))
        }
      </ul>
    </>
  );
}

export default MenuTagList;
