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
    color: ${colors.linkcolor};
    text-decoration: underline;
    text-decoration-skip: ink;

    &:visited {
      color: ${colors.linkvisited};
    }
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
  const { node: post } = data.allContentfulBlogPost.edges[0];
  const { timeToRead, html } = post.blog.childMarkdownRemark;

  const { next, prev, slug } = pathContext;
  let keywords = '';
  if (post.tags !== null && post.tags.length > 0) {
    keywords = post.tags.reduce((x, y) => `${x}, ${y}`);
  }
  const tagurl = `https://www.tech47.in${slug}`;
  const tagimage =
    post.featuredImage != null
      ? `https:${post.featuredImage.resize.src}`
      : null;

  return (
    <div>
      <div className={blogTheme}>
        <Box css="margin: auto 16px auto 16px;">
          <Helmet>
            <title> {`Tech47 - ${post.title}`} </title>
            <meta name="description" content={post.description.description} />
            <meta name="Keywords" content={keywords} />
            <meta property="og:title" content={post.title} />
            <meta
              property="og:description"
              content={post.description.description}
            />
            <meta property="og:url" content={tagurl} />
            <meta property="og:image" content={tagimage} />
            <meta
              property="og:site_name"
              content="We build technology for social good"
            />
            <meta property="og:type" content="article" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={post.title} />
            <meta name="twitter:url" content={tagurl} />
            <meta
              name="twitter:description"
              content={post.description.description}
            />
            <meta name="twitter:image" content={tagimage} />
            <script>
              {`
                (function(w, d){
                 var id='embedly-platform', n = 'script';
                 if (!d.getElementById(id)){
                   w.embedly = w.embedly || function() {(w.embedly.q = w.embedly.q || []).push(arguments);};
                   var e = d.createElement(n); e.id = id; e.async=1;
                   e.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://cdn.embedly.com/widgets/platform.js';
                   var s = d.getElementsByTagName(n)[0];
                   s.parentNode.insertBefore(e, s);
                 }
                })(window, document);
              `}
            </script>
          </Helmet>
          <h1>{post.title}</h1>
          {post.author ? (
            <Styledp>Written by {post.author.name}</Styledp>
          ) : null}
          <Styledp>{timeToRead} min read &middot;</Styledp>
          {post.featuredImage ? (
            <Img
              alt={post.featuredImage.title}
              sizes={post.featuredImage.sizes}
            />
          ) : null}
          <div
            css="text-align: left;"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div css="display: flex; justify-content: center;">
            <Tags list={post.tags || []} />
          </div>
          <div css="display: flex; flex: flex-grow; align-items: center;">
            {prev && (
              <Link
                to={prev.slug}
                css="display: flex; flex-grow: 1; font-size: 0.8em;"
              >
                {feather('chevron-left', ['30', '30'], svgStyles)}
                {prev.title}
              </Link>
            )}
            {next && (
              <Link
                to={next.slug}
                css="display: flex; align-self: flex-end; font-size: 0.8em;"
              >
                {next.title}
                {feather('chevron-right', ['30', '30'], svgStyles)}
              </Link>
            )}
          </div>
          <div css="border-top: solid; border-width: thin; margin: 16px; padding: 16px;">
            <div css="display: flex; justify-content: left;">
              <Img
                css="border-radius: 100%;"
                alt={post.author.profilePicture.title}
                resolutions={post.author.profilePicture.resolutions}
              />
              <div css="display: flex; padding: 16px; flex-grow: 1; align-items: center;">
                <span>
                  <strong>
                    {post.author.name} {` `}
                  </strong>
                  <p> {post.author.authorBio} </p>
                </span>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export const contentfulPostQuery = graphql`
  query ContentfulPostByPath($slug: String!) {
    allContentfulBlogPost(filter: { slug: { eq: $slug } }) {
      edges {
        node {
          id
          title
          tags
          description {
            id
            description
          }
          createdAt
          blog {
            childMarkdownRemark {
              html
              timeToRead
            }
          }
          featuredImage {
            title
            resize(width: 1200, height: 630, cropFocus: FACES) {
              src
            }
            sizes(maxWidth: 800) {
              ...GatsbyContentfulSizes_noBase64
            }
          }
          author {
            name
            authorBio
            profilePicture {
              title
              resolutions(width: 125) {
                ...GatsbyContentfulResolutions
              }
            }
          }
        }
      }
    }
  }
`;

export default Template;
