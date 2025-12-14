import React from 'react'
import { useThemeContext } from '../contexts/ThemeContext'

const ThemeButton = () => {
    const {isDark, toggleTheme} = useThemeContext()
  return (
    <>
        <div className='flex items-center w-fit cursor-pointer' onClick={toggleTheme}> {isDark ? <i className='bi bi-brightness-high-fill text-2xl text-amber-200'></i> : <i className='bi bi-moon-stars-fill text-2xl text-slate-600'></i>} </div>
    </>
  )
}

export default ThemeButton