import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useMusic } from '../contexts/MusicContext';
import { useThemeContext } from '../contexts/ThemeContext';

const GestionCanciones = () => {

  const {canciones, eliminarCancion} = useMusic();
  const navigate = useNavigate()
  const {isDark} = useThemeContext()


  
  const handleDelete = async (id) =>{
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
        await eliminarCancion(id)
        navigate('/canciones')
      }catch(error){
        console.log("Error: ",error)
      }
    }


  }
  return (
    <>
    <div className={`w-full min-h-screen bg-[#121825] text-[#EEEEEE] px-7 font-display ${!isDark&&"bg-white"}`}>
    <div className='h-10 flex justify-between items-center pt-3 mb-7'>
        <i className="bi bi-arrow-left text-3xl text-[#5c6b8a] transition cursor-pointer " onClick={()=>{navigate('/')}}></i>
        <a href="https://github.com/joacoCenteno" target='_blank'><i className="bi bi-github text-[#5c6b8a] text-3xl transition cursor-pointer hover:text-white"></i></a>
    </div>
    <h1 className={`font-bold text-2xl mb-5 ${!isDark&&"text-[#4e5c77]"}`}>Gestión de Canciones</h1>
    <div className='flex items-center justify-center md:justify-start flex-wrap gap-6'>
        {canciones && canciones.map((cancion) =>{
          return(
            <div key={cancion._id || cancion.IdCancion  } className={`flex-shrink-0 w-55 h-60 p-3  pb-4 rounded-2xl hover:bg-gradient-to-r from-[#89d6f9] to-[#42c1fc]
                      hover:shadow-sm hover:shadow-[#81D4FA]/50 hover:[box-shadow:0_0_20px_#81D4FA,0_0_40px_#81D4FA/60] hover:ring-1 hover:ring-[#81D4FA] group cursor-pointer ${!isDark&&"hover:bg-gradient-to-r from-[#e3e6ff] to-[#a2acff] hover:ring-transparent"}`}
             >
              <div className={`relative  w-full h-40 rounded-xl bg-cover bg-center bg-no-repeat overflow-hidden `} style={{ 
                backgroundImage: `url(${cancion.imagen})` 
              }}>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#91dbfd] to-[#42c1fc] opacity-0  group-hover:opacity-40">
              </div>
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                    <i className="bi bi-trash3 text-4xl text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-200 z-40 hover:scale-90"
                     onClick={(e)=>{e.stopPropagation(); handleDelete(cancion._id)}}></i>
                     <i className="bi bi-pencil-square text-4xl text-white
                     opacity-0 group-hover:opacity-100 transition-all duration-200 z-40 hover:scale-90" onClick={()=> {navigate(`/cancion/${cancion._id }/editar`)}}></i>
    </div>
              </div>

              <p className={`font-medium mt-3 ${!isDark&&"text-[#4e5c77]"}`}>{cancion.titulo}</p>
              <p className={`font-light ${!isDark&&"text-[#4e5c77]"}`}>{cancion.artista}</p>
            </div>
            
          )
        })}
                <i className="bi bi-plus-circle cursor-pointer text-5xl text-[#5c6b8a] transition h-fit " onClick={()=>{navigate('/cancion/crear')}}></i>

      </div>

      </div>
    </>
  )
}

export default GestionCanciones