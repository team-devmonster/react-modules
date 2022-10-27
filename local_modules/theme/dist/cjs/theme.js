"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTheme = exports.ThemeProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const ThemeContext = (0, react_1.createContext)(null);
function ThemeProvider({ children, color, theme }) {
    const [colorScheme, setColorScheme] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setColorScheme(colorScheme);
        const root = document.documentElement;
        for (let key in color[colorScheme]) {
            root.style.setProperty(`--${key}`, color[colorScheme][key]);
        }
        const fn = (event) => {
            const newScheme = event.matches ? 'dark' : 'light';
            setColorScheme(newScheme);
            const root = document.documentElement;
            for (let key in color[newScheme]) {
                root.style.setProperty(`--${key}`, color[newScheme][key]);
            }
        };
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);
        return () => {
            window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
        };
    }, []);
    return (colorScheme &&
        (0, jsx_runtime_1.jsx)(ThemeContext.Provider, Object.assign({ value: theme(color[colorScheme]) }, { children: children })));
}
exports.ThemeProvider = ThemeProvider;
function useTheme() {
    return (0, react_1.useContext)(ThemeContext);
}
exports.useTheme = useTheme;
//# sourceMappingURL=theme.js.map