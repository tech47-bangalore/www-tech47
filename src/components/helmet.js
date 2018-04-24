import React from 'react'
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet'
import coverImage from '../assets/images/cover.jpg';
import { siteMetadata } from '../../gatsby-config'

const rootUrl = siteMetadata.siteUrl

const Helmet = ({
  title,
  description,
  image,
  imageWidth,
  imageHeight,
  absoluteUrl,
  children,
}) => {

  let imageUrl = image ? `${rootUrl}${image}` : coverImage

  // Need the below check for absolute urls, e.g. contentful images.
  imageUrl = absoluteUrl ? image : imageUrl

  return (
    <ReactHelmet title={title} titleTemplate={`%s | ${siteMetadata.title}`}>
      {title && <meta property="og:site_name" content={title} />}
      {title && <meta property="og:title" content={title} />}
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta property="image" content={imageUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageWidth && <meta property="og:image:width" content={imageWidth} />}
      {imageHeight && <meta property="og:image:height" content={imageHeight} />}
      {children}
    </ReactHelmet>
  )
}

Helmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  imageWidth: PropTypes.string,
  imageHeight: PropTypes.string,
  absoluteUrl: PropTypes.string,
  children: PropTypes.element.isRequired,
};
Helmet.defaultProps = {
  title: null,
  description: null,
  image: null,
  imageWidth: null,
  imageHeight: null,
  absoluteUrl: null,
};

const RealHelmet = (props) => {
  const {
    title = siteMetadata.title,
    description = siteMetadata.description,
    image,
    absoluteUrl = false,
    pathname,
  } = props;

  return (
    <div>
      <Helmet
        title={title}
        description={description}
        image={image}
        absoluteUrl={absoluteUrl}
        imageWidth="1200"
        imageHeight="630"
      />
      <ReactHelmet>
        <meta property="og:url" content={`${rootUrl}${pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="" />
        <meta property="twitter:site" content="@" />
        <meta property="twitter:card" content="summary_large_image" />
      </ReactHelmet>
    </div>
  )
}

RealHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  absoluteUrl: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};
RealHelmet.defaultProps = {
  title: null,
  description: null,
  image: null,
  absoluteUrl: null,
};

export default RealHelmet;
