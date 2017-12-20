import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Link from 'gatsby-link';
import { Box, Flex, Tags } from '../components/Layout';
import colors from '../utils/colors';

const listStyle = css`
  list-style-type: none;
  margin: 0;
  margin-top: 1.5em;
  padding: 0;
`;

const blogTheme = css`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.secondary};
  }
  p {
    color: ${colors.sixth};
  }
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
  height: 400px;
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
            {post.map(({ id, frontmatter, excerpt, fields }) => {
              const image = frontmatter.image
                ? frontmatter.image.childImageSharp.resize.src
                : null;
              return (
                <li key={id}>
                  <BlogCard image={frontmatter.image}>
                    <h4>
                      <Link to={fields.slug}>{frontmatter.title}</Link>
                    </h4>
                    {image ? (
                      <img src={image} alt={frontmatter.imgdesc} />
                    ) : null}
                    <Link to={fields.slug}>
                      <div className={excerptStyle}>
                        <p>{excerpt}</p>
                      </div>
                    </Link>
                    <div className={tagStyle}>
                      <Tags list={frontmatter.tags || []} />
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
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired
        }).isRequired,
        frontmatter: PropTypes.shape({
          tags: PropTypes.arrayOf(PropTypes.string).isRequired,
          title: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    tag: PropTypes.string.isRequired
  }).isRequired
};
