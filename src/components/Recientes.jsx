import React, { useEffect, useState } from 'react'
import { useMusic } from '../contexts/MusicContext';
import Loader from './Loader';
import Aside from './Aside';
import Reproductor from './Reproductor';
import Search from './Search';
import { useThemeContext } from '../contexts/ThemeContext';
import Paginador from './Paginador';
import { useAuth } from '../contexts/AuthContext';

const Recientes = () => {
  const {cancionesRecientes, paginacion, obtenerRecientes} = useMusic();
  const [pagina, setPagina] = useState(1)
  const {isDark} = useThemeContext()
  const {autenticado} = useAuth()
  const [cargandoLocal, setCargandoLocal] = useState(false)

  useEffect(()=>{
    const cargaData = (pagina) =>{
      setCargandoLocal(true)
      obtenerRecientes(pagina)
      setCargandoLocal(false)
    }

  cargaData(pagina)

  },[pagina])


  return (

    <>
    {cargandoLocal?(<Loader/>):(
            <div className='pt-4'>
              <div className='flex items-center justify-between'>
                <h1 className={`mb-5 text-lg sm:text-2xl font-bold ${!isDark&&"text-[#4e5c77]"}`}>Descubre Nuevos Sonidos</h1>
              </div>
            
            
            <div className={`flex justify-center lg:justify-start gap-3 mb-15 md:gap-6 md:pl-6 flex-wrap w-full ${!isDark&&"text-[#4e5c77]"}`}>
              {cancionesRecientes && cancionesRecientes.map((cancion) =>{
                return(
                  <div key={cancion._id || cancion.IdCancion  } className={`flex-shrink-0 w-50 sm:w-55 h-60 p-3  pb-4 rounded-2xl hover:bg-gradient-to-r from-[#89d6f9] to-[#42c1fc]
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
                                ${autenticado ? "cursor-pointer" : "cursor-not-allowed opacity-50"}
                              `}
                              onClick={() => {
                                if (!autenticado) return;
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
            <div className='relative mb-20 lg:-translate-y-8'>
              <Paginador pagina={pagina} paginacion={paginacion} filtradoo={(nuevaPagina)=>setPagina(nuevaPagina)}/>
            </div>
          
            </div>      
    )}

    </>
  )
}

export default Recientes