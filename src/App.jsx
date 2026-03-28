import React from 'react'
import AppRouter from './router/AppRouter'
import { MusicProvider } from './contexts/MusicContext'
import { AuthProvider } from './contexts/AuthContext'
import { PlaylistProvider } from './contexts/PlaylistContext'
import { ToastContainer, Flip } from 'react-toastify'
import { ThemeProvider } from './contexts/ThemeContext'
import { AudioProvider } from './contexts/AudioContext'

const App = () => {
  return (
    <>
    <AuthProvider>
      <AudioProvider>
        <PlaylistProvider>
          <MusicProvider>
            <ThemeProvider>
            <AppRouter/> 

              <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Flip}
              />
              </ThemeProvider>
          </MusicProvider>
        </PlaylistProvider> 
      </AudioProvider>
    </AuthProvider>
    </>
  )
}

export default App