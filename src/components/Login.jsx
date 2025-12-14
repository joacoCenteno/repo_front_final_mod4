import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';

const Login = () => {
    const {login} = useAuth();
    const [form, setForm] = useState({ email:"",password:""});
    const [error, setError] = useState("")
    const {isDark} = useThemeContext()

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (form.email.trim() === "" || form.password.trim() === "") {
        setError("Por favor, complete todos los campos correctamente.");
        return;
        }

        try {
            await login(form);
            navigate('/')
        } catch (error) {
            setError("Email o contraseña incorrectas");
            console.log(`Error: ${error}`)
        }
    }
  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Inicio de Sesión</h2>

        

        <form action="post" onSubmit={handleSubmit} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
             `}>
              <p className='text-red-500'>{error}</p>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Email' value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Contraseña' value={form.password} onChange={(e)=> setForm({...form, password: e.target.value})}/>
            <button type="submit" className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Iniciar Sesion</button>
        </form>
    </>
  )
}

export default Login