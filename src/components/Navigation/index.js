import React, { Component } from 'react';
import { Link } from 'gatsby';
import { css } from 'emotion';
import PropTypes from 'prop-types';
import FaChevronDown from "react-icons/lib/fa/chevron-down";
import feather from '../../utils/feather';
import colors from '../../utils/colors';
import MobileNav from './mobile';
import media from '../../utils/media';
import { Box } from '../../components/Layout';
import menusvg from './align-right.svg';

const svgStyles = css`
  color: ${colors.primary};
  transition: opacity 0.15s ease-in;
  transition: color 0.15s ease-in;

  &:hover {
    text-decoration: none;
    box-shadow: none;
    color: ${colors.fifth};
    transition: background-color 0.15s ease-in;
  }
`;

const outerstyle = css`
  background-color: #efefef;
  padding: 5px 10px 0px 10px;
  border-radius: 50%;
  &:hover {
    background-color: ${colors.primary};
    transition: background-color 0.15s ease-in;
  }
`;

const menuConfig = [
  {
    title: 'SERVICES',
    url: [
      { title: 'Serverless Apps', url: '/serverless' },
      { title: 'Fullstack', url: '/fullstack' },
      { title: 'AWS Cloud', url: '/aws' }

    ],
    submenu: true
  },
  { title: 'ABOUT', url: '/about', submenu: false },
  { title: 'CONTACT', url: '/Contact', submenu: false },
   {team:'Team', url:'/team', submenu: false}
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
    transition: color 0.15s ease-in;
    transition: background 0.15s ease-in;
    color: ${colors.tech47blue};
    font-weight: 600;
    line-height: 1.3em;
    padding: 12px 16px;
    text-decoration: none;
    text-align: left;
    width: 175px;
    display: block;
  }

  & a:hover {
    background: ${colors.tech47purple};
    color: ${colors.fifth};
    transition: color 0.15s ease-in;
    transition: background 0.15s ease-in;
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
    opacity: 0;
    display: none;
  }

  & :hover {
    & span {
      color: ${colors.tech47hover};
    }

    & div {
      ${dropDownItemStyle}
      opacity: 1;
    }
`;

const DropDownMenu = ({ menu }) => (
  <div className={dropDownMenuStyle}>
    <span>{menu.title}</span>
    <FaChevronDown
      css={css({
        cursor: `pointer`,
        fontSize: `1.7em`,
        padding: `4px`,
        color: `rgba(255,255,255,1)`,
        userSelect: `none`,
      })}
    />
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


const basicNav = css`
  display: flex;
  position: fixed;
  overflow: visible;
  top: 0;
  align-items: center;
  letter-spacing: 0.1em;
  color: ${colors.primary};
  background-color: ${colors.fifth};
  margin: 0;
  width: 100%;
  list-style-type: none;
  -webkit-box-shadow: 0px 0px 1px 0px ${colors.gray.calm};
  -moz-box-shadow: 0px 0px 1px 0px ${colors.gray.calm};
  box-shadow: 0px 0px 1px 0px ${colors.gray.calm};
  z-index: 9998;
  height: 3.5rem;
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
      mobileActive: false,
      isScrolled: false,
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const JUDGE_POSITION_Y = 50;

    const supportPageOffset = window.pageYOffset !== undefined;
    const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
    const css1compatY = isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    const scrollY = supportPageOffset ? window.pageYOffset : css1compatY;

    if (scrollY > JUDGE_POSITION_Y) {
      this.setState({
        isScrolled: true,
      })
    } else {
      this.setState({
        isScrolled: false,
      })
    }
  }

  toggleNav() {
    if (this.state.mobileActive) {
      this.setState({ mobileActive: false });
    } else {
      this.setState({ mobileActive: true });
    }
  }

  render() {
    const { isScrolled } = this.state;
    const isRootPath = this.props.location.pathname === '/';
    const shouldBeHide = isRootPath && !isScrolled;

    const desktopNav = css`
      ${basicNav};
      background: ${shouldBeHide ? 'transparent' : 'rgba(173,60,203,1)'};
      transition: background 0.3s ease-out;
      box-shadow: ${shouldBeHide ? 'none' : '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)'};
      border-top: 4px solid ${colors.tech47pink};
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
      background: ${shouldBeHide ? 'transparent' : 'rgba(173,60,203,1)'};
      transition: background 0.3s ease-out;
      box-shadow: ${shouldBeHide ? 'none' : '0 1px 3px 0 rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 2px 1px -1px rgba(0,0,0,.12)'};
      border-top: 4px solid ${colors.tech47pink};

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


    // Menu Style
    const menuStyle = css`
      list-style-type: none;
      display: flex;
      margin: 0;
      width: 33%;
      font-size: 0.7em;
      font-weight: 100;
      color: ${shouldBeHide ? `rgba(255,255,255,1)` : `white`};
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
              height={25}
              src={this.props.logoWhite}
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
              height={20}
              src={this.props.logo}
              alt="Tech47 Logo"
            />
          </Link>
          <div
            onClick={this.toggleNav}
            role="button"
            tabIndex="0"
            onKeyPress={this.toggleNav}
            css="color: white;"
          >
            <img src={menusvg} width="24px" alt="Menu" />
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
  logo: PropTypes.string,
  logoWhite: PropTypes.string,
  location: PropTypes.object,
};

Navigation.defaultProps = {
  title: 'Your company',
  logo: {}
};

export default Navigation;
