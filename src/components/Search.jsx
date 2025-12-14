import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';
import { useThemeContext } from '../contexts/ThemeContext';

const Search = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate();
    const {usuario, logout} = useAuth()
    const {isDark} = useThemeContext()

      const handleSearch = () => {
    if (!query.trim()) return
    navigate(`/playlists?search=${encodeURIComponent(query)}`)
  }
  return (
    <>
<div className="w-full flex flex-wrap sm:flex-nowrap items-center gap-y-4 gap-x-2 sm:gap-3 sm:h-12 sm:pr-8 mb-5">

  <div
    className="flex flex-1 items-center cursor-pointer order-1 sm:flex-none"
    onClick={() => navigate('/')}
  >
    <i className={`bi bi-vinyl ${!isDark&&"text-[#5c6b8a]"}`}></i>
    <p className={`ml-2 font-bold whitespace-nowrap ${!isDark&&"text-[#5c6b8a]"}`}>DalePlay</p>
  </div>

  <div className="flex flex-1 items-center justify-end gap-3 order-2 sm:order-3 sm:flex-none">
    {usuario ? (
      <>
        <img
          src={usuario.profileImage}
          className="rounded-full w-8 h-8"
          alt="profile"
        />
        <p className={`xs:block ${!isDark && "text-[#4e5c77]"}`}>
          {usuario.username}
        </p>
        <i
          className={`bi bi-box-arrow-left text-xl cursor-pointer ${!isDark&&"text-[#5c6b8a]"}`}
          onClick={() => {
            logout();
            navigate('/');
          }}
        />
      </>
    ) : (
      <i
        className={`bi bi-box-arrow-right text-xl cursor-pointer ${!isDark&&"text-[#5c6b8a]"}`}
        onClick={() => navigate('/autenticacion')}
      />
    )}
  </div>


  <div className="w-full  sm:flex-1 order-3 sm:order-2">
    <div className="flex items-center m-auto md:w-100">
      <input
        type="text"
        className={`w-full rounded-l-xl bg-[#171e2d] py-1.5 px-3 focus:outline-none ${
          !isDark && "bg-[#e3e6ff] text-black"
        }`}
        placeholder="Buscar Playlists"
        onChange={e => setQuery(e.target.value)}
      />
      <div
        className={`bg-[#171e2d] py-1.5 px-3 rounded-r-xl cursor-pointer ${
          !isDark && "bg-[#e3e6ff] text-[#4e5c77]"
        }`}
        onClick={handleSearch}
      >
        <i className="bi bi-search"></i>
      </div>
    </div>
  </div>

</div>
    
    </>
  )
}

export default Search