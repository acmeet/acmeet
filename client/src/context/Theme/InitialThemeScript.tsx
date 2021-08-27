import { THEME_LOCALSTORAGE_KEY } from "./constants";

const InitialThemeScript = () => (
  <script dangerouslySetInnerHTML={{__html: initializeThemeMinified }} />
);

const initializeThemeMinified = `"light"!==function(){let t=window.localStorage.getItem("${THEME_LOCALSTORAGE_KEY}");if(null!==t)return t;let e=window.matchMedia("(prefers-color-scheme: dark)");return"boolean"==typeof e.matches&&e.matches?"dark":"light"}()&&document.documentElement.setAttribute("data-theme","dark");`;

const initializeTheme = `(function() {
  const colorMode = (function() {
    const persistedColorPreference = window.localStorage.getItem('${THEME_LOCALSTORAGE_KEY}');
    if (persistedColorPreference !== null) { return persistedColorPreference; }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mql.matches === 'boolean') { return mql.matches ? 'dark' : 'light'; }
    return 'light';
  })();
  if (colorMode !== 'light') { document.documentElement.setAttribute('data-theme', 'dark'); }
})()`;

export default InitialThemeScript;