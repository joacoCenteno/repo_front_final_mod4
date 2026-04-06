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
       <div className={`fixed bottom-0 w-screen bg-white/10 backdrop-blur-md shadow-lg h-25 md:h-13 transition-transform duration-600  ease-in-out ${(currentTrack && autenticado) ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'} ${!isDark&&"hover:bg-gradient-to-r from-[#e3e6ff] to-[#a2acff] hover:ring-transparent"} `}>
                    <>
                    <div key={currentTrack._id } className='flex flex-col h-full md:flex-row px-2 sm:px-5 md:px-2 justify-between items-start  md:items-center w-full p-1 md:p-3 
                        '
                    >
                        <div className='flex md:w-50'>
                            <div className={`relative w-10 h-10 rounded-sm bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
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
                            <div className='w-full md:w-1/2'>
                                <input
                                    type="range"
                                    min="0"
                                    max={duration || 0}
                                    value={currentTime || 0}
                                    onChange={(e) => seek(e.target.value)}
                                    className={`w-full h-1 appearance-none cursor-pointer
                                    [&::-webkit-slider-runnable-track]:h-1.5
                                    [&::-webkit-slider-runnable-track]:rounded-lg
                                    ${!isDark&&"[&::-webkit-slider-runnable-track]:bg-black/20"
                                    }

                                    [&::-webkit-slider-thumb]:appearance-none
                                    [&::-webkit-slider-thumb]:h-1.5
                                    [&::-webkit-slider-thumb]:w-1.5
                                    [&::-webkit-slider-thumb]:rounded-full
                                    ${isDark 
                                    ? "[&::-webkit-slider-thumb]:bg-white" 
                                    : "[&::-webkit-slider-thumb]:bg-black"
                                    }
                                    [&::-webkit-slider-thumb]:shadow-md
                                    
                                `}
                                    style={{
                                    background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
                                    }}
                                />
                            </div>



                        <div className='flex gap-9 w-full md:w-fit mr-5 justify-center items-center'>
                            <div className='flex items-center gap-4'>
                                <i className="bi bi-arrow-left-circle flex items-center cursor-pointer text-2xl" onClick={prevTrack}></i>
                                <button onClick={togglePlay} className='cursor-pointer'>
                                    {isPlaying ? <i className="bi bi-pause-circle flex items-center text-2xl"></i> : <i className="bi bi-play-circle flex items-center text-2xl"></i>}
                                </button>
                                <i className="bi bi-arrow-right-circle flex items-center text-2xl cursor-pointer" onClick={nextTrack}></i>
                                
                
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
        

    </>
  )
}

export default Reproductor