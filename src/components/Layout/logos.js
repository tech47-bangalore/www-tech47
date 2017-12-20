import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import serverless from './images/serverless.svg';
import android from './images/android.svg';
import node from './images/nodejs.svg';
import react from './images/react.svg';
import aws from './images/aws-logo.svg';
import apple from './images/apple-ios.svg';
import graphql from './images/graphql.svg';

const logos = [
  { image: serverless, title: 'Serverless' },
  { image: react, title: 'Reactjs' },
  { image: node, title: 'nodejs' },
  { image: aws, title: 'AWS' },
  { image: graphql, title: 'GraphQL' },
  { image: android, title: 'Android' },
  { image: apple, title: 'iOS' }
];

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const TechImage = ({ image, name }) => (
  <div css="margin: 20px; background-color: white; display: inline-block;">
    <img
      css="margin: 16px;"
      src={image}
      height="100"
      width="100"
      alt="serverless"
    />
    <div css="padding: 8px; border-top: 1px solid #ebeef1;">
      <p css="margin: 0; color: #737b87;">{name}</p>
    </div>
  </div>
);
TechImage.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const Logos = () => (
  <Flex>
    <div css="flex-wrap: nowrap; flex-direction: row;">
      {logos.map(img => (
        <TechImage key={img.title} image={img.image} name={img.title} />
      ))}
    </div>
  </Flex>
);

export default Logos;
