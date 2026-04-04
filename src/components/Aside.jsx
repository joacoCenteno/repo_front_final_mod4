import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {hasRole} from '../utils/roleUtils'
import { useAuth } from '../contexts/AuthContext'
import ThemeButton from './ThemeButton'
import { useThemeContext } from '../contexts/ThemeContext'
import AsideMd from './AsideMd'

const Aside = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {isDark} = useThemeContext()
    const toggleMenu = () => setIsOpen(prev => !prev)
    const navigate = useNavigate()
    const {usuario, autenticado} = useAuth()
    const asideRef = useRef()

    const playlist_fav = useMemo(() => {
        if (usuario && usuario.playlists) {
            return usuario.playlists.find(p => p.nombre === "Mis Favoritos");
        }
        return null;
    }, [usuario]);

    const otrasPlaylists = useMemo(() => {
        if (usuario && usuario.playlists) {
            return usuario.playlists.filter(p => p.nombre !== "Mis Favoritos");
        }
        return []; 
    }, [usuario])

    useEffect(() => {
        const handleClickOutdise = (event) => {
            if(asideRef.current && !asideRef.current.contains(event.target)) setIsOpen(false)
        }

        if(isOpen) document.addEventListener("mousedown", handleClickOutdise)
        
        return () => document.removeEventListener("mousedown", handleClickOutdise)
    }, [isOpen])



  return (
    <>
    <div className={`w-fit relative bg-[#171e2d] md:relative md:flex ${!isDark&&"bg-[#e3e6ff]"}`}>
            <button 
                className="md:hidden cursor-pointer top-4 left-4 z-50 text-white p-2"
                onClick={toggleMenu}
            >
                <i className="bi bi-list text-4xl"></i>
            </button>

        <div
        ref={asideRef}
      className={`
        bg-[#171e2d] fixed top-0 left-0 h-full w-3/4 sm:w-2/4 z-100 p-6 
        transform transition-transform duration-300
        md:hidden ${!isDark&&"bg-[#e3e6ff]"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
                <button 
                    className="absolute top-4 right-4 text-white"
                    onClick={toggleMenu}
                >
                    <i className="bi bi-x-lg text-3xl"></i>
                </button>
                <ThemeButton/>
        <div className='mt-10'>
                <p className='text-[#5d6f95] font-bold mb-3'>MENU</p>
                <ul>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{navigate('/'); toggleMenu()}}>Inicio</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{navigate('/generos/cuarteto'); toggleMenu()}}>Cuarteto</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{navigate('/generos/rock'); toggleMenu()}}>Rock</li>
                </ul>
            </div> 
            {hasRole(usuario,"admin") &&  
                <div className='mt-10'>
                    <p className='text-[#5d6f95] font-bold mb-3'>PANEL</p>

                    <ul>
                        <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{navigate('/canciones'); toggleMenu()}}>Gestión Canciones</li>
                    </ul>
                </div>
            }
            <div className='mt-10'>
                <p className='text-[#5d6f95] font-bold '>MI MÚSICA</p>

                <ul>
                    <li  className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`}>Recientemente Reproducidas</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{navigate(`/playlist/${playlist_fav._id}`); toggleMenu()}}>Canciones Favoritas</li>
                </ul>
            </div>
            {autenticado && 
                <div className='mt-10'>
                    <div className='flex justify-between pr-4'>
                        <p className='text-[#5d6f95] font-bold '>PLAYLIST</p>
                        <i className="bi bi-plus-circle text-lg text-[#5c6b8a]  hover:text-[#91dbfd] hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] cursor-pointer" onClick={()=> {navigate('playlist/crear'); toggleMenu()}}></i>

                    
                    </div>
                    <ul >
                        {otrasPlaylists.map(p => {
                            return (
                                <li key={p._id}  className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] text-white hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{ navigate(`/playlist/${p._id}`); toggleMenu()}}>{p.nombre}</li>
                            )
                        })}
                    </ul>
                </div>             
            }     
    </div>
        <AsideMd 
            otrasPlaylists={otrasPlaylists}
            playlist_fav={playlist_fav}
        />
      
    </div>

    </>
  )
}

export default Aside