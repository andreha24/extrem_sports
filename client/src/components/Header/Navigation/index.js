import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import logout from "../../../utils/auth/logout";
import checkToken from "../../../utils/auth/checkToken";

const Navigation = ({
  isOpen, closeMenu, className, hasLogin,
}) => {
  const links = [
    {
      paragraph: "About Us",
      to: "/about-us",
    },
    {
      paragraph: "Events",
      to: "/events",
    },
    {
      paragraph: "Clients",
      to: "/clients",
    },
    {
      paragraph: "Account",
      to: "/account",
    },
  ];

  return (
    <ul className={className}>
      {links.map(({ paragraph, to }) => (
        <NavLink key={paragraph} to={to}>{paragraph}</NavLink>
      ))}
      {/* eslint-disable-next-line no-nested-ternary */}
      {hasLogin
        ? (checkToken() !== null
          ? <Link to="/login" className="header__login__block__log" onClick={logout}>Log out</Link>
          : <Link to="/login" className="header__login__block__log">Log in</Link>)
        : null}

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
