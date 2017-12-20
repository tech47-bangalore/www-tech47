import React from 'react';
import styled, { css } from 'react-emotion';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import colors from '../../utils/colors';
import feather from '../../utils/feather';
import media from '../../utils/media';

const footerStyle = css`
  overflow: hidden;
  background-color: ${colors.third};
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
    color: ${colors.light};
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
    <div className={box}>
      <Flex>
        <div className={box1}>
          <Wrapper>
            <div
              css={`
                @media (min-width: 1200px) {
                float: left;
              }`}
            >
              <h3>{props.title}</h3>
            </div>
          </Wrapper>
        </div>
        <div className={box1}>
          <Wrapper>
            <ul className={ulStyle}>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </Wrapper>
        </div>
        <div className={box1}>
          <Wrapper>
            <ul className={socialList}>
              <li>
                <a
                  title="Link to our Facebook page"
                  href={props.facebook}
                  target="_blank"
                  rel="noopener"
                >
                  {feather('facebook', ['30', '30'], svgStyles)}
                </a>
              </li>
              <li>
                <a
                  title="Link to our Twitter account"
                  href={props.twitter}
                  target="_blank"
                  rel="noopener"
                >
                  {feather('twitter', ['30', '30'], svgStyles)}
                </a>
              </li>
              <li>
                <a
                  title="Link to out Instragram account"
                  href={props.instagram}
                  target="_blank"
                  rel="noopener"
                >
                  {feather('instagram', ['30', '30'], svgStyles)}
                </a>
              </li>
              <li>
                <a title="Our E-Mail address" href={`mailto:${props.email}`}>
                  {feather('mail', ['30', '30'], svgStyles)}
                </a>
              </li>
            </ul>
          </Wrapper>
        </div>
      </Flex>
    </div>
    <div
      css={`
           ${box};
           text-align: center;
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
             margin: auto;
             opacity: 0.5;
           }
           `}
    >
      <p>{`Copyright © 2017 ${props.title}. All rights reserved.`}</p>
    </div>
  </div>
);

Footer.propTypes = {
  title: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  instagram: PropTypes.string,
  email: PropTypes.string
};

Footer.defaultProps = {
  title: 'Tech47',
  facebook: 'https://www.facebook.com/jaikant.kumaran',
  twitter: 'https://twitter.com/jaikantkumaran',
  instagram: 'https://www.instagram.com/jaikanth77/',
  email: 'jaikant@gmail.com'
};

export default Footer;
