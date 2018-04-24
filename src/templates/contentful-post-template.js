/* eslint-disable no-undef, react/prop-types, react/no-danger */
import React from 'react';
import styled, { css } from 'react-emotion';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import ReactHelmet from 'react-helmet'
import { rhythm, scale } from '../utils/typography';
import { Box, Tags } from '../components/Layout';
import colors from '../utils/colors';
import presets from '../utils/presets';
import feather from '../utils/feather';
import EmailCaptureForm from "../components/Layout/email-capture-form"
import Helmet from '../components/helmet';

const blogTheme = css`
  margin-top: ${rhythm(4)};
  margin-bottom: ${rhythm(2)};
  ${presets.Mobile} {
     margin-right: ${rhythm(1 / 2)};
     margin-left: ${rhythm(1 / 2)};
  };
  ${presets.Tablet} {
     margin-right: auto;
     margin-left: auto;
  };
  max-width: 900px;
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

const prevNextLabelStyles = css`
  margin-top: 0;
  margin-bottom: 0;
  margin-left: ${rhythm(1)};
  margin-right: ${rhythm(1)};
  color: ${colors.gray.calm};
  font-weight: normal;
  ${scale(-0.5)};
  line-height: 1;
`;



const outerStyles = css`
  display: inline-block;
  vertical-align: middle;
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

const AuthorInfo = ({ post }) =>  (
   <div css={`
          border-top: solid; 
          border-width: thin; 
          margin: ${ rhythm(1) }; 
          padding: ${ rhythm(1) };
        `}
   >
      <div css={`
             display: flex; 
             ${presets.Mobile} {
               justify-content: center;
               flex-direction: column;
             };
             ${presets.Tablet} {
               justify-content: left;
               flex-direction: row;
             };
           `}
      >
        <Img
          css="border-radius: 100%;"
          alt={post.author.profilePicture.title}
          resolutions={post.author.profilePicture.resolutions}
        />
        <div css={`
               display: flex; 
               padding: ${ rhythm(1) }; 
               flex-grow: 1; 
               align-items: center;
               `}
        >
          <span>
            <strong>
              {post.author.name} {` `}
            </strong>
            <p> {post.author.authorBio} </p>
          </span>
        </div>
      </div>
   </div>
  );


const Template = ({ data, location, pathContext }) => {
  const { node: post } = data.allContentfulBlogPost.edges[0];
  const { timeToRead, html } = post.blog.childMarkdownRemark;

  const { next, prev, slug } = pathContext;
  let keywords = '';
  if (post.tags !== null && post.tags.length > 0) {
    keywords = post.tags.reduce((x, y) => `${x}, ${y}`);
  }

  return (
    <div>
        <Helmet
          title={`Tech47 - ${post.title}`}
          description={post.description.description}
          image={post.featuredImage ? post.featuredImage.resize.src : null}
          pathname={location.pathname}
        />
          <ReactHelmet>
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
          </ReactHelmet>
      <div className={blogTheme}>
        <Box>
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
          <div css="padding-bottom: 32px;" />
          <div
            css="text-align: left;"
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div css={`
                 display: flex; 
                 justify-content: center;
                 margin-bottom: ${ rhythm(1) }
               `}
          >
            <Tags list={post.tags || []} />
          </div>
          <EmailCaptureForm />
          <AuthorInfo post={post} />
          <div css="display: flex; width: 100%;">
            <div css="width: 50%; text-align: left;">
            {prev && (
              <span>
              <h4 className={prevNextLabelStyles}>Previous</h4>
              <Link
                to={prev.slug}
                css="width: 50%; text-align: left; font-size: 0.8em; font-weight: 700;"
              >
                {feather('chevron-left', ['30', '30'], svgStyles, outerStyles)}
                {prev.title}
              </Link>
              </span>
            )}
            </div>
            <div css="width: 50%; text-align: right;">
            {next && (
              <span>
              <h4 className={prevNextLabelStyles}>Next</h4>
              <Link
                to={next.slug}
                css="width: 50%; text-align: right; font-size: 0.8em; font-weight: 700;"
              >
                {next.title}
                {feather('chevron-right', ['30', '30'], svgStyles, outerStyles)}
              </Link>
              </span>
            )}
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
