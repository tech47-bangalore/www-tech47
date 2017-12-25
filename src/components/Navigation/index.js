import React, { Component } from 'react';
import Link from 'gatsby-link';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';
import feather from '../../utils/feather';
import colors from '../../utils/colors';
import MobileNav from './mobile';
import media from '../../utils/media';
import { Box } from '../../components/Layout';
import menusvg from './align-right.svg';

const svgStyles = css`
  opacity: 0.5;
  transition: opacity 0.15s ease-in;
  transition: color 0.15s ease-in;

  &:hover {
    text-decoration: none;
    box-shadow: none;
    opacity: 1;
    transition: opacity 0.15s ease-in;
  }
`;

const menuConfig = [
  {
    title: feather('github', ['30', '30'], svgStyles),
    url: '',
    href: 'https://github.com/Jaikant/tech47',
    submenu: false
  },
  {
    title: 'SERVICES',
    url: [
      { title: 'Serverless Apps', url: '/serverless' },
      { title: 'Fullstack', url: '/fullstack' },
      { title: 'AWS Cloud', url: '/aws' }
    ],
    submenu: true
  },
  { title: 'BLOG', url: '/blog', submenu: false },
  {
    title: 'ABOUT',
    url: [
      { title: 'About Us', url: '/about' },
      { title: 'Contact', url: '/contact' }
    ],
    submenu: true
  }
];

// In this file we have tried to place the styles as close as possible to the components
// There is one stateful component and the remainining stateless.
// The Navigation component is broken into Desktop and Mobile parts.
// Within this the navigation, brand, menu and menuitems are split.
// It is great to see the css along with the JS and JSX!

const MItmblStyle = css`
  margin-top: 2rem;
  text-transform: uppercase;
`;
const MItmbl = ({ to, href, toggleNav, children, key }) => (
  <li className={MItmblStyle}>
    <div
      key={key}
      onClick={toggleNav}
      role="button"
      tabIndex="0"
      onKeyPress={toggleNav}
    >
      {to === '' ? (
        <a href={href} target="_blank">
          {children}
        </a>
      ) : (
        <Link to={to}>{children}</Link>
      )}
    </div>
  </li>
);
MItmbl.propTypes = {
  to: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired,
  children: PropTypes.string,
  key: PropTypes.string,
  href: PropTypes.string
};
MItmbl.defaultProps = {
  children: '',
  key: '',
  href: ''
};

const menuMobileStyle = css`
  list-style-type: none;
  padding: 0;
  margin: 3rem 0 0 0;
  height: 100%;
  text-align: center;
  font-size: 1.25em;
`;

const MenuMobile = ({ toggleNav }) => (
  <ul className={menuMobileStyle}>
    {menuConfig.map(
      menu =>
        menu.submenu ? (
          <SubMenuMobile menu={menu} toggleNav={toggleNav} />
        ) : (
          <MItmbl
            key={menu.url}
            to={menu.url}
            href={menu.href}
            toggleNav={toggleNav}
          >
            {menu.title}
          </MItmbl>
        )
    )}
  </ul>
);
MenuMobile.propTypes = {
  toggleNav: PropTypes.func.isRequired
};

const SubMenuMobile = ({ menu, toggleNav }) => (
  <div>
    {menu.url.map(url => (
      <MItmbl key={url.url} to={url.url} toggleNav={toggleNav}>
        {url.title}
      </MItmbl>
    ))}
  </div>
);
SubMenuMobile.propTypes = {
  menu: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired
};

// Dropped Down Elements
const dropDownItemStyle = css`
  display: block;
  position: absolute;
  background-color: ${colors.fifth};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;

  & a {
    color: ${colors.primary};
    font-weight: normal;
    line-height: 1.3em;
    padding: 12px 16px;
    text-decoration: none;
    text-align: left;
    width: 175px;
    display: block;
  }

  & a:hover {
    background-color: ${colors.primary};
    color: ${colors.fifth};
  }
`;

// Dropped Down Element Style
const dropDownMenuStyle = css`
  position: relative;
  display: inline-block;
  margin: auto;
  & span {
    font-weight: bold;
  }

  & div {
    display: none;
  }

  & :hover {
    & span {
      color: ${colors.primary};
    }

    & div {
      ${dropDownItemStyle}
    }
`;

const DropDownMenu = ({ menu }) => (
  <div className={dropDownMenuStyle}>
    <span>{menu.title}</span>
    <div>
      {menu.url.map(url => (
        <Link key={url.url} to={url.url}>
          {url.title}
        </Link>
      ))}
    </div>
  </div>
);
DropDownMenu.propTypes = {
  menu: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    submenu: PropTypes.bool.isRequired
  }).isRequired
};

// Menu Element Style
const liStyle = css`
  margin: auto;
`;
const LiItems = ({ to, href, children }) => (
  <li className={liStyle}>
    {to === '' ? (
      <a href={href} target="_blank">
        {children}
      </a>
    ) : (
      <Link
        to={to}
        activeStyle={{
          color: colors.primary
        }}
      >
        {children}
      </Link>
    )}
  </li>
);
LiItems.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  to: PropTypes.string.isRequired,
  href: PropTypes.string
};
LiItems.defaultProps = {
  children: '',
  href: ''
};

// Menu Style
const menuStyle = css`
  list-style-type: none;
  display: flex;
  margin: 0;
  width: 60%;
  justify-content: flex-end;
  margin-left: auto;
`;
const Menu = () => (
  <ul className={menuStyle}>
    {menuConfig.map(
      menu =>
        menu.submenu ? (
          <DropDownMenu key={menu.title} menu={menu} />
        ) : (
          <LiItems key={menu.title} to={menu.url} href={menu.href}>
            {menu.title}
          </LiItems>
        )
    )}
  </ul>
);

const basicNav = css`
  display: flex;
  position: fixed;
  overflow: visible;
  top: 0;
  align-items: center;
  letter-spacing: 0.1em;
  color: ${colors.third};
  background-color: ${colors.fifth};
  margin: 0;
  width: 100%;
  list-style-type: none;
  -webkit-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 1);
  z-index: 9998;
  height: 3.5rem;
`;

const desktopNav = css`
  ${basicNav};
  a {
    background-image: none;
    font-weight: bold;
  }
  display: none;
  ${media.mid`
    display: flex;
  `};
`;

// Styles for the mobile View of the navigation
// the margin within the div below sets the svg menu bar distance from the right end.
const mobileNav = css`
  ${basicNav};

  & div {
    margin: 0px 16px 0px auto;
    font-weight: bold;
    cursor: pointer;
  }

  & div img {
    display: block;
    margin: auto;
  }
  ${media.mid`
    display: none;
  `};
`;

// Styles for the overlay which pops up, when the menu is clicked
const mobileStyle = css`
  position: fixed;
  background-color: ${colors.fifth};
  color: ${colors.primary};
  display: block;
  padding: 1rem;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
`;

// Brand Style
const logoClass = css`
  font-size: 1.5em;
  margin: 0px auto 0px 16px;
`;

// Main Navigation Component
class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileActive: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    if (this.state.mobileActive) {
      this.setState({ mobileActive: false });
    } else {
      this.setState({ mobileActive: true });
    }
  }

  render() {
    console.log(' the props in navigation are: ', this.props);
    return (
      <nav>
        <Box className={desktopNav}>
          <Link
            to="/"
            activeStyle={{
              color: colors.primary
            }}
          >
            <img
              className={logoClass}
              width={160}
              height={40}
              src={this.props.logo}
              alt="Tech47 Logo"
            />
          </Link>
          <Menu />
        </Box>
        <Box width="100%" px={[3, 3, 4]} className={mobileNav}>
          <Link
            to="/"
            activeStyle={{
              color: colors.primary
            }}
          >
            <img
              className={logoClass}
              width={160}
              height={40}
              src={this.props.logo}
              alt="Tech47 Logo"
            />
          </Link>
          <div
            onClick={this.toggleNav}
            role="button"
            tabIndex="0"
            onKeyPress={this.toggleNav}
          >
            <img src={menusvg} width="32px" height="32px" alt="Menu" />
          </div>
        </Box>
        {this.state.mobileActive && (
          <MobileNav
            toggleNav={this.toggleNav}
            mobileStyle={mobileStyle}
            logo={this.props.logo}
          >
            <MenuMobile toggleNav={this.toggleNav} />
          </MobileNav>
        )}
      </nav>
    );
  }
}

Navigation.propTypes = {
  logo: PropTypes.shape({
    srcSet: PropTypes.string.isRequired
  })
};

Navigation.defaultProps = {
  title: 'Your company',
  logo: {}
};

export default Navigation;
