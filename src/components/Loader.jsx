import React from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { useThemeContext } from '../contexts/ThemeContext'


const Loader = () => {
  const {isDark} = useThemeContext()

  return (
    <>
        <div className={`w-full h-screen z-50 fixed top-0 left-0 flex justify-center items-center transition-colors duration-300 ${
        isDark ? "bg-[#121825]" : "bg-white"
      }`}>
          <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#42c1fc"
        secondaryColor="#91dbfd"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        />
        </div>
    </>
)
}

export default Loader