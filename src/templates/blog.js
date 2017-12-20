/* eslint-disable */
import React from 'react';
import Link from 'gatsby-link';
import { Box, Flex, Tags } from '../components/Layout';
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

const BlogIndex = ({ data, pathContext }) => {
  const { edges: posts } = data.allMarkdownRemark;
// The below objects are coming from gatsby-paginate
  const { group, index, first, last, pathPrefix } = pathContext;
  const previousUrl = index - 1 == 1 ? pathPrefix : pathPrefix + "/" + (index - 1).toString();
  const nextUrl = pathPrefix + "/" + (index + 1).toString();
  return (
    <Box className={blogTheme}>
      <ul className={listStyle}>
        <Box>
          <h2> People, Technology, Change  </h2>
          <Flex>
            {group
              .filter(post => post.node.frontmatter.title.length > 0)
              .map(({ node: post }, index) => {
                const image = post.frontmatter.image
                  ? post.frontmatter.image.childImageSharp.resize.src
                  : null;
                return (
                  <li key={post.id}>
                  <BlogCard image={post.frontmatter.image ? true : false}>
                    <Link to={post.fields.slug}>
                      {image ? <img src={image} alt={post.frontmatter.imgdesc} /> : null}
                      <h4>
                        {post.frontmatter.title}
                      </h4>
                      <StyledSpan>{post.timeToRead} min read &middot;</StyledSpan>
                    </Link>
                    <Link to={post.fields.slug}>
                      <div className={excerptStyle}>
                        <p>{post.excerpt}</p>
                      </div>
                    </Link>
                    <div className={tagStyle}>
                      <Tags list={post.frontmatter.tags || []} />
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
  );
};

export const homeQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 300)
          timeToRead
          id
          frontmatter {
            title
            tags
            date(formatString: "MMMM DD, YYYY")
            imgdesc
            image {
              childImageSharp {
                resize(width: 300, height: 200, cropFocus: ENTROPY) {
                  src
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
/* eslint-enable */

export default BlogIndex;
