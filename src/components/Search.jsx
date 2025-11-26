import React from 'react'

const Search = () => {
  return (
    <>
        <div className='w-full h-12 flex items-center justify-between pr-8'>
            <div className='flex w-10 justify-between cursor-pointer'>
                <i className="bi bi-vinyl"></i>
                <p className='ml-2'>DalePlay</p>
            </div>

            <div className='w-3/8'>
                <input type="text" className='w-full bg-[#171e2d] py-1.5 px-3 focus:outline-none 
             focus:ring-0
             focus:border-transparent' placeholder='Buscar canciones, artistas, etc.'/>
            </div>

            <div className='flex items-center gap-3'>
                <div className='bg-white rounded-full w-8 h-8'></div>
                <p>Usuario</p>
            </div>
        </div>
    
    </>
  )
}

export default Search