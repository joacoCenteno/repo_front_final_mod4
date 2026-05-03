/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import axios from "../utils/axios";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// const API = "https://repo-back-final-mod4.onrender.com";
//  const API = "http://localhost:3000"

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [permisos, setPermisos] = useState([]);

    const navigate = useNavigate();

    const cargarUsuarioCompleto = async () =>{
        try {
            const {data }= await axios.get(`/user/me`);
            setUsuario(data);
            const listaPermisos = data.role.permissions.map(p => p.nombre);
            setPermisos(listaPermisos);
        } catch (error) {
            if(error.response?.status === 401){
                setUsuario(null);
                setPermisos([]);                
            }else{
                console.log("Error cargando usaurio:",error);
            }
            
     
        }finally{
            setCargando(false)
        }
    }



    useEffect(() => {
        cargarUsuarioCompleto()
    }, []);


    const registro = async(dataForm) =>{
        try {
            const {data} = await axios.post(`/auth/register`, dataForm)
            await cargarUsuarioCompleto()
            toast.success("Registro exitoso!")  
            navigate('/') 
            return {success: true} 
        } catch (error) {
            return{
                success: false,
                status: error.response?.status,
                message: error.response?.data?.message,
            }
        }

    }

    const login = async(dataForm) =>{
        try {
            const {data} = await axios.post(`/auth/login`, dataForm)
            await cargarUsuarioCompleto();
            toast.success("Bienvenido!")   
             navigate('/') 
             return {success: true}        
        } catch (error) {
            return {
                succes: false,
                status: error.response?.status,
                message: error.response?.data?.message,
            }
        }

    }

    const logout = async () => {
        try {
            const res = await axios.post("/auth/logout");

            setUsuario(null);
            setPermisos([]);

            navigate("/");
            toast.success(res.data?.message)

        } catch (error) {
            console.log(error);
        }
    };

    
    const tienePermiso = (permiso) =>{
        return permisos.includes(permiso);
    }


    return (
        <AuthContext.Provider value={{usuario, cargando, registro, login, logout, autenticado: !!usuario, tienePermiso, cargarUsuarioCompleto}}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => useContext(AuthContext);