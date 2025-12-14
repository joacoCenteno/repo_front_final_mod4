import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { useThemeContext } from '../contexts/ThemeContext'

const Registro = () => {
    const {registro} = useAuth()
    const {isDark} = useThemeContext()
    const [form, setForm] = useState({
        email: "",
        password: "",
        username: ""
    })
    const [error, setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if (form.email.trim() === "" || form.password.trim() === "" || form.username.trim() === "" ) {
        setError("Por favor, complete todos los campos correctamente.");
        return;
        }
        try {
            await registro(form)
            navigate('/')
        } catch (error) {
            setError("Error al registrar el usuario");
            console.log(`Error: ${error}`)
        }
    }

  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Registro de Usuario</h2>

        

        <form action="post" onSubmit={handleSubmit} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
             `}>
              <p className='text-red-500'>{error}</p>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Email' value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})}/>
            <input type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Contraseña' value={form.password} onChange={(e)=> setForm({...form, password: e.target.value})}/>
            <input type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Nombre de Usuario' value={form.username}  onChange={(e)=> setForm({...form, username: e.target.value})}/>
            <p className='text-[#5d6f95]'>Ya posee una cuenta? <Link to='login'><span className={`${!isDark&&"hover:text-[#a2acff] py-1 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"} cursor-pointer hover:text-[#91dbfd] hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]`}>Inicie Sesión</span></Link></p>
            <button type="submit" className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Registrarme</button>
        </form>
    
    </>
  )
}

export default Registro