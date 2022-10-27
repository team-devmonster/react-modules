import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(null);
export function ThemeProvider({ children, color, theme }) {
    const [colorScheme, setColorScheme] = useState(null);
    useEffect(() => {
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
    return (_jsx("div", Object.assign({ style: { visibility: colorScheme ? 'visible' : 'hidden' } }, { children: _jsx(ThemeContext.Provider, Object.assign({ value: theme(color[colorScheme || 'dark']) }, { children: children })) })));
}
export function useTheme() {
    return useContext(ThemeContext);
}
//# sourceMappingURL=theme.js.map