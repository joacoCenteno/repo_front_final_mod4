import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const RestablecerContrasenia = () => {
    const {resetPassword} = useAuth();
    const {isDark} = useThemeContext()
    const [error, setError] = useState(null);
    const [waiting, setWaiting] = useState(false)
    const { token } = useParams();


    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        mode: 'onChange'
    })
    

    const onSubmit = async (data) =>{
        setError("")
        setWaiting(false);

        if(data.password !== data.password_repeticion){
            setError("Las contraseñas no coinciden");
            return;
        }

        await resetPassword(token, data.password);

    }
    

  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Restablecer Contraseña</h2>

        

        <form action="post" onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4  bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
             `}>
              <p className='text-red-400 text-center'>{error}</p>
            <input {...register('password', {required:'Contraseña es requerida',minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres"}})} type="password" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Ingrese nueva contraseña' />
            {errors.password && <p className='text-red-400 text-sm'>{errors.password.message}</p>}

            <input {...register('password_repeticion', {required:'Contraseña es requerida',minLength: {
            value: 8,
            message: "La contraseña debe tener al menos 8 caracteres"}})} type="password" className={`border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#42c1fc]  focus:outline-none ${!isDark&&"text-[#4e5c77]  focus:ring-[#b9c0ff] focus:border-none border-white"}`} placeholder='Repita la contraseña' />
            {errors.password_repeticion && <p className='text-red-400 text-sm'>{errors.password_repeticion.message}</p>}
            <button type="submit" disabled={isSubmitting || waiting} className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg  ${isSubmitting || waiting ? 'opacity-30' : ''} ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Reestablecer Contraseña</button>
        </form>
    </>
  )
}

export default RestablecerContrasenia