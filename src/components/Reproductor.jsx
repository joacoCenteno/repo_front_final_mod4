import React from 'react'
import { useMusic } from '../contexts/MusicContext'

const Reproductor = () => {
    const  {canciones} = useMusic();

        const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60); 

    const seconds = totalSeconds % 60;
    
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${minutes}:${formattedSeconds}`;
};

  return (
    <>
        <div className=' fixed bottom-0 bg-gradient-to-r text-white pb-4 from-[#91dbfd] to-[#42c1fc] rounded-sm h-13 w-full '>
            {canciones && canciones.slice(0, 1).map((cancion) =>{
                return(
                    <>
                    <div key={cancion._id || cancion.IdCancion  } className=' flex justify-between items-center w-full h-15 p-3  pb-4 
                        '
                    >
                        <div className='flex'>
                            <div className={`relative  w-10 h-10 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                                backgroundImage: `url(${cancion.imagen})` 
                            }}>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                            </div>
                            </div>
                            
                            <div className='flex flex-col pl-3'>
                            <p className='font-medium text-sm'>{cancion.titulo}</p>
                            <p className=' text-xs'>{cancion.artista}</p>
                            </div>
                        </div>

                        <div className='w-2/4 rounded h-2 bg-white'></div>


                        <div className='flex gap-9 mr-5 items-center'>
                            <div className='flex gap-4'>
                                <i className="bi bi-pause-circle text-2xl"></i>
                                <i className="bi bi-shuffle text-2xl"></i>
                            </div>
                            <p className='text-lg'>{formatTime(cancion.duracion)}</p>

                            <i className="bi bi-volume-mute text-2xl"></i>
                        </div>

                    </div>


                    </>
                    
                )
                })}

        </div>

    </>
  )
}

export default Reproductor