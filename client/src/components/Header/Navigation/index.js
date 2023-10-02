import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Navigation = ({ isOpen, closeMenu, className }) => {

  const links = [
    {
      paragraph: "About Us",
      to: "/about-us",
    },
    {
      paragraph: "Shop",
      to: "/shop",
    },
    {
      paragraph: "Cart",
      to: "/cart",
    },
    {
      paragraph: "Chats",
      to: "/chats",
    }
    ];

  return (
    <ul className={className}>
      {links.map(({ paragraph, to }) => (
        <Link key={paragraph} to={to}>{paragraph}</Link>
      ))}
      {isOpen && <button type="button" className="close-menu" onClick={closeMenu}>X</button>}
    </ul>
  );
};

Navigation.propTypes = {
  isOpen: PropTypes.bool,
  closeMenu: PropTypes.func,
  className: PropTypes.string,
}

export default Navigation;