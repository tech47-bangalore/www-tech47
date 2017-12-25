/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';
import { Box, Flex, ServiceCard, Logos } from '../components/Layout';
import colors from '../utils/colors';
import about from './images/idea.svg';
import serverless from './images/blackboard.svg';
import reactsvg from './images/space-ship.svg';
import media from '../utils/media';

const H1 = styled.h1`
  color: #fff;
  line-height: 1em;
  letter-spacing: 0.1em;
  font-size: 2em;
  ${media.mid`
    color: #fff;
    line-height: 1.3em;
    letter-spacing: 0.1em;
    font-size: 3em;
  `};
`;

const imgStyle = css`
  display: flex;
  flex-direction: column;
  margin: 0;
  ${media.mid`
    flex-direction: row;
  `};
  list-style: none;
`;

// Refer this post for the structure of gatsby-image https://github.com/gatsbyjs/gatsby/issues/2470
// based on this the css maps the div/img
const bgImageDiv = css`
  position: absolute;
  width: 100%;
  & div {
    height: 100vh;
    & div {
      & img {
        object-fit: cover !important;
        object-position: 50% 80% !important;
      }
    }
  }
`;

export default ({ data }) => {
  const { imageOne } = data;
  const myData = data.allContentJson.edges[0].node.index;
  const tagimage = `https://www.tech47.in${data.tagImage.resize.src}`;
  return (
    <div css={`background-color: ${colors.accent};`}>
      <Helmet>
        <title> {`Tech47 - Technology to power your startup`} </title>
        <meta
          name="description"
          content="Technology to power your startup, scalable and cost effective.
           The modern web on the cloud. ReactJs, Nodejs, GraphQL, AWS & more"
        />
        <meta
          name="Keywords"
          content="Technology, Modern Web, ReactJs, Nodejs, GraphQL, Reactjs, Fullstack, Cloud"
        />
        <meta
          property="og:title"
          content="Tech47 - Technology to power your startup"
        />
        <meta
          property="og:description"
          content="Technology to power your startup, scalable and cost effective.
           The modern web on the cloud. ReactJs, Nodejs, GraphQL, AWS & more"
        />
        <meta property="og:url" content="https://www.tech47.in" />
        <meta property="og:image" content={tagimage} />
        <meta
          property="og:site_name"
          content="Technology to power your startup"
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Tech47 - Technology to power your startup"
        />
        <meta name="twitter:url" content="https://www.tech47.in" />
        <meta
          name="twitter:description"
          content="Technology to power your startup, scalable and cost effective.
           The modern web on the cloud. ReactJs, Nodejs, GraphQL, AWS & more"
        />
        <meta name="twitter:image" content={tagimage} />
      </Helmet>
      <div className={bgImageDiv}>
        <Img sizes={imageOne.sizes} alt="AWS Cloud, Serverless, Reactjs" />
      </div>
      <Box>
        <H1>{myData.heading}</H1>
        <Flex>
          <ul className={imgStyle}>
            <li>
              <ServiceCard
                name="DEVELOPMENT"
                image={reactsvg}
                service="We build modern websites and apps on the cloud, using Reactjs, Nodejs, Expressjs, GraphQL and other modern web technologies"
                url="/development"
                urltext="More Info"
              />
            </li>
            <li>
              <ServiceCard
                name="CONSULTING"
                image={about}
                service="Architect your technology to save money. Scale seamlessly using JAMStack, micro services & AWS Cloud."
                url="/consulting"
                urltext="More Info"
              />
            </li>
            <li>
              <ServiceCard
                name="TRAINING"
                image={serverless}
                service="We can help teaching you ReactJs, NodeJs, MongoDb, GraphQL ..."
                url="/training"
                urltext="More Info"
              />
            </li>
          </ul>
        </Flex>
      </Box>
      <Box
        style={{
          paddingTop: '32px',
          paddingBottom: '32px',
          backgroundColor: '#02577a'
        }}
      >
        <h1>Technologies we love</h1>
        <Logos />
      </Box>
    </div>
  );
};

export const pageQuery = graphql`
  query contentQuery {
    allContentJson {
      edges {
        node {
          index {
            title
            subtitle
            heading
          }
        }
      }
    }
    imageOne: imageSharp(id: { regex: "/cloudseverywhere/" }) {
      sizes {
        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
        ...GatsbyImageSharpSizes
      }
    }
    tagImage: imageSharp(id: { regex: "/ogtech47/" }) {
      resize(width: 1200, height: 630, cropFocus: CENTER) {
        # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
        src
      }
    }
  }
`;
