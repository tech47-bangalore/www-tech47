/* eslint-disable */
import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import { Box, Flex, Tags } from '../components/Layout';
import Img from 'gatsby-image';
import colors from '../utils/colors';
import styled, { css } from 'react-emotion';

const listStyle = css`
  list-style-type: none;
  margin: 0;
  margin-top: 1.5em;
  padding: 0;
`;

const blogTheme = css`
  h1, h2, h3, h4, h5, h6 {
    color: ${colors.secondary}
  };
  p {
    color: ${colors.sixth}
  };
`;

const tagStyle = css`
  margin: 8px;
  bottom: 0;
`;

const excerptStyle = css`
  & :after {
    content: "";
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 70%;
    height: 1.5em;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 50%);
  }
`;

const BlogCard = styled.div`
  position: relative;
  width: 300px;
  height: 440px;
  margin: 16px;
  padding 16px;
  overflow: hidden;
  text-align: left;
  border-style: solid;
  border-width: thin;
  border-color: ${colors.light}

  img,
  h4 {
    margin: auto;
  }

  .${excerptStyle} {
    position: relative;
    height: ${props => props.image ? '4.5em' : 'auto' }; // Sets the div to
    overflow: hidden;
  }

  .${tagStyle} {
    position: absolute;
    height: auto;
  }
`;

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return null;
  }
};
const StyledSpan = styled.span`
  color: ${colors.light};
  font-size: 0.65em;
`;

const ContentfulBlogIndex = ({ data, pathContext }) => {
//  const { edges: posts } = data.allMarkdownRemark;
// The below objects are coming from gatsby-paginate
  const { group, index, first, last, pathPrefix } = pathContext;
  const previousUrl = index - 1 == 1 ? pathPrefix : pathPrefix + "/" + (index - 1).toString();
  const nextUrl = pathPrefix + "/" + (index + 1).toString();
  const tagurl = first ? `https://www.tech47.in${pathPrefix}` :
    `https://www.tech47.in${pathPrefix}/${index.toString}`;
  const tagimage = `https://www.tech47.in${data.imageOne.resize.src}`;
  return (
    <div>
      <Box className={blogTheme}>
        <Helmet>
          <title> {`Tech47 - Blogs`} </title>
          <meta
            name="description"
            content="Technology blogs on tech47, covering a varied topics
             from modern web to using technology for social good."
          />
          <meta name="Keywords" content={"Technology, Modern Web, Social Good, Reactjs, Fullstack, Cloud"} />
          <meta property="og:title" content="Tech47 - Blogs" />
          <meta
            property="og:description"
            content="Technology blogs on tech47, covering a varied topics
             from modern web to using technology for social good."
          />
          <meta property="og:url" content={tagurl} />
          <meta property="og:image" content={tagimage} />
          <meta
            property="og:site_name"
            content="We build technology for social good"
          />
          <meta property="og:type" content="article" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Tech47 - Blogs" />
          <meta name="twitter:url" content={tagurl} />
          <meta
            name="twitter:description"
            content="Technology blogs on tech47, covering a varied topics
             from modern web to using technology for social good."
          />
          <meta name="twitter:image" content={tagimage} />
        </Helmet>
        <ul className={listStyle}>
          <Box>
            <h2> People, Technology, Change  </h2>
            <Flex>
              {group
                .filter(post => post.node.title.length > 0)
                .map(({ node: post }, index) => {
                  const image = post.featuredImage
                    ? post.featuredImage.resolutions
                    : null;
                  return (
                    <li key={post.id}>
                    <BlogCard image={post.featuredImage ? true : false}>
                      <Link to={post.slug}>
                        {image ?
                          <Img
                            alt={post.featuredImage.title}
                            resolutions={image}
                          /> : null }
                        <h4>
                          {post.title}
                        </h4>
                        <StyledSpan>{post.blog.childMarkdownRemark.timeToRead} min read &middot;</StyledSpan>
                      </Link>
                      <Link to={post.slug}>
                        <div className={excerptStyle}>
                          <span>{post.blog.childMarkdownRemark.excerpt}</span>
                        </div>
                      </Link>
                      <div className={tagStyle}>
                        <Tags list={post.tags || []} />
                      </div>
                    </BlogCard>
                    </li>
                  );
                })}
              </Flex>
          </Box>
        </ul>
        <div css="display: flex; justify-content: center;">
          <div css="flex-grow: 1; display: flex; font-size: 0.8em; margin: 16px; max-width: 900px;">
            <div css="flex-grow: 1; display: flex; justify-content: left;">
              <NavLink test={first} url={previousUrl} text="Previous Page" />
            </div>
            <div css="display: flex; justify-content: right;">
              <NavLink test={last} url={nextUrl} text="Next Page" />
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export const contentfulQuery = graphql`
  query ContentfulQuery {
    imageOne: imageSharp(id: { regex: "/ogtech47/" }) {
      resize(width: 1200, height: 630, cropFocus: CENTER) {
        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
        src
      }
    }
  }
`;
/* eslint-enable */

export default ContentfulBlogIndex;
