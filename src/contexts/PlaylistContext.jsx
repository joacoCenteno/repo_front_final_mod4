/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useState } from "react";
import axios from "../utils/axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PlaylistContext = createContext();


const API = "https://repo-back-final-mod4.onrender.com"

export const PlaylistProvider = ({children}) =>{
    const [playlist, setPlaylist] = useState(null)
    const navigate = useNavigate()
    //POST
    const crearPlaylist = async (playlist) => {
        await axios.post(`/playlists/crear`,playlist)
        toast.success("Playlist creada!")
    }

    const fetchPlaylistById = async (id) =>{
        try {
            const {data} = await axios.get(`/playlists/${id}`)
            setPlaylist(data)
            
        } catch (error) {
            if(error.response?.status === 401){
                setPlaylist(null);
                navigate("/")
            }else{
            console.error("Error obteniendo playliste", error)
            toast.error("Error obteniendo playlist")}
        }
    }


    const eliminarPlaylist = async (id) =>{
        await axios.delete(`/playlists/eliminar/${id}`)
        toast.warning("Playlist eliminada!")
    }

    const actualizarPlaylist = async (id, datos_actualizados) =>{
        await axios.put(`/playlists/actualizar/${id}`, datos_actualizados)
        toast.success("Playlist actualizada!")
    }

    const agregarCancion = async (id_cancion) =>{
        try {
            const res = await axios.post(`/playlists/${playlist._id}/cancion/${id_cancion}`)
            setPlaylist(res.data.playlist)
            toast.success("Canción agregada!")
        } catch (error) {
        const mensaje = error.response?.data?.error || "Ocurrió un error desconocido";

        toast.warning(mensaje)
        }

    }

    const eliminarCancion = async (id_cancion) =>{
        const res = await axios.delete(`/playlists/${playlist._id}/cancion/${id_cancion}`)
        setPlaylist(res.data.playlist)
        toast.success("Canción eliminada!")
    }

    const filtradoPlaylist = async (query, pagina) =>{
        const {data} = await axios.get(`/playlists/buscar?q=${query}&page=${pagina}`)
        return data;
    }
    
    
    return(
        <PlaylistContext.Provider value={{crearPlaylist, eliminarPlaylist, actualizarPlaylist, fetchPlaylistById, playlist, agregarCancion, eliminarCancion, filtradoPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    )
}

export const usePlaylist = () => useContext(PlaylistContext)