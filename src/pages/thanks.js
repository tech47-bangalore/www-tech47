import React from 'react';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';
import colors from '../utils/colors';

export default () => (
  <div css={`
         height : 100%; 
         margin-left: ${ rhythm(1) }; 
         margin-top: ${ rhythm(6) };
         color: ${colors.tech47purple};
       `}
  >
    <h4 style={{color: `${colors.tech47pink}`}}> Thanks for your message! </h4>
  </div>
);
