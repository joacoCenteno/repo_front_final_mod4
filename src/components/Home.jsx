import React from 'react'
import { useMusic } from '../contexts/MusicContext'
import Aside from './Aside';
import Search from './Search';
import CancionesTop from './CancionesTop';
import PlaylistView from './PlaylistView';
import Reproductor from './Reproductor';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

const Home = () => {
  const {canciones} = useMusic();
  const navigate = useNavigate()
  const {isDark} = useThemeContext()
  const {autenticado} = useAuth()

  return (
    <>
          <div className='pt-4'>
            <div className='flex items-center justify-between md:pr-5'>
              <h1 className={`md:mb-5 text-lg md:text-2xl font-bold ${!isDark&&"text-[#4e5c77]"}`}>Nuevos Lanzamientos</h1>
              <p className={`text-sm text-[#5c6b8a] hover:text-[#91dbfd]  hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] transition cursor-pointer ${!isDark&&"hover:text-[#a2acff] pb-2 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`} onClick={()=>navigate('/recientes')}>Ver Todos</p>

            </div>
          
          
          <div className={`flex gap-6 overflow-hidden pr-5 w-full flex-nowrap ${!isDark&&"text-[#4e5c77]"}`}>
            {canciones && canciones.map((cancion) =>{
              return(
                <div key={cancion._id || cancion.IdCancion  } className={`flex-shrink-0 w-55 h-60 p-3  pb-4 rounded-2xl hover:bg-gradient-to-r from-[#89d6f9] to-[#42c1fc]
                      hover:shadow-sm hover:shadow-[#81D4FA]/50 hover:[box-shadow:0_0_20px_#81D4FA,0_0_40px_#81D4FA/60] hover:ring-1 hover:ring-[#81D4FA] group cursor-pointer ${!isDark&&"hover:bg-gradient-to-r from-[#e3e6ff] to-[#a2acff] hover:ring-transparent"}`}
                >
                  <div className={`relative  w-full h-40 rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                    backgroundImage: `url(${cancion.imagen})` 
                  }}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                  </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                     <i className={`bi bi-play-circle text-5xl text-white
                              opacity-0 group-hover:opacity-100 transition-all duration-200
                              ${autenticado ? "cursor-pointer" : ""}
                            `}
                            onClick={() => {
                              if (!autenticado){
                                navigate('/autenticacion');
                                return
                              } 
                              window.open(cancion.url, "_blank");
                            }}>
                    </i>
        </div>
                  </div>

                  <p className='font-medium mt-3'>{cancion.titulo}</p>
                  <p className='font-light'>{cancion.artista}</p>
                </div>
                
              )
            })}
          </div>
          </div>

          <div className='flex flex-col md:flex-row md:justify-between'>
            <CancionesTop/>
            <PlaylistView/>
          </div>
        

    </>
  )
}

export default Home