import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const Dashboard = () => {

    const navigate = useNavigate();
  return (
    <>
        <div className=' relative flex flex-col items-center justify-center min-h-screen bg-[linear-gradient(90deg,#e3ffe7_0%,#d9e7ff_100%)]'>

            <div className='bg-white/30 rounded border border-white p-8'>
                <h1 className='text-4xl font-bold text-black mb-4'>Dashboard</h1>

                <div className='text-center'>
                
                    <Link to='users' className='text-green-300 mr-2'>Users</Link>
                    
                    <Link to='settings' className='text-green-300'>Settings</Link>
                </div>

                <Outlet/>

                <div class="absolute inset-x-0 bottom-0 h-1/4 
              bg-[linear-gradient(to_top,white,transparent)]">
  </div>

            </div>


        <button 
            className="mt-6 px-4 py-2 bg-green-400 text-gray-800 font-semibold rounded hover:bg-green-500 transition"
            onClick={() => {
                navigate('/');  
            }}
        >
        Back to Home  
        </button>
        </div>



        <div className='min-h-screen'>
            <h2 className='text-[rgb(121,171,255)] font-bold text-3xl'>Hola</h2>
            <h2 className='text-[rgb(164,249,185)] font-bold text-3xl'>Hola</h2>
        </div>
    </>
  )
}

export default Dashboard