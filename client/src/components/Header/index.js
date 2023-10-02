import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import {Link} from "react-router-dom";

import Navigation from "./Navigation";
import Basket from "./Basket";
import basket from "../../assets/basket.png";
import burgerMenu from "../../assets/burger-menu.png";
import { ReactComponent as Logo } from "../../assets/logo.svg";

import "./index.scss";

const Header = () => {

  const [viewMenu, setViewMenu] = useState(false);
  const [viewBasket, setViewBasket] = useState(false);

  const toggleMenu = () => {
    setViewMenu(prev => !prev);
  }

  const toggleBasket = () => {
    setViewBasket(prev => !prev);
  }

  return (
    <header className="header">

      <div className="header__logo__wrapper">
        <Link to="/"><Logo /></Link>
        <span>Sportify</span>
      </div>

      <div className="header__burger__menu__nav">
        <div className="header__login__block__basket">
          <img src={basket} alt="basket" onClick={toggleBasket} />
          <span>0</span>
        </div>
        <img src={burgerMenu} onClick={toggleMenu} className="open__burger__menu" alt="burger-menu-icon" />
      </div>

      <CSSTransition
        in={viewMenu}
        timeout={500}
        classNames="menu-animation"
        unmountOnExit
      >
        <Navigation isOpen={viewMenu} closeMenu={toggleMenu} className="header__burger__menu" />
      </CSSTransition>


      <Navigation className="header__nav__menu"/>

      <div className="header__login__block">
        <Link to="/login" className="header__login__block__log">Log in</Link>
        <div className="header__login__block__basket">
          <img src={basket} alt="basket" onClick={toggleBasket}/>
          <span>0</span>
        </div>
      </div>

      <CSSTransition
        in={viewBasket}
        timeout={500}
        classNames="basket-animation"
        unmountOnExit
      >
        <Basket closeBasket={toggleBasket} />
      </CSSTransition>

    </header>
  );
};

export default Header;