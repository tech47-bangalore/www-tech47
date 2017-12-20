import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import colors from '../../utils/colors';
import close from './x-circle.svg';

// Brand Style
const brandStyle = css`
  color: ${colors.third};
  font-size: 1.5em;
  margin: auto;
  text-align: center;
`;

const deleteStyle = css`
  text-align: right;
`;

const navStyle = css`
  display: flex;
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
            <h1 className={brandStyle}> {this.props.title} </h1>
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
  title: PropTypes.string.isRequired
};

export default MobileNav;
