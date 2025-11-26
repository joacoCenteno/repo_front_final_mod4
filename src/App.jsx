import React from 'react'
import AppRouter from './router/AppRouter'
import { MusicProvider } from './contexts/MusicContext'
import Home from './components/Home'

const App = () => {
  return (
    <>
    <MusicProvider>
      <AppRouter/>  
    </MusicProvider>
    </>
  )
}

export default App