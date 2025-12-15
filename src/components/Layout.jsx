import React from 'react'
import Aside from './Aside'
import Loader from './Loader';
import { Outlet } from 'react-router-dom';
import { useMusic } from '../contexts/MusicContext';
import Search from './Search';
import Reproductor from './Reproductor';
import { useThemeContext } from '../contexts/ThemeContext';

const Layout = () => {
  const {loading} = useMusic();
      const {isDark} = useThemeContext()

  if (loading)  return <Loader/>

  return (
    <>
      <div className={`flex flex-col w-full  ${isDark&&"dark:bg-[#121825] text-[#f5f6ff]"} font-display`}>
      <div className=' relative md:flex'>

    

      <Aside/>
        <div className='min-h-screen flex-col px-3 md:pl-5 w-full  text-[#EEEEEE] md:w-5/6'>
          <Search/>

          <Outlet/>
        </div>        

      
      </div>
        <Reproductor/>
      </div>
  
    </>
  )
  
}

export default Layout