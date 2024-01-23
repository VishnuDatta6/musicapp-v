import React, { useState } from "react";
import Sample from "../assets/white-blank-3d.jpg";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import "../css/popular.css";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/actions/songActions";

const Popular = ({isPlaying, setIsPlaying}) => {
  const dispatch = useDispatch();
  const { songs, error } = useSelector((state) => state.song);
  const {playlist, song} = useSelector((state) => state.song.current);
  const popularSongs = songs.popular;
  const sample = songs.songs
    ? songs?.songs.filter((song) => popularSongs.includes(song.id))
    : [{ id: 1, title: "title", artist: "artist", url: "", cover: "" }];

  const sameList = playlist.length ? popularSongs.join('') === playlist.join('') : false;

  const handlePlay = (obj, i)=>{
    if(sameList && song===i){
      setIsPlaying(!isPlaying);
    }else{
      dispatch(setCurrentSong(obj));
    }
  }
    return (
    <section id="popular">
      <h2>Popular</h2>
      <div className="songs-list">
        {sample.map((item, i) => {
          return (
            <div className={sameList && song===i ? "song active"  :"song"} key={item.id} onClick={()=>handlePlay({song: i, playlist: songs.popular}, i)}>
              <div className="song-details">
                <button className="playpause">
                {sameList && song===i && isPlaying ?  <IoPauseOutline size={20} /> : <IoPlayOutline size={20} />}
                </button>
                <img src={item.cover} alt={item.title} />
                <div>
                  <b>{item.title}</b> <p>{item.artist}</p>
                </div>
              </div>
              <div className="song-duration">
                0:00 <FaRegHeart size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Popular;
