import React, {  useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePlaylist } from '../contexts/PlaylistContext'
import Loader from './Loader'
import BuscadorCancion from './BuscadorCancion'
import PlaylistAcciones from './PlaylistAcciones'
import CancionPlaylistAccion from './CancionPlaylistAccion'
import UserInfo from './UserInfo'
import { useThemeContext } from '../contexts/ThemeContext'

const PlaylistDetalle = () => {
    const {id} = useParams()
    const {usuario} = useAuth()
    const { fetchPlaylistById, playlist} = usePlaylist()
    const {isDark} = useThemeContext()
    const [cargandoLocal, setCargandoLocal] = useState(true);

useEffect(() => {
  const traerPlaylist = async () => {
    try {
      setCargandoLocal(true)
      await fetchPlaylistById(id)
      setCargandoLocal(false)
    } catch (error) {
      console.log("Error trayendo playlist:", error)
    }
  }

  traerPlaylist()
}, [id])

  return (
    <> 
    {cargandoLocal?(<Loader/>):(
    <div className='flex flex-col md:flex-row justify-between mt-4 gap-6'>
                <div className='w-full h-fit'>
                  <div className=' h-60 bg-cover bg-center bg-no-repeat flex items-end justify-end p-3'  style={{ 
                  backgroundImage: `url(${playlist.imagen})`}}>
                    <div className='w-fit flex gap-5'>
                        {playlist.usuario && usuario._id === playlist.usuario._id && !playlist.favorito && (
                        <>
                        <PlaylistAcciones/>
                        </>
                      )}
                    </div>
                </div>   
                <div>
                  <div className='mt-3 flex items-center justify-between'>
                      <div>
                        <h2 className={`font-bold text-2xl  ${!isDark&&" text-[#5d6f95]"}`}>{playlist.nombre}</h2>
                        <p className='text-[#5c6b8a] text-sm font-light'><i>{playlist.usuario.username}</i></p>
                        
                      </div>
                      
                      {playlist.canciones[0]?(
                         <a href={playlist.canciones[0].url} target="_blank" className={`text-[#5c6b8a] hover:text-[#91dbfd] cursor-pointer hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`}><i className="bi bi-play-fill"></i> REPRODUCIR</a>
                      ):(<button className={`text-[#5c6b8a] hover:text-[#91dbfd] cursor-pointer hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`}><i className="bi bi-play-fill"></i> REPRODUCIR</button>)}
                     
                  </div>
                  
                  <div className='mt-3'>
                    <h4 className={`font-medium ${!isDark&&" text-[#5d6f95]"}`}>Canciones</h4>
                    <div className='overflow-y-scroll h-70 no-scrollbar'>
                    {!playlist.canciones ? <p>No posee canciones</p> : playlist.canciones.map((cancion) =>{
                        return(
                      <div key={cancion._id || cancion.IdCancion  } className={`flex justify-between items-center w-full h-15 px-2 rounded-2xl hover:bg-[#171e2d] cursor-pointer ${!isDark&&"hover:bg-[#a2acff] text-[#5d6f95] hover:text-white"}`}
                      >
                          <div className='flex'>
                              <div className={`relative  w-10 h-10 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                                  backgroundImage: `url(${cancion.imagen})` 
                              }}>
                              <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                              </div>
                              </div>
                              
                              <div className='flex flex-col pl-3'>
                              <p className='font-medium text-sm'>{cancion.titulo}</p>
                              <p className=' text-xs'>{cancion.artista}</p>
                              </div>
                          </div>
                        {playlist.usuario && usuario._id === playlist.usuario._id && (
                        <>
                          <CancionPlaylistAccion id_cancion={cancion._id}/>
                        </>
                      )}
                          


                      </div>                       
                          
                        )
                      })}                      
                    </div>
  
                  </div>

                </div>               
                </div>
                {(playlist.usuario && usuario._id === playlist.usuario._id) ? (
                        <>
                          <BuscadorCancion/> 
                        </>
                      ) : (
                        <UserInfo usuario={playlist.usuario}/>
                      )}
                     
    </div>      
    )}     


    </>
  )
}

export default PlaylistDetalle