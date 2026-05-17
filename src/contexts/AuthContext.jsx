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
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const cargarUsuarioCompleto = async () =>{
        try {
            const {data }= await axios.get(`/user/me`);
            localStorage.setItem("usuario", JSON.stringify(data))
            setUsuario(data);
            const listaPermisos = data.role.permissions.map(p => p.nombre);
            setPermisos(listaPermisos);
        } catch (error) {
            if(error.response?.status === 401){
                console.log("ERROR BROOO")
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
      const tokenGuardado = localStorage.getItem("token");
      const usuarioGuardado = localStorage.getItem("usuario");

      if(tokenGuardado && usuarioGuardado){
        setToken(tokenGuardado);

        axios.defaults.headers.common["Authorization"] = `Bearer ${tokenGuardado}`;

        cargarUsuarioCompleto()
      }else{
        setCargando(false)
      }
    }, []);


   const guardarSesion = async (tokenRecibido) =>{
        setToken(tokenRecibido)


        localStorage.setItem("token", tokenRecibido);

        axios.defaults.headers.common["Authorization"] = `Bearer ${tokenRecibido}`;

        setCargando(true)
        await cargarUsuarioCompleto()
    }


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

            localStorage.setItem("token", data.token);
            guardarSesion(data.token);

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
            localStorage.removeItem("token");

            setUsuario(null);
            setPermisos([]);

            navigate("/");
            toast.success("Logout exitoso!")

        } catch (error) {
            console.log(error);
        }
    };

    
    const tienePermiso = (permiso) =>{
        return permisos.includes(permiso);
    }

    const sendEmail = async (email) => {
        try {
            const {data} = await axios.post(`/auth/forgot-password`, {email})

            const message = data.message || "Email enviado, revise su bandeja de entrada"
            toast.success(message)
        } catch (error) {
            const message = error.response?.data?.message || "Error al restablecer contraseña";
            toast.error(message);
        }
    }

    const resetPassword = async (token, password) => {
        try {
            const {data} = await axios.post(`/auth/reset-password/${token}`, {password})
            const message = data.message || "Contraseña reestablecida con éxito";
            toast.success(message);
            navigate('/autenticacion/login')
        } catch (error) {
                const message = error.response?.data?.message || "Error al restablecer contraseña";
                toast.error(message);
        }
    }


    return (
        <AuthContext.Provider value={{usuario, cargando, registro, login, logout, autenticado: !!usuario, tienePermiso, cargarUsuarioCompleto, sendEmail, resetPassword}}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => useContext(AuthContext);