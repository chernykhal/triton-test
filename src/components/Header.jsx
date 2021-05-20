import React from "react";
import { Link } from "react-router-dom";

const Header = ({ totalCount }) => {
  return (
    <header className="header">
      <div className="header__logo logo">
        <Link to="/" className="logo__link">
          Магазин
        </Link>
      </div>
      <nav className="header__menu menu">
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/cart" className="menu__link menu__link--cart">
              Корзина {totalCount > 0 ? `| ${totalCount}` : ""}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
