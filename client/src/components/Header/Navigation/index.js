import React from "react";
import PropTypes from "prop-types";

const Navigation = ({ isOpen, closeMenu, className }) => {

  const links = ["About Us", "Shop", "Cart", "Chats"];

  return (
    <ul className={className}>
      {links.map((elem, index) => (
        <li key={index}>{elem}</li>
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