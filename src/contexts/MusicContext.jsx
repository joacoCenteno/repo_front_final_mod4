/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const MusicContext = createContext();

const API = "https://repo-back-final-mod4.onrender.com"

export const MusicProvider = ({children}) =>{
    const [canciones, setCanciones] = useState([]);
    const [loading, setLoading] = useState(false)

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


    //POST
    const crearCancion = async (cancion) => {
        const {data} = await axios.post(`${API}/cancion/crear`,cancion)
        setCanciones((prev) => [...prev,data])
    }

    const actualizarCancion = async (id, datos_actualizados) =>{
        const {data} = await axios.put(`${API}/cancion/actualizar/${id}`, datos_actualizados)
        setCanciones((prev)=>
            prev.map((cancion) => (cancion._id === id ? data.cancion : cancion))
        )
    }

    const eliminarCancion = async (id) =>{
        await axios.delete(`${API}/cancion/eliminar/${id}`)
        setCanciones((prev) => prev.filter((cancion) => cancion._id !== id))
    }

    useEffect(() => {
      fetchCanciones()
    }, [])
    
    return(
        <MusicContext.Provider value={{canciones,loading, crearCancion,actualizarCancion, eliminarCancion}}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)