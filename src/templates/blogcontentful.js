/* eslint-disable */
import React from 'react';
import Link from 'gatsby-link';
import Typist from 'react-typist';
import { Box, Flex, Tags, BlogPosts, SideBar } from '../components/Layout';
import FaHeart from 'react-icons/lib/fa/heart';
import styled, { css } from 'react-emotion';
import colors from '../utils/colors';
import Helmet from '../components/helmet';

const blogTheme = css`
  h1, h2, h3, h4, h5, h6 {
    color: ${colors.secondary}
  };
  p {
    color: ${colors.sixth}
  };
`;

const bgColor = css`
  width: 100%;
	height: 50vh;
	background: linear-gradient(${colors.tech47blue}, ${colors.tech47purple});
`;

const ContentfulBlogIndex = ({ data, location, pathContext }) => {
//  const { edges: posts } = data.allMarkdownRemark;
// The below objects are coming from gatsby-paginate
  const { group, index, first, last, pathPrefix } = pathContext;
  const previousUrl = index - 1 == 1 ? pathPrefix : pathPrefix + "/" + (index - 1).toString();
  const nextUrl = pathPrefix + "/" + (index + 1).toString();
  const cursor = {
    show: true,
    blink: true,
    element: '|',
    hideWhenDone: true,
    hideWhenDoneDelay: 1000,
  }
  return (
    <div>
      <div className={bgColor}>
        <div css={`
             padding-top: 17vh;
             display: flex;
             flex-wrap: wrap;
             justify-content: center;
             color: white;
             font-size: 1.2em;
          `}>
          <div css={`
                padding: 0px 32px;
            `}>
          <Typist cursor={cursor}>
            <span> We love to build the technology that powers your startup. </span>
            <Typist.Backspace count={58} delay={1000} />
            <span> We </span>
            <FaHeart
              css={css({
                cursor: `pointer`,
                fontSize: `1em`,
                color: `${colors.tech47pink}`,
                userSelect: `none`,
              })}
            />
            {' '}
            startups.
          </Typist>
          </div>
        </div>
      </div>
      <div className={blogTheme}>
        <Helmet
          title={"Tech47 - Technology to power your startup"}
          description={"We build modern websites, apps & progressive web apps"}
          image={data.imageOne ? data.imageOne.resize.src : null}
          pathname={location.pathname}
        />
      </div>
      <Flex css="max-width: 1024px; margin: 0 auto; align-content: center;">
        <BlogPosts group={group} first={first} last={last} previousUrl={previousUrl} nextUrl={nextUrl}/>
        <SideBar group={group} first={first} last={last} previousUrl={previousUrl} nextUrl={nextUrl}/>
      </Flex>
    </div>
  );
};

export const contentfulQuery = graphql`
  query ContentfulQuery {
    imageOne: imageSharp(id: { regex: "/cover/" }) {
      resize(width: 1200, height: 630, cropFocus: CENTER) {
        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
        src
      }
    }
  }
`;
/* eslint-enable */

export default ContentfulBlogIndex;
