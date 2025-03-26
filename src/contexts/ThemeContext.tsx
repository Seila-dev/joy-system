import { createContext, useState, ReactNode, useEffect } from "react";

interface Themes {
    light: {
        background: string;
        object: string;
        emphasize_more: string;
        emphasize_less: string;
        black_to_white: string;
        border: string;
    },
    dark: {
        background: string;
        object: string;
        emphasize_more: string;
        emphasize_less: string;
        black_to_white: string;
        border: string;
    }
}

export const themes: Themes = {
    light: {
        background: "#ffff",
        object: "whitesmoke",
        emphasize_more: "#29ffad",
        emphasize_less: "#e3c847",
        black_to_white: "#000",
        border: "#f2f2f2",

    },
    dark: {
        background: "var(--background)",
        object: "#1a1a1a",
        emphasize_more: "#e3c847",
        emphasize_less: "var(--secondary)",
        black_to_white: "#fff",
        border: "#2b2b2b",
    }
}

// Background
// Objects (notf, cards, filter buttons)
// CTA Buttons, important details to view
// Header Texts (Black, White)
// Description Texts (Black opacity 0.6, white opacity 0.6) 
// Borders (for black & white)

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