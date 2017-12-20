/* eslint-disable no-undef, react/prop-types */
import React from 'react';
import styled, { css } from 'react-emotion';
import Img from 'gatsby-image';
import { Box, Flex, ServiceCard, Logos } from '../components/Layout';
import colors from '../utils/colors';
import about from './images/cloud.svg';
import serverless from './images/react-router.svg';
import reactsvg from './images/reacttransparent.svg';
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
  return (
    <div css={`background-color: ${colors.accent};`}>
      <div className={bgImageDiv}>
        <Img sizes={imageOne.sizes} alt="AWS Cloud, Serverless, Reactjs" />
      </div>
      <Box>
        <H1>{myData.heading}</H1>
        <Flex>
          <ul className={imgStyle}>
            <li>
              <ServiceCard
                name="Full stack"
                image={reactsvg}
                service="We build full stack apps on the cloud, using Reactjs, Nodejs, Expressjs, GraphQL and other modern web technologies"
                url="/fullstack"
                urltext="React & Fullstack JS"
              />
            </li>
            <li>
              <ServiceCard
                name="AWS CLOUD"
                image={about}
                service="Architect your cloud to save money and scale. AWS has it all, but selecting the right technologies is key for saving long term cost and scaling."
                url="/aws"
                urltext="More Info on AWS Cloud"
              />
            </li>
            <li>
              <ServiceCard
                name="SERVERLESS"
                image={serverless}
                service="Serverless technologies, not only provide massive ability to scale but can also save costs during the initial phase"
                url="/serverless"
                urltext="More Info on Serverless"
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
        ...GatsbyImageSharpSizes_withWebp
      }
    }
  }
`;
