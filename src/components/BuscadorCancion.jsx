import React, { useState } from 'react'
import { usePlaylist } from '../contexts/PlaylistContext'
import { useMusic } from '../contexts/MusicContext'
import Paginador from './Paginador'
import { useThemeContext } from '../contexts/ThemeContext'
import Loader from './Loader'


const BuscadorCancion = () => {
    const [query, setQuery] = useState("")
    const [lastQuery, setLastQuery] = useState("");
    const [pagina, setPagina] = useState(1)
    const [resultados, setResultados] = useState([])
    const [paginacion, setPaginacion] = useState(null)
    const {isDark} = useThemeContext()
    const [cargandoLocal, setCargandoLocal] = useState(false)

    const {agregarCancion} = usePlaylist()
    const {filtradoCancion} = useMusic()


    const filtrado = async (pagina_buscar=1, terminoABuscar = lastQuery) => {
        if (!terminoABuscar.trim()) {
                setResultados([])        
                setPaginacion(null) 
                setCargandoLocal(false)     
                return                   
            }

            try {
                let results = await filtradoCancion(terminoABuscar,pagina_buscar)
                setResultados(results.canciones || [])
                setPaginacion(results.paginacion || null)
                setPagina(results.paginacion?.page || pagina_buscar)

                setLastQuery(terminoABuscar)
                

            } catch (error) {
                console.log("Error trayendo playlist:", error)
            }finally{
              setCargandoLocal(false)
            }
        }

      const manejarNuevaBusqueda = () => {
        setCargandoLocal(true)
        setPagina(1);
        filtrado(1, query); 
    }

    const agregadoCancion =async (id) =>{
      setCargandoLocal(true)
      try {
        await agregarCancion(id)
      } catch (error) {
        console.log(error)
      }finally{
        setCargandoLocal(false)
      }
    }
    
  return (
    <>
      <div className='w-full h-fit'>
        <h4 className= {`font-medium text-2xl  ${!isDark&&" text-[#5d6f95]"}`}>Agrega Canciones</h4>
        <div className='w-full py-3'>
          <input
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            placeholder="Buscar canciones"
            className={` w-2/4 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none  ${!isDark&&"focus:ring-[#a2acff]  focus:border-none  text-[#5d6f95]"}`}
          />
          <button onClick={manejarNuevaBusqueda} className={`text-[#5c6b8a] hover:text-[#91dbfd] cursor-pointer ml-3 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA] ${!isDark&&"hover:text-[#a2acff] hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"}`}><i className="bi bi-search"></i> Buscar</button>
        </div>

          {cargandoLocal ? (<Loader/>) : (
      <div className='flex flex-col'>

        <div className='h-fit'>
            {resultados.length > 0 ? (
            resultados.map(cancion => (
                    <div key={cancion._id || cancion.IdCancion  } className={`flex justify-between items-center w-full h-15 px-4 mt-1 rounded-2xl hover:bg-[#171e2d] cursor-pointer ${!isDark&&"hover:bg-[#a2acff] text-[#5d6f95] hover:text-white"}`}
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
                        
                        <div>
                            <i className="bi bi-plus-circle text-lg text-[#5c6b8a] hover:text-white" onClick={()=>{agregadoCancion(cancion._id)}}></i>
                        </div> 
                       


                    </div>  
            ))
          ) : (
            <></>
          )}
          
        </div>
        <div className='text-center mb-15 '>
        <Paginador
          pagina={pagina}
          paginacion={paginacion}
          filtradoo={(p)=> filtrado(p,lastQuery)}
        />
        </div>

      </div>
    )}
    </div>
    </>
  )
}

export default BuscadorCancion