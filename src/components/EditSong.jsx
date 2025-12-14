/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMusic } from '../contexts/MusicContext'
import { useThemeContext } from '../contexts/ThemeContext'

const EditSong = () => {
    const navigate = useNavigate()

    const [titulo, setTitulo] = useState("")
    const [artista, setArtista] = useState("")
    const [album, setAlbum] = useState("")
    const [duracion, setDuracion] = useState(0)
    const [generos, setGeneros] = useState("")
    const [imagen, setImagen] = useState("")
    const [url, setUrl] = useState("")
    const [error, setError] = useState("")
    const {isDark} = useThemeContext()

    const {canciones, actualizarCancion} = useMusic()

    const {id} = useParams();

    useEffect(() => {
        const currentCancion = canciones.find((cancion) => cancion._id === id);
        if (currentCancion) {
            setTitulo(currentCancion.titulo);
            setArtista(currentCancion.artista);
            setAlbum(currentCancion.album);
            setDuracion(currentCancion.duracion);
            setGeneros(currentCancion.generos.join(', '));
            setImagen(currentCancion.imagen);
            setUrl(currentCancion.url);
        }
    }, [canciones,id])

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
     if (titulo.trim() === "" || artista.trim() === "" || album.trim() === "" || generos.trim() === "" || imagen.trim() === "" || url.trim() === "" || duracion <= 0) {
        setError("Por favor, complete todos los campos correctamente.");
        return;
    }

    const generosArray = generos
        .split(',')
        .map(genero => genero.trim())
        .filter(genero => genero.length > 0);
    
    try {
      const validar_link = validarLink(imagen)
          if(validar_link){
              setError(validar_link);
          return
      }
      await actualizarCancion(id,{titulo, artista, album, duracion, generos:generosArray, imagen, url})
      navigate('/canciones');
    } catch (error) {
      setError("Error al actualizar la cancion")
      console.log(`Error: ${error}`)
    }
  }



  return (
        <>
    <div className={`bg-[#121825] text-[#EEEEEE] h-screen flex flex-col justify-center items-center font-display ${!isDark&&"bg-[#f5f6ff] text-[#121825]"}`}>
        <div className='h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a] ' onClick={()=>{navigate(-1)}}>
        <i className="bi bi-arrow-left text-3xl " ></i>
        <p >
          Regresar
        </p>
    </div>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77]"}`}>Editar Cancion</h2>

        

        <form onSubmit={handleSubmit} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}`}>
          <p className='text-red-500'>{error}</p>
            <input type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Titulo de Cancion' value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>
            <input type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Artista' value={artista} onChange={(e)=> setArtista(e.target.value)}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Album' value={album}  onChange={(e)=> setAlbum(e.target.value)}/>
            <input type="number" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Duracion (seg)' value={duracion}  onChange={(e)=> setDuracion(e.target.value)}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Generos (Separados por ,)' value={generos}  onChange={(e)=> setGeneros(e.target.value)}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Link Imagen' value={imagen}  onChange={(e)=> setImagen(e.target.value)}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}   placeholder='Url Cancion' value={url}  onChange={(e)=> setUrl(e.target.value)}/>
            <button type="submit" className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Actualizar</button>
        </form>
    </div>
    
    </>
  )
}

export default EditSong