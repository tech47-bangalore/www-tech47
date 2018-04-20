import { css } from 'react-emotion';

const sizes = {
  large: 1024,
  mid: 832,
  small: 640,
  VVHd: 1650,
  VHd: 1450,
  Hd: 1200,
  desktop: 1000,
  tablet: 750,
  phablet: 550,
  mobile: 360,
};

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label] / 16}em) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
