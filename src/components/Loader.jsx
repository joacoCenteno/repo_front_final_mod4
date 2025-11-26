import React from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { useMusic } from '../contexts/MusicContext'

const Loader = () => {
    const {loading} = useMusic();
  return (
    <>
        <div className='bg-[#121825] w-full h-screen fixed flex justify-center items-center'>
                  {loading && <><MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#42c1fc"
        secondaryColor="#91dbfd"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></>}
        </div>
    </>
)
}

export default Loader