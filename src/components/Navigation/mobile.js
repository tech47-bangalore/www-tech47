import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import close from './x-circle.svg';

const deleteStyle = css`
  text-align: right;
`;

const navStyle = css`
  display: flex;
`;
// Brand Style
const logoClass = css`
  margin: auto;
`;

class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.mobileContainer = document.createElement('div');
    document.body.appendChild(this.mobileContainer);
  }

  componentWillUnmount() {
    document.body.removeChild(this.mobileContainer);
  }

  render() {
    return ReactDOM.createPortal(
      <nav className={this.props.mobileStyle}>
        <div
          onClick={this.props.toggleNav}
          onKeyPress={this.props.toggleNav}
          role="button"
          tabIndex="0"
        >
          <div className={navStyle}>
            <img
              className={logoClass}
              width={160}
              height={40}
              src={this.props.logo}
              alt="Tech47 Logo"
            />
            <span className={deleteStyle}>
              <img src={close} height="32px" width="32px" alt="close" />
            </span>
          </div>
        </div>
        {this.props.children}
      </nav>,
      this.mobileContainer
    );
  }
}

MobileNav.propTypes = {
  mobileStyle: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  logo: PropTypes.shape({
    srcSet: PropTypes.string.isRequired
  }).isRequired
};

export default MobileNav;
