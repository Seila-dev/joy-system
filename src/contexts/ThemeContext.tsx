import { createContext, useState, ReactNode, useEffect } from "react";

interface Themes {
    light: {
        card: string;
        paragraph: string;
        background: string;
        painel: string;
        common: string;
        filter: string;
    },
    dark: {
        card: string;
        paragraph: string;
        background: string;
        painel: string;
        common: string;
        filter: string;
    }
}

export const themes: Themes = {
    light: {
        //card: "#23272A",
        card: "#fff",
        paragraph: "#000",
        background: "#fff",
        painel: "var(--background)",
        common: "#000",
        filter: "whitesmoke",
    },
    dark: {
        card: "#1a1a1a",
        paragraph: "var(--secondary)",
        background: "var(--background)",
        painel: "#fff",
        common: "#fff",
        filter: "#1a1a1a",
    }
}

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

//export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export const ThemeContext = createContext({} as ThemeContextType)

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const storedTheme = localStorage.getItem("theme") as Theme | null

    const [ theme, setTheme ] = useState<Theme>(storedTheme || "light") 

    useEffect(() => {
        localStorage.setItem("theme", theme)
    })

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            { children }
        </ThemeContext.Provider>
    )
}