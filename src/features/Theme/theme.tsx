import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { set } from './slice';
import styles from './theme.module.scss';
import { ThemePropsT, themeStateT } from '../../types/ThemeT';
import ToggleButton from '../../components/Atoms/ToggleButton/ToggleButton';

const Theme = ({ className }: ThemePropsT) => {
  const theme = useSelector((state: themeStateT) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(set(next));
  };

  return (
    <ToggleButton
      className={clsx(styles[className], styles.root, theme === 'dark' ? styles.dark : styles.light)}
      onClick={handleChange}
    />
  );
};

export default Theme;
