import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import CreateSong from '../components/CreateSong'
import EditSong from '../components/EditSong'
import GestionCanciones from '../components/GestionCanciones'
import Recientes from '../components/Recientes'
import Layout from '../components/Layout'
import Autenticacion from '../components/Autenticacion'
import Registro from '../components/Registro'
import Login from '../components/Login'
import { useAuth } from '../contexts/AuthContext'
import PlaylistDetalle from '../components/PlaylistDetalle'
import RequierePermiso from '../components/RequierePermiso'
import CrearPlaylist from '../components/CrearPlaylist'
import EditPlaylist from '../components/EditPlaylist'
import { PlaylistFiltrado } from '../components/PlaylistFiltrado'
import FiltroGeneroCancion from '../components/FiltroGeneroCancion'

const AppRouter = () => {
  const {autenticado, cargando} = useAuth()
  return (
    <>

    <Routes>

      <Route element={<Layout/>}> 
            <Route path='/' element={<Home/>}/>
            <Route path='/recientes'element={cargando ? <></> : autenticado ? <Recientes /> : <Navigate to="/autenticacion" /> }/>
            <Route path='/playlist/:id' element={<RequierePermiso permiso={"read:playlists"}><PlaylistDetalle/></RequierePermiso>}/>
            <Route path='/playlists' element={<RequierePermiso permiso={"read:playlists"}><PlaylistFiltrado/></RequierePermiso>}/> 
            <Route path='/generos/:genero' element={<RequierePermiso permiso={"read:canciones"}><FiltroGeneroCancion/></RequierePermiso>}/> 
      </Route>

      <Route path='/autenticacion' element={<Autenticacion/>}> 
            <Route index element={<Registro/>} />
            <Route path='registro' element={<Registro/>}/>
            <Route path='login' element={<Login/>}/>
      </Route>

      <Route path='/canciones' element={<RequierePermiso permiso={"create:canciones"}><GestionCanciones/></RequierePermiso>}/>
      <Route path='/cancion/crear' element={<RequierePermiso permiso={"create:canciones"}><CreateSong/></RequierePermiso>}/>
      <Route path='/cancion/:id/editar' element={<RequierePermiso permiso={"update:canciones"}><EditSong/></RequierePermiso>}/>

      <Route path='/playlist/crear' element={<RequierePermiso permiso={"create:playlist"}><CrearPlaylist/></RequierePermiso>}/>
      <Route path='/playlist/:id/editar' element={<RequierePermiso permiso={"update:playlist"}><EditPlaylist/></RequierePermiso>}/>       

      <Route path='*' element={<Navigate to={'/'} replace/>}/>
    </Routes>
    </>
  )
}

export default AppRouter