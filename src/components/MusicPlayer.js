import React, { useEffect, useRef, useState } from "react";
import "../css/musicplayer.css";
import Sample from "../assets/white-blank-3d.jpg";
import { FaRegHeart } from "react-icons/fa";
import { MdQueueMusic } from "react-icons/md";
import { PiRepeatBold } from "react-icons/pi";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/actions/songActions";

const MusicPlayer = ({isPlaying, setIsPlaying}) => {
  const audioRef = useRef();
  const progressRef = useRef();
  const animationRef = useRef();
  const dispatch = useDispatch();
  
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const { songs, error } = useSelector((state) => state.song);
  const {playlist, song} = useSelector((state) => state.song.current);
  const currentPlaylist = songs.songs && playlist.length ? songs?.songs.filter((song) => playlist.includes(song.id)) : [{ id: 1, title: "title", artist: "artist", url: "", cover: "" }];
  const currentSong = currentPlaylist[song];

  function whilePlaying() {
    if(currentSong.url){
    progressRef.current.value = audioRef.current.currentTime;
    changeCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }}

  useEffect(() => {
    if(currentSong.url){
    audioRef.current.src = currentSong.url;
    setIsPlaying(true);

    audioRef.current.addEventListener("loadedmetadata", () => {
      const seconds = Math.floor(audioRef.current.duration);
      setDuration(seconds);
      progressRef.current.max = seconds;
    });
    
    // progressRef.current.style.setProperty("--player-width", "0%");
    
    audioRef.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        cancelAnimationFrame(animationRef.current);
        setIsPlaying(false);
      }
    };
  }, [currentSong]);

  useEffect(()=>{
    if (isPlaying) {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }, [isPlaying])

  const playPauseToggle = () => {
    if (currentSong.url === "") {
      alert("Please select a song");
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const changeProgress = () => {
    audioRef.current.currentTime = progressRef.current.value;
    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressRef.current.style.setProperty(
      "--player-width",
      `${(progressRef.current.value / duration) * 100}%`
    );
    setCurrentTime(progressRef.current.value);
  };

  const handlePrevious = () => {
    if(song){
      dispatch(setCurrentSong({song: song-1, playlist : playlist}));
    }
  };

  const handleNext = () => {
    if(song<playlist.length-1){
      dispatch(setCurrentSong({song: song+1, playlist : playlist}));
    }
  };

  return (
    <section id="musicplayer">
      <div className="details">
        <img src={currentSong.cover ? currentSong.cover : Sample} alt="Cover Art" />
        <div>
          <b>{currentSong.title}</b>
          <p>{currentSong.artist}</p>
        </div>
      </div>
      <div className="audio-controls">
        <button className="previous" onClick={handlePrevious} disabled={!song}>
          {<TbPlayerTrackPrev size={20} />}
        </button>
        <button className="play" onClick={playPauseToggle}>
          {isPlaying ? (
            <IoPauseOutline size={25} />
          ) : (
            <IoPlayOutline size={25} />
          )}
        </button>
        <button className="next" onClick={handleNext}  disabled={song === playlist.length-1}>
          {<TbPlayerTrackNext size={20} />}
        </button>
      </div>
      <div className="controller">
        <audio
          src={currentSong.url}
          type="audio/mp3"
          ref={(audio) => {
            audioRef.current = audio;
          }}
          autoPlay
          preload="metadata"
          controls
        >
          Your browser does not support the audio element.
        </audio>
        <span className="currentTime">{calculateTime(currentTime)}</span>
        <input
          type="range"
          className="progressbar"
          ref={progressRef}
          value={currentTime}
          onChange={changeProgress}
        />
        <span className="duration">
          {duration && !isNaN(duration) && calculateTime(duration)
            ? duration && !isNaN(duration) && calculateTime(duration)
            : "00:00"}
        </span>
      </div>
      <span className="musicplayer-icons">
        <FaRegHeart size={20} />
        <MdQueueMusic size={20} />
        <PiRepeatBold size={20} />
      </span>
    </section>
  );
};

export default MusicPlayer;
