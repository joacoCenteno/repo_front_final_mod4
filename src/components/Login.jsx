import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {login} = useAuth();
    const [error, setError] = useState("")
    const {isDark} = useThemeContext()

    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        mode: 'onChange'
    })
    

    const onSubmit = async (data) =>{
        try {
          setError("")
            await login(data);
            navigate('/')
        } catch (error) {
            setError("Email o contraseña incorrectas");
            console.log(`Error: ${error}`)
        }
    }
  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Inicio de Sesión</h2>

        

        <form action="post" onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
             `}>
              <p className='text-red-400 text-center'>{error}</p>
            <input {...register('email', {
                        required: 'Email es requerido',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Formato de email inválido"
                        }
                    })} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Email' />
            {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
            <input {...register('password', {required:'Contraseña es requerida'})} type="password" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Contraseña' />
            {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}
            <button type="submit" disabled={isSubmitting} className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg  ${isSubmitting&&'opacity-30'} ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Iniciar Sesion</button>
        </form>
    </>
  )
}

export default Login