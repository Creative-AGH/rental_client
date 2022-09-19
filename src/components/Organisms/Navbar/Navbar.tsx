import { useState } from 'react';
import logo from '../../../assets/images/logo/logo.svg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navbar.module.scss';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className={css.navbar}>
        <div className={css.navbar__logo}>
          <img src={logo} alt="logo" />
        </div>
        <ul
          className={clsx(css.menu, {
            [css.active]: isMenuOpen,
          })}>
          <li className={css.menu__item}>
            <Link to="/search">Znajdź sprzęt</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/history">Historia wypozyczeń</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/settings">Ustawienia</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/contact">Kontakt</Link>
          </li>
          <li className={clsx(css.menu__item, css.button)}>
            <Link to="/logout">Wyloguj się</Link>
          </li>
        </ul>
        <div className={clsx(css.burger, { [css.active]: isMenuOpen })} onClick={handleMenuToggle}>
          <div className={css.burger__line}></div>
          <div className={css.burger__line}></div>
          <div className={css.burger__line}></div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
