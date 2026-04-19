import {React} from 'react'
import { useNavigate } from 'react-router-dom'
import { useMusic } from '../contexts/MusicContext'
import { useForm } from 'react-hook-form'
import { useThemeContext } from '../contexts/ThemeContext'
import Loader from './Loader'

const CreateSong = () => {
    const navigate = useNavigate()
    const {crearCancion} = useMusic()
    const {isDark} = useThemeContext()

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        mode: 'onChange' // <--- Esto hace que valide mientras escribes
    })

    const onSubmit = async (data) => {
      const {titulo, artista, album, duracion, generos, imagen, url} = data
  
      const generosArray = generos
        .split(',')
        .map(genero => genero.trim())
        .filter(genero => genero.length > 0);

      try {
        await crearCancion({titulo, artista, album, duracion, generos:generosArray, imagen, url})
        navigate('/canciones');

      } catch (error) {
        console.log(`Error: ${error}`)
      }
  }


  return (

    <>
    {isSubmitting && <Loader />}
    
    <div className='bg-[#121825] px-2 sm:px-0 text-[#EEEEEE] h-screen flex flex-col justify-center items-center font-display'>
            <div className='h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a] hover:text-white' onClick={()=>{navigate(-1)}}>
        <i className="bi bi-arrow-left text-3xl " ></i>
        <p >
          Regresar
        </p>
    </div>
        
        <h2 className='font-bold text-2xl'>Insertar Cancion</h2>

        

        <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto
             '>
            <input {...register('titulo', {required:'Titulo es requerido'})} type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Titulo de Cancion'/>
            {errors.titulo && <p className='text-red-400 text-sm'>{errors.titulo.message}</p>}
            <input {...register('artista', {required:'Artista es requerido'})} type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Artista'/>
            {errors.artista && <p className='text-red-400 text-sm'>{errors.artista.message}</p>}
            <input {...register('album', {required:'Album es requerido'})} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Album' />
            {errors.album && <p className='text-red-400 text-sm'>{errors.album.message}</p>}
            <input {...register('duracion', {required: 'Duracion es requerida',valueAsNumber: true, min: {
              value: 1,
              message: "El valor debe ser mayor a 0"
            }})} type="number" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Duracion (seg)'/>
            {errors.duracion && <p className='text-red-400 text-sm'>{errors.duracion.message}</p>}
            <input {...register('generos', {required:'Generos es requerido'})} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Generos (Separados por ,)'/>
            {errors.generos && <p className='text-red-400 text-sm'>{errors.generos.message}</p>}
            <input {...register('imagen', {required:'Imagen es requerida', 
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/i,
                    message: "Debes ingresar una URL de imagen válida (http/https y extensión .jpg, .png, etc.)"
                  }
            })} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Link Imagen'/>
            {errors.imagen && <p className='text-red-400 text-sm'>{errors.imagen.message}</p>}
            <input {...register('url', {required:'Url es requerido', 
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:mp3|wav|ogg))$/i,
                    message: "Debes ingresar una URL de audio válida (http/https y extensión .mp3, .wav, .ogg)"
                  }
            })} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}   placeholder='Url Cancion'/>
            {errors.url && <p className='text-red-400 text-sm'>{errors.url.message}</p>}
            <button type="submit" disabled={isSubmitting} className='mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg'>Crear</button>
        </form>
    </div>
    </>
  )
}

export default CreateSong