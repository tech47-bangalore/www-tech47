import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import Link from 'gatsby-link';
import colors from '../../utils/colors';
import ButtonPrimary from '../../components/Buttons';

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const hoverStyle = css`
  display: none;
  position: absolute;
  width: 320px;
  height: 320px;
  position: relative;
  text-align: center;
  vertical-align: middle;
  color: ${colors.fifth};
  z-index: 8;
  background-color: ${colors.primary};
  opacity: 0.9;
`;

// This wrapper gives the nice looking border of the same color as the background
const wrapperOne = css`
  padding: 8px;
  background-color: ${colors.third};
  opacity: 0.9;
  margin: 8px;
`;

// This wrapper defines the fixed width and height and the hover property.
const wrapperTwo = css`
  height: 320px;
  width: 320px;

  &:hover {
    & .${hoverStyle} {
      display: table;
    }
  }
`;

// Inside this div the content sits, the height and width of this is equal to wrapperTwo
// The position and display styles, helps the content within this align
const contentBox = css`
  position: absolute;
  display: block;
  width: 320px;
  height: 320px;
`;

// This is the image wrapper. It is fixed height of 250px. The fixed height prevents the bottom h3 tag from
// coming up. The padding of 8px pushes the image down by 8px creating some space on top.
const imgWrapper = css`
  display: block;
  height: 250px;
  padding: 8px;
`;

const ServiceCard = ({ name, image, service, urltext, url }) => (
  <div className={wrapperOne}>
    <div className={wrapperTwo}>
      <div className={contentBox}>
        <div className={imgWrapper}>
          <img src={image} height="200" width="200" alt="Logo" />
        </div>
        <div
          css={`width: 100%; background-color: ${colors.primary}; position: absolute;`}
        >
          <h3
            css={`display: block; margin-top: 0; padding: 15px; color: ${colors.fifth};`}
          >
            {name}
          </h3>
        </div>
      </div>
      <div className={hoverStyle}>
        <div css="display: table-cell; vertical-align: middle">
          <Flex>
            <p css="padding: 8px;"> {service} </p>
            <Link to={url}>
              <ButtonPrimary>{urltext}</ButtonPrimary>
            </Link>
          </Flex>
        </div>
      </div>
    </div>
  </div>
);
ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  service: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  urltext: PropTypes.string.isRequired
};

export default ServiceCard;
