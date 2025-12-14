/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MusicContext = createContext();

// const API = "https://repo-back-final-mod4.onrender.com"
const API = "https://repo-back-final-mod4.onrender.com"

export const MusicProvider = ({children}) =>{
    const [canciones, setCanciones] = useState([]);
    const [loading, setLoading] = useState(false)
    const [paginacion,setPaginacion] = useState([])
    const [cancionesRecientes, setCancionesRecientes] = useState([])
    const [cancionesGenero, setCancionesGenero] = useState([])

    const fetchCanciones = async () =>{
        setLoading(true)
        try {
            const {data} = await axios.get(`${API}/canciones`)
            setCanciones(data)
        } catch (error) {
            console.error("Error al hacer el fetch a canciones", error)
        }finally{
            setLoading(false)
        }
    }

    const obtenerRecientes = async (page=1) =>{
        const res = await axios.get(`${API}/canciones/recientes?page=${page}`)
        setCancionesRecientes(res.data.canciones)
        setPaginacion(res.data.paginacion)
    }

    const obtenerPorGenero = async (genero,page=1) =>{
        try {
            const res = await axios.get(`${API}/canciones/filtros?genero=${genero}&page=${page}`)
            setCancionesGenero(res.data.canciones)
            setPaginacion(res.data.paginacion)            
        } catch (error) {
            console.error("Error al obtener generos ",error)
        }

    }


    //POST
    const crearCancion = async (cancion) => {
        const {data} = await axios.post(`${API}/canciones/crear`,cancion)
        setCanciones((prev) => [...prev,data])
    }

    const actualizarCancion = async (id, datos_actualizados) =>{
        const {data} = await axios.put(`${API}/canciones/actualizar/${id}`, datos_actualizados)
        setCanciones((prev)=>
            prev.map((cancion) => (cancion._id === id ? data.cancion : cancion))
        )
    }

    const eliminarCancion = async (id) =>{
        await axios.delete(`${API}/canciones/eliminar/${id}`)
        setCanciones((prev) => prev.filter((cancion) => cancion._id !== id))
    }

    const filtradoCancion = async (query, pagina) =>{
        const {data} = await axios.get(`${API}/canciones/buscar?q=${query}&page=${pagina}`)
        return data
    }

    useEffect(() => {
      fetchCanciones()
    }, [])

    
    
    return(
        <MusicContext.Provider value={{canciones,loading, crearCancion,actualizarCancion, eliminarCancion, filtradoCancion, paginacion, cancionesRecientes, obtenerRecientes, cancionesGenero, obtenerPorGenero}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)