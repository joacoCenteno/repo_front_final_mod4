/* eslint-disable react-refresh/only-export-components */
import  { createContext, useContext, useState, useEffect} from 'react'

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) =>{
    const [isDark, setIsDark] = useState(()=>{
        return JSON.parse(localStorage.getItem('theme_dark')) || false
    });

    useEffect(()=>{
        localStorage.setItem('theme_dark', JSON.stringify(isDark));
    },[isDark]);

    const toggleTheme = () => setIsDark(!isDark);

    return(
        <ThemeContext.Provider value={{isDark, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext);