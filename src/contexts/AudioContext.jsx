import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMusic } from "./MusicContext";

const AudioContext = createContext();

export const AudioProvider = ({children}) =>{
    const audioRef = useRef(new Audio());

    const [currentTrack, setCurrentTrack] = useState(null);
    const [queue, setQueue] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSoundOn, setSoundOn] = useState(true);
    const {canciones} = useMusic();
    

    const playTrack = (track) =>{
        const audio = audioRef.current;


        if (!track?.url) return;

        // siempre cargar src primero
        audio.src = track.url;

        setCurrentTrack(track);
        localStorage.setItem("ultimoTrack", JSON.stringify(track));

        audio.currentTime = 0;

        audio.play().catch(() => {});
        setIsPlaying(true);
    }

    
    const soundOff = () =>{
        if(isSoundOn) audioRef.current.volume = 0;
        else{
            audioRef.current.volume = 1;          
        }
        setSoundOn(!isSoundOn)   

    }

    useEffect(() => {
        const ultimoTrack = localStorage.getItem("ultimoTrack");

        if (!ultimoTrack) return;

        const track = JSON.parse(ultimoTrack);
        const audio = audioRef.current;

        if (!track?.url) return;

        audio.src = track.url;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTrack(track);
    }, []);

    const pause = () =>{
        audioRef.current.pause();
        setIsPlaying(false);
    }

    const togglePlay = () =>{
        const audio = audioRef.current;
        if (!audio.src) return;

        if (isPlaying) pause();
        else audioRef.current.play();
        setIsPlaying(!isPlaying);
    }

    const playPlaylist = (tracks) =>{
        setQueue(tracks);
        playTrack(tracks[0]);
    }

    const setRandomQueue = (song, tracks) =>{
        setQueue(tracks);
        const index = tracks.findIndex(t => t._id === song._id)
        playTrack(tracks[index]) 
    }

    const nextTrack = () =>{
        localStorage.setItem("prevTrack", JSON.stringify(currentTrack));

        if(!queue || queue.length ===0){
            const nextStorage = localStorage.getItem("nextTrack");

            if(nextStorage){
                if(JSON.parse(nextStorage)._id === currentTrack._id){
                    localStorage.removeItem("nextTrack")
                    playRandomSong()
                }else{
                    playTrack(JSON.parse(nextStorage))
                }
                
            }else{
                playRandomSong()
            }
        }else{
            const index = queue.findIndex(t => t._id === currentTrack._id);
            const next = queue[index+1];

            if(next) playTrack(next)
            else playTrack(queue[0])            
        }


    }

    const prevTrack = () =>{
        localStorage.setItem("nextTrack", JSON.stringify(currentTrack));

        if(!queue || queue.length ===0){
            const prevStorage = localStorage.getItem("prevTrack");

            if(prevStorage){
                if(JSON.parse(prevStorage)._id === currentTrack._id){
                    localStorage.removeItem("prevTrack")
                    playRandomSong()
                }else{
                    playTrack(JSON.parse(prevStorage))
                }
                
            }else{
                playRandomSong()
            }
        }else{
            const index = queue.findIndex(t => t._id === currentTrack._id);
            const prev = queue[index-1];

            if(prev) playTrack(prev);
        } 
    }

    const playRandomSong = () =>{
        const index_song = Math.floor(Math.random() * canciones.length);

        try {
            playTrack(canciones[index_song])
        } catch (error) {
            console.log("Error al reproducir cancion", error)
        }
        
    }

    useEffect(() =>{
        const audio = audioRef.current;

        const handleTime = () => setCurrentTime(audio.currentTime);
        const handleLoaded = () => setDuration(audio.duration);
        const handleEnded = () => {
            if(!queue) playRandomSong();
            else nextTrack()   
        };

        audio.addEventListener("timeupdate", handleTime);
        audio.addEventListener("loadedmetadata", handleLoaded);
        audio.addEventListener("ended", handleEnded);

        return () => {
        audio.removeEventListener("timeupdate", handleTime);
        audio.removeEventListener("loadedmetadata", handleLoaded);
        audio.removeEventListener("ended", handleEnded);
        };       
    }, [currentTrack,queue])


      const seek = (time) => {
            audioRef.current.currentTime = time;
        };

        return (
            <AudioContext.Provider
            value={{
                currentTrack,
                isPlaying,
                playTrack,
                pause,
                togglePlay,
                playPlaylist,
                nextTrack,
                prevTrack,
                currentTime,
                duration,
                seek,
                soundOff,
                isSoundOn,
                setRandomQueue,
                setQueue
            }}
            >
            {children}
            </AudioContext.Provider>
        );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => useContext(AudioContext);