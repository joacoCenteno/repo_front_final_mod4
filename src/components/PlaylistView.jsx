import React from 'react'

const PlaylistView = () => {
 const playlist = [{
    id: 1,
    nombre: "Chill Songs",
    imagen: "https://tse2.mm.bing.net/th/id/OIP.g6uy6SIQPSb9uPguUwlcywHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
 },
{
    id: 2,
    nombre: "Rock Nacional",
    imagen: "https://argentalk.com/wp-content/uploads/2021/05/festival-rock-nacional.jpg"
},
{
    id: 3,
    nombre: "Tropical Vibes",
    imagen:"https://a.1stdibscdn.com/a_1162/a_57253221581622095081/Moy_Palms_Squared_webready_master.jpg"
},
{
     id:4,
    nombre: "Pop Hits",
    imagen: "https://th.bing.com/th/id/R.eca31e1bcafc942e54a4d4185ebb48b9?rik=bFKnJ9LbMPaosA&pid=ImgRaw&r=0"
}]

  return (
    <>
            <div className='flex flex-col w-1/2 pt-6 pl-5'>
            <h1 className='mb-5 text-2xl font-bold'>Playlists</h1>

            <div className='flex flex-wrap gap-4 '>
            {playlist && playlist.slice(0, 4).map((playlist) =>{
                return(
                    <>
                    <div key={playlist.id } className='w-70 h-28 p-3  pb-4 rounded-2xl bg-cover
                         cursor-pointer overflow-hidden group relative ' style={{ 
                        backgroundImage: `url(${playlist.imagen})` 
                    }}
                    >
                    <div className="absolute inset-0 flex items-center justify-center 
                    bg-[#91dbfd]/30
                    opacity-0 transition-opacity duration-300
                    group-hover:opacity-100 group-hover:backdrop-blur-sm"
    >
        <p className='text-white font-bold text-xl mb-3 
                      drop-shadow-lg drop-shadow-black/80'
        >
            {playlist.nombre}
        </p>
    </div>
                    </div>


                    </>
                    
                )
                })}
            </div>

        </div>
    </>
  )
}

export default PlaylistView