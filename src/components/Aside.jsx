import React from 'react'
import { useNavigate } from 'react-router-dom'

const Aside = () => {
    const navigate = useNavigate()

  return (
    <>
        <div className='w-1/6 bg-[#171e2d] h-screen relative flex flex-col gap-14 pt-12 pl-6 text-[#5c6b8a]'>
            {/* <div>
                <p>MENU</p>

                <ul>
                    <li>Explorar</li>
                    <li>Albums</li>
                    <li>Artistas</li>
                </ul>
            </div> */}

            <div className=''>
                <p className='text-[#5d6f95] font-bold mb-3'>PANEL</p>

                <ul>
                    <li className='hover:text-[#91dbfd] cursor-pointer py-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]' onClick={()=>navigate('/canciones')}>Gestión Canciones</li>
                    <li  className='hover:text-[#91dbfd] cursor-pointer hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Gestión Paylist</li>
                </ul>
            </div>

            <div className=''>
                <p className='text-[#5d6f95] font-bold '>MI MÚSICA</p>

                <ul>
                    <li  className='hover:text-[#91dbfd] cursor-pointer py-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Recientemente Reproducidas</li>
                    <li className='hover:text-[#91dbfd] cursor-pointer hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Canciones Favoritas</li>
                </ul>
            </div>

            <div className=''>
                <p className='text-[#5d6f95] font-bold '>PLAYLIST</p>

                <ul >
                    <li className='hover:text-[#91dbfd] cursor-pointer py-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Relajo</li>
                    <li className='hover:text-[#91dbfd] cursor-pointer pb-2 hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Verano</li>
                    <li className='hover:text-[#91dbfd] cursor-pointer hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]'>Rock Nacional</li>
                </ul>
            </div>
        
        </div>
    </>
  )
}

export default Aside