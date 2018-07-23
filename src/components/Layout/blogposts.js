/* eslint-disable */
import React from 'react';
import { Link } from 'gatsby';
import { Box, Flex, Tags, MainPost } from '.';
import FaLongArrowRight from 'react-icons/lib/fa/long-arrow-right';
import Img from 'gatsby-image';
import colors from '../../utils/colors';
import styled, { css } from 'react-emotion';
import media from '../../utils/media';

const tagStyle = css`
  margin: 0px 16px 0px 0px;
  display: inline-block;
`;

const seemoreStyle = css`
  display: inline-block;
  font-size: 0.9em;
  color: ${colors.gray.copy};
  float: right;
  padding: 16px 0px;
  & a:hover {
    color: ${colors.gray.calm};
  }
`;

const dateStyle = css`
  font-size: 0.6em;
  color: ${colors.tech47date};
`;

const excerptStyle = css`
  font-size: 0.8em;
  color: ${colors.gray.calm};
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
  background-color: ${colors.tech47white};
  position: relative;
  width: 350px;
  height: 460px;
  margin: 8px 8px 8px 8px;
  ${media.tablet`
    margin: 8px 8px 8px 8px;
  `};
  ${media.desktop`
    margin: 8px 16px 8px 0px;
  `};
  overflow: hidden;
  text-align: left;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);
  -moz-box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);
  box-shadow: 2px 2px 5px 0px rgba(226,226,226,1);

  img,
  h4 {
    margin: auto;
  }

  .${excerptStyle} {
    position: relative;
    height: ${props => props.image ? '6em' : 'auto' }; // Sets the div to
    overflow: hidden;
  }

  .${tagStyle} {
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

const BlogPosts = ({ group, first, last, previousUrl, nextUrl }) => {
  return (
    <div css={`
          -ms-transform: translate(0px, -16vh);
          -webkit-transform: translate(0px, -16vh);
          transform: translate(0px, -16vh);
      `}
    >
      <div css={`
              display: flex;
              flex-wrap: wrap;
              justify-content: center;
              max-width: 732px;
            `}
      >

        {group
           .filter(post => post.node.featured == "featured")
           .map(({ node: post }, index) => {
             return (
               <MainPost key={post.id} post={post}/>
             )
           }
         )
        }

        {group
          .filter(post => post.node.title.length > 0 && post.node.featured != "featured")
          .map(({ node: post }, index) => {
            const image = post.featuredImage
              ? post.featuredImage.resolutions
              : null;
            return (
              <div key={post.id}>
              <BlogCard image={post.featuredImage ? true : false}>
                <Link to={post.slug}>
                  {image ?
                    <Img
                      alt={post.featuredImage.title}
                      resolutions={image}
                    /> : null }
                </Link>
                <div css="padding: 24px;">
                  <div>
                    <div className={tagStyle}>
                      <Tags list={post.tags || []} />
                    </div>
                    <span className={dateStyle}> {post.updatedAt} &middot; </span>
                    <StyledSpan>{post.blog.childMarkdownRemark.timeToRead} min read </StyledSpan>
                  </div>
                  <h3>
                    {post.title}
                  </h3>
                  <Link to={post.slug}>
                    <div className={excerptStyle}>
                      <span>{post.blog.childMarkdownRemark.excerpt}</span>
                    </div>
                  </Link>
                  <div className={seemoreStyle}>
                    <Link to={post.slug}>
                      <span css="padding: 16px;"> See More </span>
                      <FaLongArrowRight
                        css={css({
                          fontSize: `1em`,
                          color: `${colors.tech47pink}`,
                          "&:hover": {
                            color: `${colors.tech47purple}`,
                          },
                        })}
                      />
                    </Link>
                  </div>
                </div>
              </BlogCard>
              </div>
            );
          })}
        </div>
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
    </div>
  );
};

export default BlogPosts;
