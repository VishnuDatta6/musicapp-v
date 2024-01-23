import React from "react";
import '../css/sidebar.css';
import { FiHome } from "react-icons/fi";
import { MdPlaylistPlay } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { IoIosAlbums } from "react-icons/io";
import { LuRadio } from "react-icons/lu";
import { MdOutlineEventAvailable } from "react-icons/md";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";


const Sidebar = () => {
  const userDetails = {
    image : require('../assets/v-image.png'),
    name : 'Vishnu Datta',
    email : 'vishnudatta06@gmail.com'
  }
  const browse = [
    { icon: <FiHome size={16}/>, nav: "Home" },
    { icon: <MdPlaylistPlay size={16}/>, nav: "Playlist" },
    { icon: <FiUser size={16}/>, nav: "Artist" },
    { icon: <IoIosAlbums size={16}/>, nav: "Albums" },
  ];
  const discover = [
    { icon: <LuRadio size={16}/>, nav: "Radio" },
    { icon: <MdOutlineEventAvailable size={16} />, nav: "Event" },
    { icon: <HiOutlineMicrophone size={16} />, nav: "Podcast" },
    { icon: <FaRegHeart size={16} />, nav: "For You" },
  ];
  return (
    <section className="sidebar">
      <figure>
        <img src={userDetails.image}/>
        <figcaption>
          <b>{userDetails.name}</b>
          <p>{userDetails.email}</p>
        </figcaption>
      </figure>
      <div className="browse">
        <h2>Browse</h2>
        <ul>
          {browse.map((item, index) => (
            <li key={index} className={!index ? 'activenav' : ''}>{item.icon}	&nbsp; {item.nav} </li>
          ))}
        </ul>
      </div>
      <div className="discover">
        <h2>Discover</h2>
        <ul>
          {discover.map((item, index) => (
            <li key={index}>{item.icon}	&nbsp; {item.nav}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Sidebar;