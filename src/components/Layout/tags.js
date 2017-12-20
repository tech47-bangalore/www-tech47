import React from 'react';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import colors from '../../utils/colors';

const ulStyle = css`
  list-style: none;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  margin: auto;
`;

const linkStyle = css`
  margin: 2px;
  padding: 5px;
  border-style: solid;
  border-width: thin;
  background-color: ${colors.light};
  border-color: ${colors.light};
  font-size: 0.7em;
  a {
    color: ${colors.secondary};
  }
`;

const liStyle = css`
  margin-bottom: 0;
  :last-child {
    margin-bottom: 8px;
  }
`;

export default function Tags({ list = [] }) {
  return (
    <ul className={ulStyle}>
      {list.map(tag => (
        <li key={tag} className={liStyle}>
          <Link className={linkStyle} to={`/tags/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
Tags.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired
};
