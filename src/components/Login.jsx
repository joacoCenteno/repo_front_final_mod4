
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'

const Login = () => {
    const {login} = useAuth();
    const {isDark} = useThemeContext()
    const [error, setError] = useState(null);
    const [waiting, setWaiting] = useState(false)


    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm({
        mode: 'onChange'
    })
    

    const onSubmit = async (data) =>{
        setError("")
        setWaiting(false);
       const res = await login(data);

       if(!res.success){
            if(res.status === 429){
                setError(res.message);
                setWaiting(true)
            }else if(res.status === 400){
                setError(res.message)
            }
       }
    }
    

  return (
    <>
        <h2 className={`font-bold text-2xl ${!isDark&&"text-[#4e5c77] "}`}>Inicio de Sesión</h2>

        

        <form action="post" onSubmit={handleSubmit(onSubmit)} className={`flex flex-col gap-4  bg-[#171e2d] text-[#42c1fc] shadow-xl p-6 rounded-2xl w-full max-w-md mx-auto ${!isDark&&"text-[#4e5c77] bg-[#eceeff]"}
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
            <p className='text-[#5d6f95]'>Olvidó su contraseña? <Link to="../envio-mail"><span className={`${!isDark&&"hover:text-[#a2acff] py-1 hover:[text-shadow:0_0_5px_#A2ACFF,0_0_15px_#E3E6FF,0_0_10px_#A2ACFF]"} cursor-pointer hover:text-[#91dbfd] hover:[text-shadow:0_0_5px_#81D4FA,0_0_15px_#81D4FA,0_0_10px_#81D4FA]`}>Click aqui</span></Link></p>
            <button type="submit" disabled={isSubmitting || waiting} className={`mt-2 w-full bg-[#42c1fc] text-white font-semibold py-2 rounded-xl
               hover:bg-[#1e88e5] transition-all shadow-md hover:shadow-lg  ${isSubmitting || waiting ? 'opacity-30' : ''} ${!isDark&&"text-[#4e5c77]  bg-[#b9c0ff] hover:bg-[#959fff]"} cursor-pointer`}>Iniciar Sesion</button>
        </form>
    </>
  )
}

export default Login