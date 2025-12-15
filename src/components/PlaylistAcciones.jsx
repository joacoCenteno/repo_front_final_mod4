import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePlaylist } from '../contexts/PlaylistContext'
import Swal from 'sweetalert2'
import { useAuth } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext'
import Loader from './Loader'

const PlaylistAcciones = () => {
    const {id} = useParams()
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const navigate = useNavigate()
    const {cargarUsuarioCompleto} = useAuth()
    const {eliminarPlaylist} = usePlaylist()
    const {isDark} = useThemeContext()
    const [cargandoLocal, setCargandoLocal] = useState(false);

    useEffect(() => {
      const handleClickOutside = (event) =>{
        if(menuRef.current && !menuRef.current.contains(event.target)){
            setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

      const handleDelete = async (id) =>{
       setCargandoLocal(false)
        let result = null
        if(isDark){
           result = await Swal.fire({
            background: '#171e2d',
            color: '#fff',
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning' ,
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "red"
          });          
        }else{
          result = await Swal.fire({
            background: '#fff',
            color: '#5d6f95',
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning' ,
            showCancelButton: true,
            confirmButtonText: "Si, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "red"
          });  
        }

    
        if(result.isConfirmed){
          try{
            setCargandoLocal(true)
            await eliminarPlaylist(id)
            await cargarUsuarioCompleto()
            navigate('/')
          }catch(error){
            console.log("Error: ",error)
          }finally{
            setCargandoLocal(false)
          }
        }    
      }
    
  return (
    <>
    {cargandoLocal ? (<Loader/>) : (
      <div className="relative" ref={menuRef}>

        <i className="bi bi-three-dots-vertical cursor-pointer" onClick={() => setOpen(!open)}></i>

        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-[#171e2d] rounded shadow-lg text-white z-50">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={() => navigate(`/playlist/${id}/editar`)}
            >
              Editar
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={()=>{handleDelete(id)}}
            >
              Eliminar
            </button>
          </div>
        )}
      </div>      
    )}

    </>
  )
}

export default PlaylistAcciones