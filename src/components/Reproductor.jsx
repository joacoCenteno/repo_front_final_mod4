import React from 'react'
import { useThemeContext } from '../contexts/ThemeContext';
import { useAudio } from '../contexts/AudioContext';
import { useAuth } from '../contexts/AuthContext';

const Reproductor = () => {
    const {isDark} = useThemeContext()
    const {currentTrack, isPlaying, togglePlay, nextTrack, prevTrack, currentTime, duration, seek, soundOff, isSoundOn} = useAudio(); 
    const {autenticado} = useAuth()

    const formatTime = (time) => {
            if (!time) return "0:00";

            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);

            return `${min}:${sec < 10 ? "0" : ""}${sec}`;
    };


  return (
    <>
     {!currentTrack || !autenticado ? <></> :
    
  
       <div className={`fixed bottom-0 w-screen bg-gradient-to-r text-white pb-4 from-[#91dbfd] to-[#42c1fc] rounded-sm h-13 ${!isDark&&"hover:bg-gradient-to-r from-[#e3e6ff] to-[#a2acff] hover:ring-transparent"}`}>
                    <>
                    <div key={currentTrack._id } className=' flex justify-between items-center w-full h-15 p-3  pb-4 
                        '
                    >
                        <div className='flex'>
                            <div className={`relative  w-10 h-10 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                                backgroundImage: `url(${currentTrack.imagen})` 
                            }}>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
                            </div>
                            </div>
                            
                            <div className='flex flex-col pl-3'>
                            <p className='font-medium text-sm'>{currentTrack.titulo}</p>
                            <p className=' text-xs'>{currentTrack.artista}</p>
                            </div>
                        </div>
                            <div className='w-1/2'>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime || 0}
                                    onChange={(e) => seek(e.target.value)}
                                    className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-white/30
                                            [&::-webkit-slider-thumb]:appearance-none
                                            [&::-webkit-slider-thumb]:h-4
                                            [&::-webkit-slider-thumb]:w-4
                                            [&::-webkit-slider-thumb]:rounded-full
                                            [&::-webkit-slider-thumb]:bg-white
                                            [&::-webkit-slider-thumb]:shadow-md
                                            [&::-webkit-slider-thumb]:transition-transform
                                            hover:[&::-webkit-slider-thumb]:scale-125"
                                    style={{
                                    background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
                                    }}
                                />
                            </div>



                        <div className='flex gap-9 mr-5  items-center'>
                            <div className='flex gap-4'>
                                <i class="bi bi-arrow-left-circle cursor-pointer text-2xl" onClick={prevTrack}></i>
                                <button onClick={togglePlay} className='cursor-pointer'>
                                    {isPlaying ? <i className="bi bi-pause-circle text-2xl"></i> : <i className="bi bi-play-circle text-2xl"></i>}
                                </button>
                                <i class="bi bi-arrow-right-circle text-2xl cursor-pointer" onClick={nextTrack}></i>
                                
                
                            </div>
                            <div className='w-10 text-center'>
                                <p>
                                    {formatTime(duration - currentTime)}
                                </p>                                
                            </div>

                            <button onClick ={soundOff} className='cursor-pointer'>
                                {isSoundOn ? <i className="bi bi-volume-mute text-2xl" ></i> : <i class="bi bi-volume-down text-2xl"></i>  }
                                 
                                         
                            </button>

                        </div>

                    </div>


                    </>
        

        </div>
          } 

    </>
  )
}

export default Reproductor