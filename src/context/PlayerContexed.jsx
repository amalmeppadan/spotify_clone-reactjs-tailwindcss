import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export  const PlayerContexted  = createContext();

const PlayerContextedProvider = (props) => {

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const[track,Settrack] = useState(songsData[0]); //default track song
    const[playStatus,setPlaystatus] = useState(false);
    const[time,Settime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })

    const play = ()=>{
        audioRef.current.play();
        setPlaystatus(true);
    }

    const pause = ()=>{
        audioRef.current.pause();
        setPlaystatus(false);
    }

   const playWithId = async (id) =>{
         await Settrack(songsData[id]);
         await audioRef.current.play();
         setPlaystatus(true);
   } 

   const previous = async () =>{
    if(track.id>0){
        await Settrack(songsData[track.id-1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
   }

   
   const next = async () =>{
    if(track.id< songsData.length-1){
        await Settrack(songsData[track.id+1]);
        await audioRef.current.play();
        setPlaystatus(true);
    }
   }

   const seekSong = async (e)=>{

    audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth)*audioRef.current.duration)



   }

    useEffect(()=>{
        setTimeout(()=>{
        audioRef.current.ontimeupdate = ()=>{
            seekBar.current.style.width = (Math.floor(audioRef.current.currentTime/audioRef.current.duration*100))+"%"
           Settime ({
            currentTime:{
                second:Math.floor(audioRef.current.currentTime % 60),
                minute:Math.floor(audioRef.current.currentTime / 60)
            },
            totalTime:{
                second:Math.floor(audioRef.current.duration % 60),
                minute:Math.floor(audioRef.current.duration / 60)
            }
        })
        }

        },1000);
    },[audioRef])


    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,Settrack,
        playStatus,setPlaystatus,
        time,Settime,
        play,pause,
        playWithId,
        previous,next,
        seekSong

    }

    return(
        <PlayerContexted.Provider value={contextValue}>
            {props.children}
        </PlayerContexted.Provider>
    )

}

export default PlayerContextedProvider;