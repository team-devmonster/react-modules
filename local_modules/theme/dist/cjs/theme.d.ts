declare type Color = {
    light: {
        [name: string]: string;
    };
    dark: {
        [name: string]: string;
    };
};
export declare function ThemeProvider<S extends Color, T extends Function>({ children, color, theme }: {
    children: React.ReactNode;
    color: S;
    theme: T;
}): JSX.Element | null;
export declare function useTheme<T>(): T;
export {};
