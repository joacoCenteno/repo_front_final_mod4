/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";

const MusicContext = createContext();

const API = "https://repo-back-final-mod4.onrender.com"

export const MusicProvider = ({children}) =>{
    const [canciones, setCanciones] = useState([]);
    const [loading, setLoading] = useState(false)
    const [paginacion,setPaginacion] = useState([])
    const [cancionesGenero, setCancionesGenero] = useState([])

    const fetchCanciones = async () =>{
        setLoading(true)
        try {
            const {data} = await axios.get(`/canciones`)
            setCanciones(data)
        } catch (error) {
            console.error("Error al hacer el fetch a canciones", error)
        }finally{
            setLoading(false)
        }
    }

    const obtenerRecientes = async (page=1) =>{
        const res = await axios.get(`/canciones/recientes?page=${page}`)
        
        setPaginacion(res.data.paginacion);
        return res.data.canciones;
    }

    const obtenerPorGenero = async (genero,page=1) =>{
        try {
            const res = await axios.get(`/canciones/filtros?genero=${genero}&page=${page}`)
            setCancionesGenero(res.data.canciones)
            setPaginacion(res.data.paginacion)            
        } catch (error) {
            console.error("Error al obtener generos ",error)
        }

    }


    //POST
    const crearCancion = async (cancion) => {
        const {data} = await axios.post(`/canciones/crear`,cancion)
        setCanciones((prev) => [...prev,data])
        toast.success("Cancion creada con exito")
    }

    const actualizarCancion = async (id, datos_actualizados) =>{
        const {data} = await axios.put(`/canciones/actualizar/${id}`, datos_actualizados)
        setCanciones((prev)=>
            prev.map((cancion) => (cancion._id === id ? data.cancion : cancion))
        )
        toast.success("Cancion actualizada con exito")
    }

    const eliminarCancion = async (id) =>{
        await axios.delete(`/canciones/eliminar/${id}`)
        setCanciones((prev) => prev.filter((cancion) => cancion._id !== id))
        toast.success("Cancion eliminada con exito")
    }

    const filtradoCancion = async (query, pagina) =>{
        const {data} = await axios.get(`/canciones/buscar?q=${query}&page=${pagina}`)
        return data
    }

    useEffect(() => {
      fetchCanciones()
    }, [])

    
    
    return(
        <MusicContext.Provider value={{canciones,loading, crearCancion,actualizarCancion, eliminarCancion, filtradoCancion, paginacion, obtenerRecientes, cancionesGenero, obtenerPorGenero}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)