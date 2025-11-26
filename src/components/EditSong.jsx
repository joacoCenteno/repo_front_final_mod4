/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMusic } from '../contexts/MusicContext'

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
      await actualizarCancion(id,{titulo, artista, album, duracion, generos:generosArray, imagen, url})
      navigate('/canciones');
    } catch (error) {
      setError("Error al actualizar la cancion")
      console.log(`Error: ${error}`)
    }
  }



  return (
        <>
    <div className='bg-[#121825] text-[#EEEEEE] h-screen flex flex-col justify-center items-center font-display'>
        <div className='h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a] hover:text-white' onClick={()=>{navigate(-1)}}>
        <i className="bi bi-arrow-left text-3xl " ></i>
        <p >
          Regresar
        </p>
    </div>
        <h2 className='font-bold text-2xl'>Editar Cancion</h2>

        

        <form onSubmit={handleSubmit} className='flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto'>
          <p className='text-red-500'>{error}</p>
            <input type="text"  className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Titulo de Cancion' value={titulo} onChange={(e)=> setTitulo(e.target.value)}/>
            <input type="text"  className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Artista' value={artista} onChange={(e)=> setArtista(e.target.value)}/>
            <input type="text" className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Album' value={album}  onChange={(e)=> setAlbum(e.target.value)}/>
            <input type="number" className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Duracion (seg)' value={duracion}  onChange={(e)=> setDuracion(e.target.value)}/>
            <input type="text" className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Generos (Separados por ,)' value={generos}  onChange={(e)=> setGeneros(e.target.value)}/>
            <input type="text" className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Link Imagen' value={imagen}  onChange={(e)=> setImagen(e.target.value)}/>
            <input type="text" className='border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc] focus:outline-none' placeholder='Url Cancion' value={url}  onChange={(e)=> setUrl(e.target.value)}/>
            <button type="submit" className='mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg'>Actualizar</button>
        </form>
    </div>
    
    </>
  )
}

export default EditSong