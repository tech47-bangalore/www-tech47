import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import colors from '../../utils/colors';

const ulStyle = css`
  list-style: none;
  display: inline-flex;
  justify-content: space-evenly;
  align-items: flex-start; // This is needed if it is flex-end and two tags it will misalign in the end
  align-content: flex-start;
  flex-wrap: wrap;
  margin: auto;
`;

const linkStyle = css`
  font-size: 0.8em;
  margin: 0.8em;
  color: ${colors.tech47category};
  &:hover {
      color: ${colors.tech47categoryhover};
  };
`;

const liStyle = css`
  margin-bottom: 0;
  flex-grow: 1;
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
