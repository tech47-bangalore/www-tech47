import React from 'react';
import { css } from 'react-emotion';
import typography from '../utils/typography';
import Layout from '../layouts';

const { rhythm } = typography

export default ({location}) => (
  <Layout location={location}>
    <div css={`
           height : 100%;
           margin-left: ${ rhythm(1) };
           margin-top: ${ rhythm(6) };
         `}
    >
      <h1>Page not found</h1>
    </div>
  </Layout>
);
