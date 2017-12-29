import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import { Box, Flex, Tags } from '../components/Layout';
import colors from '../utils/colors';

const listStyle = css`
  list-style-type: none;
  margin: 0;
  margin-top: 1.5em;
  padding: 0;
`;

const tagStyle = css`
  margin: 8px;
  bottom: 0;
`;

const excerptStyle = css`
  & :after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 0;
    right: 0;
    width: 70%;
    height: 1.5em;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1) 50%
    );
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
    height: ${props => (props.image ? '4.5em' : 'auto')}; // Sets the div to
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
  }
  return null;
};

NavLink.propTypes = {
  test: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};
const StyledSpan = styled.span`
  color: ${colors.light};
  font-size: 0.65em;
`;

export default function TagsPage({ pathContext }) {
  const { posts, post, tag } = pathContext;
  if (tag) {
    return (
      <Box>
        <h3 css="margin-top: 1em;">
          {post.length} post{post.length === 1 ? '' : 's'} tagged with {tag}
        </h3>
        <ul className={listStyle}>
          <Flex>
            {post.map(({ id, title, tags, featuredImage, slug, blog }) => {
              const image = featuredImage ? featuredImage.resolutions : null;
              return (
                <li key={id}>
                  <BlogCard image={featuredImage}>
                    <Link to={slug}>
                      <h4>{title}</h4>
                      {image ? (
                        <Img alt={featuredImage.title} resolutions={image} />
                      ) : null}
                    </Link>
                    <StyledSpan>
                      {blog.childMarkdownRemark.timeToRead} min read &middot;
                    </StyledSpan>
                    <Link to={slug}>
                      <div className={excerptStyle}>
                        <p>{blog.childMarkdownRemark.excerpt}</p>
                      </div>
                    </Link>
                    <div className={tagStyle}>
                      <Tags list={tags || []} />
                    </div>
                  </BlogCard>
                </li>
              );
            })}
          </Flex>
        </ul>
        <Flex css="font-size: 0.8em; margin: 1em;">
          <Link to="/tags">All tags</Link>
        </Flex>
      </Box>
    );
  }
  return (
    <Box>
      <h4 css="margin: 1em;">Tags</h4>
      <Flex>
        <Flex css="max-width: 500px; flex-wrap: wrap;">
          {Object.keys(posts).map(tagName => <Tags list={[tagName] || []} />)}
        </Flex>
      </Flex>
      <Flex css="font-size: 0.8em; margin: 1em;">
        <Link to="/blog">All posts</Link>
      </Flex>
    </Box>
  );
}
TagsPage.propTypes = {
  pathContext: PropTypes.shape({
    // Remove prop validation for below object with custom prop validation which never returns error.
    posts: PropTypes.objectOf(() => {}).isRequired,

    post: PropTypes.arrayOf(
      PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        featuredImage: PropTypes.shape({
          resize: PropTypes.shape({
            src: PropTypes.string.isRequired
          }).isRequired,
          description: PropTypes.string.isRequired
        }).isRequired,
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    tag: PropTypes.string.isRequired
  }).isRequired
};
