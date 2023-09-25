import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import Navigation from "./Navigation";
import basket from "../../assets/basket.png"

import "./index.scss";

const Header = () => {

  const [viewMenu, setViewMenu] = useState(false);
  // const [viewBasket, setViewBasket] = useState(false);

  const closeMenu = () => {
    setViewMenu(prev => !prev);
  }

  return (
    <header className="header">
      <img src="" alt="logo"/>

      <CSSTransition
        in={viewMenu}
        timeout={500}
        classNames="menu-animation"
        unmountOnExit
      >
        <Navigation isOpen={viewMenu} closeMenu={closeMenu} className="header__burger__menu" />
      </CSSTransition>
      <button onClick={() => setViewMenu((prev) => !prev)} className="open__burger__menu">open</button>

      <Navigation className="header__nav__menu"/>

      <div className="header__login__block">
        <button>Log in</button>
        <div className="header__login__block__basket">
          <img src={basket} alt="basket"/>
          <span>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;