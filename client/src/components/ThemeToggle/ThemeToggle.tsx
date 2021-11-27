import { c } from "@/utils/cls";
import { useThemeContext } from "../../context/Theme/ThemeContext";

import styles from './.module.scss';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isLightMode = theme === 'light';

  return (
    <div
      role="button"
      className={c(styles.toggle, isLightMode ? styles.light : styles.dark)}
      onClick={toggleTheme}
      aria-label="Switch between light and dark mode"
    >
      <span className={styles.icons} />
    </div>
  );
};

export default ThemeToggle;