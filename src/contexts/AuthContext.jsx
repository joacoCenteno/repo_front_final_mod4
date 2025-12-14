/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const AuthContext = createContext();

const API = "https://repo-back-final-mod4.onrender.com";

export const AuthProvider = ({children}) => {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [permisos, setPermisos] = useState([]);

    const cargarUsuarioCompleto = async () =>{
        try {
            const {data }= await axios.get(`${API}/user/me`);
            setUsuario(data);
            localStorage.setItem("usuario", JSON.stringify(data))
            const listaPermisos = data.role.permissions.map(p => p.nombre);
            setPermisos(listaPermisos);
        } catch (error) {
            console.log("Error cargando usaurio:",error);
            setUsuario(null);
            localStorage.removeItem("token");
            localStorage.removeItem("usuario"); 
           
        }finally{
            setCargando(false)
        }
    }



    useEffect(() => {
      const tokenGuardado = localStorage.getItem("token");
      const usuarioGuardado = localStorage.getItem("usuario");

      if(tokenGuardado && usuarioGuardado){
        setToken(tokenGuardado);

        axios.defaults.headers.common["authorization"] = `Bearer ${tokenGuardado}`;

        cargarUsuarioCompleto()
      }else{
        setCargando(false)
      }
    }, []);


    
    const guardarSesion = async (tokenRecibido) =>{
        setToken(tokenRecibido)


        localStorage.setItem("token", tokenRecibido);

        axios.defaults.headers.common["authorization"] = `Bearer ${tokenRecibido}`;

        setCargando(true)
        await cargarUsuarioCompleto()
    }

    const registro = async(dataForm) =>{
        const {data} = await axios.post(`${API}/auth/register`, dataForm)
        guardarSesion(data.token)
        toast.success("Registro exitoso!")
    }

    const login = async(dataForm) =>{
        const {data} = await axios.post(`${API}/auth/login`, dataForm)
        guardarSesion(data.token)
        toast.success("Bienvenido!")
    }

    const logout = () =>{
            setToken(null);
            setUsuario(null);

            localStorage.removeItem("token");
            localStorage.removeItem("usuario");

            delete axios.defaults.headers.common["authorization"]    
    }

    
    const tienePermiso = (permiso) =>{
        return permisos.includes(permiso);
    }


    return (
        <AuthContext.Provider value={{usuario, cargando, token, registro, login, logout, autenticado: !!usuario, tienePermiso, cargarUsuarioCompleto}}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => useContext(AuthContext);