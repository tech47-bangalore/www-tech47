/* eslint-disable */
import React from 'react';
import { css } from 'react-emotion';
import feather from 'feather-icons';

export default (name, measureArray, styles, outerstyles) => {
  const featherString = feather.toSvg(name, {
    class: styles,
    width: measureArray[0],
    height: measureArray[1]
  });
  return <div css={outerstyles} dangerouslySetInnerHTML={{ __html: featherString }} />;
};
