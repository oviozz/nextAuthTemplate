
"use client"

import "./ThemeToggleButton.css"
import {useContext} from "react";
import {ThemeContext} from "@/context/ThemeContext";
const ThemeToggleButton = () => {

    const { toggle, theme } = useContext(ThemeContext);

    const isDarkTheme = theme !== 'dark' ? 'theme-checkbox checked' : 'theme-checkbox';


    return (
        <input onClick={toggle} type="checkbox" className={isDarkTheme} />
    )
}

export default ThemeToggleButton;