import React from 'react';
import { css } from 'react-emotion';
import colors from '../utils/colors';
import typography from '../utils/typography';
import Layout from '../layouts';

const { rhythm } = typography


export default ({ location }) => (
  <Layout location={location}>
    <div css={`
           height : 100%;
           margin-left: ${ rhythm(1) };
           margin-top: ${ rhythm(6) };
           color: ${colors.tech47purple};
         `}
    >
      <h4 style={{color: `${colors.tech47pink}`}}> Thanks for your message! </h4>
    </div>
  </Layout>
);
