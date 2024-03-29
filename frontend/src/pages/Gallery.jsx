import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import "../css/galerie.css";

function Gallery() {
  const { user } = useUser();
  const userId = user.id;
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [userPhotos, setUserPhotos] = useState([]);

  const getRandomImageUrl = () => {
    const randomImageIndex = Math.floor(Math.random() * 10) + 1;
    return `/background${randomImageIndex}.png`;
  };

  useEffect(() => {
    setBackgroundImageUrl(getRandomImageUrl());
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundattachment: "fixed",
    height: "auto",
  };
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/user/${userId}`)
      .then((res) => {
        setUserPhotos(res.data);
      })

      .catch((err) => {
        console.error(err);
      });
  }, [userId]);

  return (
    <div className="galery-contenair" style={backgroundStyle}>
      {userPhotos.map((photo) => (
        <img
          key={`photo_${photo.id}`}
          height="200px"
          width="200px"
          className="galery-img"
          src={`${import.meta.env.VITE_BACKEND_URL}/${photo.photo_src}`}
          alt={`street art - ${photo.id}`}
        />
      ))}
      <Link to="/user-profil" type="button" className="back-button">
        <div className="button-text">Back</div>
      </Link>
    </div>
  );
}

export default Gallery;
