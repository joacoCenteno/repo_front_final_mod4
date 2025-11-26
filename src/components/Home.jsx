import React from 'react'
import { useMusic } from '../contexts/MusicContext'
import Aside from './Aside';
import Search from './Search';
import CancionesTop from './CancionesTop';
import PlaylistView from './PlaylistView';
import Reproductor from './Reproductor';
import Loader from './Loader';

const Home = () => {
  const {canciones, loading} = useMusic();

  return (
    <>
    {loading && <Loader />}

    {!loading && (
      <div className='flex flex-col font-display'>
      <div className=' relative flex'>

    

      <Aside/>

      <div className='h-screen flex-col pl-5 bg-[#121825] text-[#EEEEEE] w-5/6'>
        <Search/>
        <div className='pt-4'>
          <div className='flex items-center justify-between pr-5'>
            <h1 className='mb-5 text-2xl font-bold'>Nuevos Lanzamientos</h1>
            <p className='text-sm text-[#5d6f95] hover:text-white transition cursor-pointer'>Ver Todos</p>

          </div>
        
        
        <div className='flex gap-6 overflow-hidden pr-5 w-full flex-nowrap'>
          {canciones && canciones.map((cancion) =>{
            return(
              <div key={cancion._id || cancion.IdCancion  } className='flex-shrink-0 w-55 h-60 p-3  pb-4 rounded-2xl hover:bg-gradient-to-r from-[#89d6f9] to-[#42c1fc]
                    hover:shadow-lg hover:shadow-[#81D4FA]/50 hover:[box-shadow:0_0_20px_#81D4FA,0_0_40px_#81D4FA/60] hover:ring-1 hover:ring-[#81D4FA] group cursor-pointer'
              >
                <div className={`relative  w-full h-40 rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                  backgroundImage: `url(${cancion.imagen})` 
                }}>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                </div>
                      <div className="absolute inset-0 flex items-center justify-center">
        <i className="bi bi-play-circle text-5xl text-white
          opacity-0 group-hover:opacity-100 transition-all duration-200">
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

        <div className='flex justify-between'>
          <CancionesTop/>
          <PlaylistView/>
        </div>
      </div>
      
      </div>
  <Reproductor/>
      </div>


    )}
  
    </>
  )
}

export default Home