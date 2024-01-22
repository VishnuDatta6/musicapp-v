import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import Sample from "../assets/white-blank-3d.jpg";
import "../css/topmusic.css";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong } from "../redux/actions/songActions";

const TopMusic = () => {
  const { songs, error } = useSelector((state) => state.song);
  const topSongs = songs.top;
  const sample = songs.songs
    ? songs?.songs.filter((song) => topSongs.includes(song.id))
    : [{ id: 1, title: "title", artist: "artist", url: "", cover: "" }];
  const itemsPerSection = 5;
  const dispatch = useDispatch();

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < sample.length - 6) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <section id="top-music">
      <div className="tm-header">
        <h2>Top Music</h2>
        <span>
          <button onClick={prevSlide} disabled={currentSlide === 0}>
            <FaArrowLeftLong size={22} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentSlide > sample.length - 1 - itemsPerSection}
          >
            <FaArrowRightLong size={22} />
          </button>
        </span>
      </div>
      <div className="songsbanner">
        {sample
          .slice(currentSlide, currentSlide + itemsPerSection)
          .map((item) => {
            return (
              <figure key={item.id} onClick={() => dispatch(setCurrentSong(item))}>
                <img
                  src={item.cover}
                  alt="Cover Art"
                />
                <figcaption>
                  <h2>{item.title}</h2>
                  <p>{item.artist}</p>
                </figcaption>
              </figure>
            );
          })}
      </div>
    </section>
  );
};

export default TopMusic;
