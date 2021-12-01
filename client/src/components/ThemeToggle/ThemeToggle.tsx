import { useThemeContext } from '@/context/Theme/ThemeContext';
import { c } from '@/utils/cls';

import styles from './.module.scss';

import type { KeyboardEventHandler } from 'react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isLightMode = theme === 'light';

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (!['Enter', ' ', 'Spacebar'].includes(e.key)) { return; }
    e.preventDefault();
    toggleTheme();
  }

  return (
    <div
      role="button"
      className={c(styles.toggle, isLightMode ? styles.light : styles.dark)}
      onClick={toggleTheme}
      onKeyDown={onKeyDown}
      aria-label="Switch between light and dark mode"
      tabIndex={0}
    >
      <span className={styles.icons} />
    </div>
  );
};

export default ThemeToggle;