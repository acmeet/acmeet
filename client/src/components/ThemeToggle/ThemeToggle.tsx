import { useThemeContext } from "../../context/Theme/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeContext();
  const isLightMode = theme === 'light';

  const label = `Activate ${isLightMode ? 'dark' : 'light'} mode`;
  return (
    <button
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    />
  );
};

export default ThemeToggle;