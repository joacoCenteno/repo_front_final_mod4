import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePlaylist } from '../contexts/PlaylistContext';
import { useAuth } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';


const CrearPlaylist = () => {
    const navigate = useNavigate();
    const {crearPlaylist} = usePlaylist()
    const {cargarUsuarioCompleto} = useAuth()
    const {isDark} = useThemeContext()

    const [nombre, setNombre] = useState("")
    const [imagen, setImagen] = useState("")
    const [error, setError] = useState("")

    const validarLink = (value) =>{
      try {
        const url = new URL(value);

        if(url.protocol !== "http:" && url.protocol !== "https:"){
          return "El link debe empezar con http:// o https://";
        }

        return ""
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return "El link ingresado no es válido";
      }
    }

    const handleSubmit = async (e) => {
    e.preventDefault();
     if (nombre.trim() === "") {
        setError("Por favor, ingrese nombre de playlist.");
        return;
    }



    
    try {
        if(imagen.trim()===""){
            await crearPlaylist({nombre})
        }else{
            const validar_link = validarLink(imagen)
            if(validar_link){
              setError(validar_link);
              return
            }
            await crearPlaylist({nombre, imagen})
        }
      
      await cargarUsuarioCompleto()
      navigate('/');
    } catch (error) {
      setError("Error al crear la playlist")
      console.log(`Error: ${error}`)
    }
  }

  return (
    <>
            <div className={`bg-[#121825] px-2 sm:px-0 text-[#EEEEEE] h-screen flex flex-col justify-center items-center font-display  ${!isDark&&"dark:bg-[#f5f6ff] text-[#121825]"}`}>
            <div className='h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a] ' onClick={()=>{navigate(-1)}}>
        <i className="bi bi-arrow-left text-3xl " ></i>
        <p >
          Regresar
        </p>
    </div>
        
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77]"}`}>Crear Playlist</h2>

        

        <form action="post" onSubmit={handleSubmit} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}`}>
              <p className='text-red-500'>{error}</p>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Titulo de Playlist' value={nombre} onChange={(e)=> setNombre(e.target.value)}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='URL Imagen (OPCIONAL)' value={imagen} onChange={(e)=> setImagen(e.target.value)}/>

            <button type="submit" className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Crear</button>
        </form>
    </div>
    </>
  )
}

export default CrearPlaylist