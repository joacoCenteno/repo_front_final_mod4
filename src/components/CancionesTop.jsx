import React from 'react'
import { useMusic } from '../contexts/MusicContext'
import { useThemeContext } from '../contexts/ThemeContext';

const CancionesTop = () => {
    const {canciones} = useMusic();
    const {isDark} = useThemeContext()

    const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60); 

    const seconds = totalSeconds % 60;
    
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${minutes}:${formattedSeconds}`;
};
  return (
    <>
        <div className='flex flex-col w-full  md:w-1/2 pt-6'>
            <h1 className={`mb-5 text-2xl font-bold ${!isDark&&"text-[#4e5c77]"}`}>Top Canciones</h1>

            <div className='flex flex-col md:mr-6'>
            {canciones && canciones.slice(0, 4).map((cancion) =>{
                return(
                    <>
                    <div key={cancion._id || cancion.IdCancion  } className={` flex justify-between items-center w-full h-15 p-3  pb-4 rounded-2xl hover:bg-gradient-to-r from-[#89d6f9] to-[#42c1fc] 
                        hover:shadow-lg hover:shadow-[#81D4FA]/50 hover:[box-shadow:0_0_20px_#81D4FA,0_0_40px_#81D4FA/60] hover:ring-1 hover:ring-[#81D4FA] group cursor-pointer ${!isDark&&"hover:bg-gradient-to-r from-[#e3e6ff] to-[#a2acff] hover:ring-0 hover:ring-transparent hover:shadow-[#a2acff]/50"}`}
                    >
                        <div className='flex'>
                            <div className={`relative  w-10 h-10 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                                backgroundImage: `url(${cancion.imagen})` 
                            }}>
                            <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                            </div>
                            </div>
                            
                            <div className={`flex flex-col pl-3 ${!isDark&&"text-[#5c6b8a]"}`}>
                            <p className='font-medium text-sm'>{cancion.titulo}</p>
                            <p className=' text-xs'>{cancion.artista}</p>
                            </div>
                        </div>


                        <div className={`flex gap-4 justify-between items-center  text-[#5c6b8a]`}>
                            <p className=' group-hover:text-white text-sm md:text-md'>{formatTime(cancion.duracion)}</p>
                            <i className="bi bi-heart-fill md:text-lg  group-hover:text-white"></i>
                            <i className="bi bi-plus-circle md:text-lg group-hover:text-white"></i>
                        </div>

                    </div>



                    </>
                    
                )
                })}

            </div>

        </div>
    
    </>
  )
}

export default CancionesTop