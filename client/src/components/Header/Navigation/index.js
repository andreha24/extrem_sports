import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({
  isOpen, closeMenu, className, hasLogin,
}) => {
  const links = [
    {
      paragraph: "About Us",
      to: "/about-us",
    },
    {
      paragraph: "Shop",
      to: "/shop",
    },
  ];

  return (
    <ul className={className}>
      {links.map(({ paragraph, to }) => (
        <NavLink key={paragraph} to={to}>{paragraph}</NavLink>
      ))}
      {hasLogin && <Link to="/login" className="header__login__block__log">Log in</Link>}
      {isOpen && <button type="button" className="close-menu" onClick={closeMenu}>X</button>}
    </ul>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool,
  closeMenu: PropTypes.func,
  className: PropTypes.string,
  hasLogin: PropTypes.bool,
};

export default Navigation;
