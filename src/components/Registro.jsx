import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { useThemeContext } from '../contexts/ThemeContext'
import { useForm } from 'react-hook-form'

const Registro = () => {
    const {registro} = useAuth()
    const [error, setError] = useState("")
    const {isDark} = useThemeContext()
    const [timeLeft, setTimeLeft] = useState(null);

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        mode: 'onChange'
    })


    const onSubmit = async (data) =>{
        setError("")
        const res =await registro(data)

        if(!res.success){
            if(res.status === 429){
                const retryAfter = res.retryAfter;

                if (retryAfter) {
                    setTimeLeft(retryAfter);
                } else {
                    setError("Demasiados intentos. Intentá más tarde.");
                }
            }else if(res.status === 400){
                setError(res.message)
            }
        }
    }

    useEffect(() => {
            if (!timeLeft) return;
    
            const interval = setInterval(() => {
                setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return null;
                }
                return prev - 1;
                });
        }, 1000);
    
      return () => clearInterval(interval);
    }, [timeLeft]);

  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Registro de Usuario</h2>


        <form action="post" onSubmit={handleSubmit(onSubmit)} className={` z-50 flex flex-col gap-4 bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
             `}>
            {error && <p className='text-red-400 text-sm text-center'>{timeLeft ? `Esperá ${timeLeft} segundos antes de intentarlo de nuevo.` : error}</p>}
            <input {...register('email', {
                        required: 'Email es requerido',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Formato de email inválido"
                        }
                    })} type="text" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Email' />
            {errors.email && <p className='text-red-400 text-sm'>{errors.email.message}</p>}
            <input {...register('password', {required:'Contraseña es requerida',minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres"
        }})} type="password" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Contraseña' />
            {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}         
            <input {...register('username', {required:'Username es requerido'})} type="text"  className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`}  placeholder='Nombre de Usuario' />
                        {errors.username && <p className='text-red-400 text-sm'>{errors.username.message}</p>}     
            <p className='text-[#5d6f95]'>Ya posee una cuenta? <Link to='login'><span className={`${!isDark&&"hover:text-[#a2acff] py-1 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"} cursor-pointer hover:text-[#91dbfd] hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]`}>Inicie Sesión</span></Link></p>
            <button type="submit" disabled={isSubmitting || timeLeft} className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"}  ${isSubmitting || timeLeft ? 'opacity-30' : ''} cursor-pointer`}>Registrarme</button>
        </form>
    
    </>
  )
}

export default Registro