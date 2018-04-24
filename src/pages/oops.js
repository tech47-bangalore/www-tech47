import React from 'react';
import { css } from 'react-emotion';
import { rhythm } from '../utils/typography';
import colors from '../utils/colors';

export default () => (
  <div css={`
         height : 100%; 
         margin-left: ${ rhythm(1) }; 
         margin-top: ${ rhythm(6) };
       `}
  >
    <h4 style={{color: `${colors.gray.calm}`}}> There was a problem! </h4>
    <br />
    <h4 style={{color: `${colors.gray.copy}`}}> Could you email us at jai@sherpafeet.com </h4>
  </div>
);
