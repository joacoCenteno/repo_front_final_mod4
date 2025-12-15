import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { usePlaylist } from '../contexts/PlaylistContext';
import Loader from './Loader';

const CancionPlaylistAccion = ({id_cancion}) => {
    const [open, setOpen] = useState(false)
    const menuRef = useRef(null)
    const {eliminarCancion} = usePlaylist()
    const [cargandoLocal,setCargandoLocal] = useState(false)

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
    
        const result = await Swal.fire({
          background: '#171e2d',
          color: '#fff',
          title: '¿Estás seguro de eliminar cancion?',
          text: "¡No podrás revertir esto!",
          icon: 'warning' ,
          showCancelButton: true,
          confirmButtonText: "Si, eliminar",
          cancelButtonText: "Cancelar",
          confirmButtonColor: "red"
        });
    
        if(result.isConfirmed){
          setCargandoLocal(true)
          try{
            await eliminarCancion(id)
            // await cargarUsuarioCompleto()
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
            <button disabled={cargandoLocal}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700"
              onClick={()=>{handleDelete(id_cancion)}}
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

export default CancionPlaylistAccion