import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import Navigation from "./Navigation";
import burgerMenu from "../../assets/burger-menu.png";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./index.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="header">

      <div className="header__logo__wrapper">
        <Link to="/"><Logo /></Link>
        <span>Sportify</span>
      </div>

      <div className="header__burger__menu__nav">
        <img src={burgerMenu} onClick={toggleMenu} className="open__burger__menu" alt="burger-menu-icon" />
      </div>

      <CSSTransition
        in={isMenuOpen}
        timeout={500}
        classNames="menu-animation"
        unmountOnExit
      >
        <Navigation isOpen={isMenuOpen} closeMenu={toggleMenu} className="header__burger__menu" hasLogin />
      </CSSTransition>

      <Navigation className="header__nav__menu" />

      <Link to="/login" className="header__log-btn">Log in</Link>
    </header>
  );
};

export default Header;
