import React from 'react';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';

export default () => (
  <div css={`
         height : 100%; 
         margin-left: ${ rhythm(1) }; 
         margin-top: ${ rhythm(6) };
       `}
  >
    <h1>Page not found</h1>
  </div>
);
