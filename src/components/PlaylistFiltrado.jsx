/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { usePlaylist } from '../contexts/PlaylistContext'
import { useLocation, useNavigate } from 'react-router-dom'
import Paginador from './Paginador'
import { useThemeContext } from '../contexts/ThemeContext'
import Loader from './Loader'

export const PlaylistFiltrado = () => {
  const { filtradoPlaylist } = usePlaylist()
  const location = useLocation()
      const [pagina, setPagina] = useState(1)
      const [resultados, setResultados] = useState([])
      const [paginacion, setPaginacion] = useState(null)
      const navigate = useNavigate()
      const {isDark} = useThemeContext()
      const [cargandoLocal, setCargandoLocal] = useState(true);

  const query = new URLSearchParams(location.search).get("search")


    const filtrado = async (pagina_buscar = 1) => {
    try {
      setCargandoLocal(true)
      const res = await filtradoPlaylist(query, pagina_buscar)

      setResultados(res.playlists || [])
      setPaginacion(res.paginacion || null)
      setPagina(res.paginacion?.page || pagina_buscar)
      setCargandoLocal(false)

    } catch (error) {
      console.log("Error filtrando playlists:", error)
    }
  }

    useEffect(() => {
    if (query) {
      filtrado(1)   
    }

    
  }, [query])

  return (
    <>
    {cargandoLocal?(<Loader/>):(
      <div  className='flex flex-col '>
        <h2>Playlists encontradas para: {query}</h2>
        <div className='flex items-start h-fit justify-center lg:justify-start flex-wrap py-5 gap-6' >
          {resultados.map(p => (
              <div className='flex flex-col  group transition'>
                  <div key={p._id} className='relative rounded-t-xl bg-center bg-cover bg-no-repeat w-70 lg:w-90 h-40 overflow-hidden' style={{ 
                      backgroundImage: `url(${p.imagen})`}} >
        <div
          className="
              absolute inset-0 
              flex items-center justify-center
              transition-all duration-300
              group-hover:bg-black/40
          "
        >
          <p
            className="
              text-white text-lg font-semibold
              opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            "
          >
            {p.nombre}
          </p>
        </div>
                      </div>
                  <div className={`bg-[#171e2d] py-3 px-2 flex justify-between ${!isDark&&"bg-[#ccd1ff]"}`}>
                      <p className='font-thin italic text-sm text-[#5d6f95]'>Created By: {p.usuario.username} </p>  
                      <button className='text-[#5d6f95] hover:text-white cursor-pointer transition' onClick={()=> navigate(`/playlist/${p._id}`)}>Ver Detalle</button>  
                  </div>                
              </div>

          ))}        
        </div>

        <div className='mb-20  lg:translate-y-20'>
          {paginacion && (
              <Paginador
                pagina={pagina}
                paginacion={paginacion}
                filtradoo={filtrado}
              />
            )}        
        </div>
  
      </div>      
    )}

     </> 
  )
}
