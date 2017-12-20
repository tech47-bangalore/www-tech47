/* eslint-disable no-undef, react/prop-types, react/no-danger */
import React from 'react';
import styled, { css } from 'react-emotion';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import { Box, Tags } from '../components/Layout';
import colors from '../utils/colors';
import feather from '../utils/feather';

const blogTheme = css`
  max-width: 900px;
  margin: 4.5rem auto 4.5rem auto;
  p {
    color: ${colors.sixth};
  }
  a {
    color: ${colors.primary};
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

const Styledp = styled.p`
  margin: 0;
  font-size: 0.8em;
  color: ${colors.light};
`;

const Template = ({ data, pathContext }) => {
  const { markdownRemark: post } = data;
  const { next, prev } = pathContext;
  return (
    <div className={blogTheme}>
      <Box css="margin: auto 16px auto 16px;">
        <Helmet title={`Tech47 - ${post.frontmatter.title}`} />
        <h1>{post.frontmatter.title}</h1>
        <Styledp>Written by {post.frontmatter.author.id}</Styledp>
        <Styledp>{post.timeToRead} min read &middot;</Styledp>
        <div
          css="text-align: left;"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <div css="display: flex; justify-content: center;">
          <Tags list={post.frontmatter.tags || []} />
        </div>
        <div css="display: flex; flex: flex-grow; align-items: center;">
          {prev && (
            <Link
              to={prev.fields.slug}
              css="display: flex; flex-grow: 1; font-size: 0.8em;"
            >
              {feather('chevron-left', ['30', '30'], svgStyles)}
              {prev.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link
              to={next.fields.slug}
              css="display: flex; align-self: flex-end; font-size: 0.8em;"
            >
              {next.frontmatter.title}
              {feather('chevron-right', ['30', '30'], svgStyles)}
            </Link>
          )}
        </div>
        <div css="border-top: solid; border-width: thin; margin: 16px; padding: 16px;">
          {data.allAuthorsYaml.edges.map((author, index) => {
            if (author.node.id === post.frontmatter.author.id) {
              return (
                <div css="display: flex; justify-content: left;">
                  <Img
                    css="border-radius: 100%;"
                    resolutions={author.node.avatar.childImageSharp.resolutions}
                    key={author.node.id}
                  />
                  <div css="display: flex; padding: 16px; flex-grow: 1; align-items: center;">
                    <span>
                      <strong>
                        {author.node.id} {` `}
                      </strong>
                      <p> {author.node.bio} </p>
                    </span>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </Box>
    </div>
  );
};

export const pageQuery = graphql`
  query BlogPostByPath($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      tableOfContents
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        tags
        author {
          id
        }
      }
    }
    allAuthorsYaml {
      edges {
        node {
          id
          bio
          avatar {
            id
            childImageSharp {
              resolutions(width: 125, height: 125, cropFocus: CENTER) {
                ...GatsbyImageSharpResolutions
              }
            }
          }
        }
      }
    }
  }
`;

export default Template;
