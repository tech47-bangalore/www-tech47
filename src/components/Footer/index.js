import React from 'react';
import styled, { css } from 'react-emotion';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import feather from '../../utils/feather';
import media from '../../utils/media';

const footerStyle = css`
  overflow: hidden;
  background-color: ${colors.tech47blue};
  color: ${colors.light};
  text-align: center;
  opacity: 0.99; // We need this for iPad pro when bg pictures starts covering footer.

  & img {
    display: block;
    margin: 0;
  }
  & a,
  p,
  h3 {
    color: ${colors.tech47date};
  }
`;

const ulStyle = css`
  list-style-type: none;
  margin: 0;
  margin-bottom: 1.45rem;
  text-transform: uppercase;
  padding: 0;
  & a {
    cursor: pointer;
    transition: opacity 0.15s ease-in;
    transition: color 0.15s ease-in;
    text-shadow: none;
    background-image: none;

    &:hover {
      text-decoration: none;
      box-shadow: none;
      opacity: 1;
      transition: opacity 0.15s ease-in;
    }
  }
  & li {
    margin: 0;
  }
`;

const socialList = css`
  display: flex;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;

  ${media.large`
    width: 50%;
    margin: auto;
  `};

  @media (min-width: 1200px) {
    float: right;
  }
`;

const svgStyles = css`
  opacity: 0.5;
  transition: opacity 0.15s ease-in;
  transition: color 0.15s ease-in;

  &:hover {
    text-decoration: none;
    box-shadow: none;
    opacity: 1;
    transition: opacity 0.15s ease-in;
  }
`;

const box = css`
  ${footerStyle};
  padding: 32px;
`;

const box1 = css`
  ${box};
  padding: 0px;
  text-align: center;
  @media (min-width: 300px) {
    width: 100%;
  }
  @media (min-width: 600px) {
    width: 100%;
  }
  @media (min-width: 1200px) {
    width: 33%;
  }
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  @media (min-width: 300px) {
    flex-wrap: wrap;
  }
  @media (min-width: 600px) {
    flex-wrap: wrap;
  }
  @media (min-width: 1200px) {
    flex-wrap: nowrap;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  margin: 0;
  & p {
    margin: 0;
    margin-bottom: 1.45rem;
  }
`;

const Footer = props => (
  <div>
    <div
      css={`
           ${box};
           text-align: left;
           @media (min-width: 300px) {
             padding: 8px 0px;
           }
           @media (min-width: 600px) {
             padding: 32px 0px;
           }
           @media (min-width: 1200px) {
             padding: 32px 0px;
           }
           & p {
             ${media.mobile`
               text-align: center;
               margin: 32px;
             `};
             ${media.tablet`
               text-align: left;
               margin: 0px 16px;
             `};
           }
           `}
    >
      <p>{`Copyright © 2018 ${props.title}.`}</p>
    </div>
  </div>
);

Footer.propTypes = {
  title: PropTypes.string,
};

Footer.defaultProps = {
  title: 'Tech47',
};

export default Footer;
