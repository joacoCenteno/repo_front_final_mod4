import React from 'react'

const UserInfo = ({usuario}) => {
    
  return (
    <>
        <div className='w-full pl-5'>
            <div>
                <img src={usuario.profileImage} className='w-50 rounded-full' alt="" />
            </div>
            <div className='text-[#5d6f95] font-bold py-3'>
                <p>Perfil Creador: <span className='font-normal'>{usuario.username}</span></p>
                <p>Playlist Activas: <span className='font-normal'>{usuario.playlists.length}</span></p>
            </div>
        </div>
    </>
  )
}

export default UserInfo