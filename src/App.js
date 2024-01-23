import "./App.css";
import MusicPlayer from "./components/MusicPlayer";
import Popular from "./components/Popular";
import RAlbum from "./components/RAlbum";
import Sidebar from "./components/Sidebar";
import TopMusic from "./components/TopMusic";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";
import { MdNotificationsNone } from "react-icons/md";
import BImage from './assets/philipp.jpg';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchSongsRequest } from "./redux/actions/songActions";

function App() {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const { songs, error, loading } = useSelector((state) => state.song);
  const {playlist, song} = useSelector((state) => state.song.current);
  const currentPlaylist = songs.songs && playlist.length ? songs?.songs.filter((song) => playlist.includes(song.id)) : [{ id: 1, title: "title", artist: "artist", url: "", cover: "" }];
  const currentSong = currentPlaylist[song];

  useEffect(()=>{
    dispatch(fetchSongsRequest());
  }, [dispatch])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <Sidebar />
      <div id='content'>
        <div className="header">
          <form>
            <IoMdSearch size={22}/> &nbsp;
            <input type="text" placeholder="Search for song, artists etc.." />
          </form>
          <div>
            <button>Upgrade To Premium</button>
            <MdOutlineSettings size={22} />
            <MdNotificationsNone size={22} />
          </div>
        </div>
        <TopMusic />
        <div id="section-2">
          <Popular isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <RAlbum />
        </div>
      </div>
      <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying}/>
      <div className="background" style={{backgroundImage : `url(${currentSong.cover ? currentSong.cover : BImage})`}}></div>
    </div>
  );
}

export default App;
