import React from 'react'
import {hasRole} from '../utils/roleUtils'
import { useAuth } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { useNavigate } from 'react-router-dom'
import ThemeButton from './ThemeButton'

const AsideMd = ({otrasPlaylists, playlist_fav}) => {
        const {usuario, autenticado} = useAuth()
        const {isDark} = useThemeContext()
        const navigate = useNavigate()
  return (
    <>
        <div className={`md:w-3/4  hidden lg:relative md:flex  flex-col gap-12 pt-7 pl-4 text-[#5c6b8a]`}>   
            <ThemeButton/>
            <div>
                <p className='text-[#5d6f95] font-bold mb-3'>MENU</p>

                <ul>
                    <li className={`hover:text-[#91dbfd] cursor-pointer pb-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>navigate('/')}>Inicio</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{ autenticado ? navigate('/generos/cuarteto') : navigate('/autenticacion')}}>Cuarteto</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer py-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>{ autenticado ? navigate('/generos/rock') : navigate('/autenticacion')}}>Rock</li>
                </ul>
            </div> 

            {hasRole(usuario,"admin") &&  
                <div className=''>
                    <p className='text-[#5d6f95] font-bold mb-3'>PANEL</p>

                    <ul>
                        <li className={`hover:text-[#91dbfd] cursor-pointer py-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>navigate('/canciones')}>Gestión Canciones</li>
                    </ul>
                </div>
            }

            <div className=''>
                <p className='text-[#5d6f95] font-bold mb-3'>MI MÚSICA</p>

                <ul>
                    <li  className={`hover:text-[#91dbfd] cursor-pointer pb-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] pb-1 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`}>Recientemente Reproducidas</li>
                    <li className={`hover:text-[#91dbfd] cursor-pointer pb-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] py-1 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=> navigate(`/playlist/${playlist_fav._id}`)}>Canciones Favoritas</li>
                </ul>
            </div>
            {autenticado && 
                <div className=''>
                    <div className='flex justify-between pr-4'>
                        <p className='text-[#5d6f95] font-bold mb-3'>PLAYLIST</p>
                        <i className={`bi bi-plus-circle text-lg text-[#5c6b8a]  hover:text-[#91dbfd] hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] cursor-pointer ${!isDark&&"hover:text-[#a2acff] pb-2 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=> navigate('playlist/crear')}></i>

                    
                    </div>
                    
                    <ul >
                        {otrasPlaylists.map(p => {
                            return (
                                <li key={p._id}  className={`hover:text-[#91dbfd] cursor-pointer pb-1 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] pb-2 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=> navigate(`/playlist/${p._id}`)}>{p.nombre}</li>
                            )
                        })}
                    </ul>
                </div>                            
            }
        </div>  
    </>
  )
}

export default AsideMd