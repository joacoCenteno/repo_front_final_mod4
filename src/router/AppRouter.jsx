import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import About from '../components/About'
import Dashboard from '../components/Dashboard'
import CreateSong from '../components/CreateSong'
import EditSong from '../components/EditSong'
import GestionCanciones from '../components/GestionCanciones'

const AppRouter = () => {
  return (
    <>

    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/canciones' element={<GestionCanciones/>}/>
      <Route path='/cancion/crear' element={<CreateSong/>}/>
      <Route path='cancion/:id/editar' element={<EditSong/>}/>

      <Route path='/nested-route' element={<Dashboard/>}>
        <Route path='users' element={<p className='text-white text-center'>User</p>}/>
        <Route path='settings' element={<p className='text-white text-center'>Settings</p>}/>
      </Route>

      <Route path='*' element={<Navigate to={'/'} replace/>}/>
    </Routes>
    </>
  )
}

export default AppRouter