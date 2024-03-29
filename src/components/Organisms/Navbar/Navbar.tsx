import { useState } from 'react';
import logo from '../../../assets/images/logo/logo.svg';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
// eslint-disable-next-line
import css from './Navbar.module.scss';
import Theme from '../../../features/Theme/Theme';
import { useSelector } from 'react-redux';
import { themeStateT } from '../../../types/ThemeT';

const Navbar = () => {
  const theme = useSelector((state: themeStateT) => state.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className={css.navbar}>
        <div className={clsx(css.navbar__logo, css[theme])}>
          <img src={logo} alt="logo" />
        </div>

        <ul
          className={clsx(css.menu, {
            [css.active]: isMenuOpen,
          })}>
          <li className={css.menu__item}>
            <Link to="/">Znajdź sprzęt</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/user/history">Historia wypożyczeń</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/user/settings">Ustawienia</Link>
          </li>
          <li className={css.menu__item}>
            <Link to="/contact">Kontakt</Link>
          </li>
          <li className={clsx(css.menu__item, css.button)}>
            <Link to="/logout">Wyloguj się</Link>
          </li>
          <li className={clsx(css.menu__item, css.toggle)}>
            <Theme className="dark" />
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
