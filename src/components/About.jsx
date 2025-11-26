import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate();
  return (
    <>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-800'>
        <h1 className='text-4xl font-bold text-pink-400 mb-4'>Sobre Nosotros</h1>
        <Link to='/' className='text-pink-400'>Go to Home</Link>

        <button 
            className="mt-6 px-4 py-2 bg-pink-400 text-gray-800 font-semibold rounded hover:bg-pink-500 transition"
            onClick={() => {
                navigate(-1);  
            }}
        >
        Back to Ruta Anterior    
        </button>

    </div>
    </>
  )
}

export default About