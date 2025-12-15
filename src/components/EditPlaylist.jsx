/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { usePlaylist } from '../contexts/PlaylistContext';
import { useAuth } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import Loader from './Loader';

const EditPlaylist = () => {
    const {id} = useParams()
    const navigate = useNavigate();
    const {actualizarPlaylist} = usePlaylist()
    const {cargarUsuarioCompleto, usuario} = useAuth()
    const {isDark} = useThemeContext()
        const {register, reset, handleSubmit, formState: {errors, isSubmitting}} = useForm({
  mode: 'onChange' // <--- Esto hace que valide mientras escribes
})

    const playlist = useMemo(() => {
          if(usuario && usuario.playlists){
            return usuario.playlists.find(p => p._id === id)
            
          }
        }, [id, usuario]);

    useEffect(() => {
    if (playlist) {
        reset({
          nombre: playlist.nombre,
          imagen: playlist.imagen || ""
        })
    }
    }, [playlist])

  

    const onSubmit = async (data) => {
      const {nombre, imagen} = data
    const regexImagen = /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg)$/i;
  

      if (imagen && imagen.trim() !== "" && !regexImagen.test(imagen)) {
        console.log("Envío bloqueado: URL inválida");
        return; 
      }
    try {
      
    if (!imagen || imagen.trim() === "") {
          await actualizarPlaylist(id,{ nombre: nombre });
        } else {
          await actualizarPlaylist(id,{ nombre: nombre, imagen: imagen });
        }
      
      await cargarUsuarioCompleto()
      navigate(`/playlist/${id}`);
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  }
  return (
    <>
     {isSubmitting ? (<Loader/>) : ( 
                <div className={`bg-[#121825] px-2 sm:px-0 text-[#EEEEEE] h-screen flex flex-col justify-center items-center font-display ${!isDark&&"bg-[#f5f6ff] text-[#121825]"}`}>
                <div className='h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a]' onClick={()=>{navigate(-1)}}>
            <i className="bi bi-arrow-left text-3xl " ></i>
            <p >
              Regresar
            </p>
        </div>
            
            <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77]"}`}>Actualizar Playlist</h2>

            

            <form action="post" onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
                `}>
                <input {...register('nombre', {required:'Nombre de playlist requerido'})} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Titulo de Playlist' />
                {errors.nombre && <p className='text-red-400 text-sm'>{errors.nombre.message}</p>}
                <input {...register('imagen', {
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))?$/i,
                    message: "Debes ingresar una URL de imagen válida (http/https y extensión .jpg, .png, etc.)"
                  }})} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder="Imagen Playlist"/>
                {errors.imagen && <p className='text-red-400 text-sm'>{errors.imagen.message}</p>}
                <button type="submit" disabled={isSubmitting} className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
                  hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Actualizar</button>
            </form>
        </div>      
     )} 

    </>
  )
}

export default EditPlaylist