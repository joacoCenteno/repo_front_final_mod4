import { Outlet, useNavigate } from 'react-router-dom'
import { useThemeContext } from '../contexts/ThemeContext';

const Autenticacion = () => {
    const navigate = useNavigate();
    const {isDark} = useThemeContext()

  return (
    <>
        <div className={`relative overflow-hidden bg-gradient-to-br from-[#121825] via-[#1d2438] to-[#121825] text-[#EEEEEE] px-2 sm:px-0 h-screen flex flex-col justify-center items-center font-display ${!isDark&&"text-[#4e5c77] from-[#c8ceff] via-[#e1e5ff] to-[#c8ceff]"}`}>

        <div className={`h-10 flex justify-between gap-2 items-center pt-3 mb-7 transition ease-in cursor-pointer text-[#5c6b8a]`} onClick={()=>{navigate('/')}}>
        <i className="bi bi-arrow-left text-3xl " ></i>
        <p>
          Back to Home
        </p>
    </div>
    <Outlet />

    </div>
    </>
  )
}

export default Autenticacion