/* eslint-disable */
import React from 'react';
import { Link } from 'gatsby';
import { Box, Flex, Tags } from '.';
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
  font-size: 0.9em;
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
  max-width: 716px;
  height: auto;
  margin: 16px;
  ${media.tablet`
    margin: 8px 16px 8px 16px;
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
    height: ${props => props.image ? '4.5em' : 'auto' }; // Sets the div to
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

const MainPost = ({ post }) => {
  const image = post.featuredImage
    ? post.featuredImage.sizes
    : null;
  return (
    <div>
      <div css={`
              display: flex;
              flex-wrap: wrap;
              max-width: 732px;
            `}
      >
          <BlogCard image={post.featuredImage ? true : false}>
            <Link to={post.slug}>
              {image ?
                <Img
                  alt={post.featuredImage.title}
                  sizes={image}
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
    </div>
  );
};

export default MainPost;
