import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "../css/Map.css";
import Geolocation from "../components/Geolocation";

function MapVisitor() {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("");
  const [artworks, setArtworks] = useState([]);
  const mapRef = useRef(null);
  const location = Geolocation();

  const getRandomImageUrl = () => {
    const randomImageIndex = Math.floor(Math.random() * 10) + 1;
    return `/background${randomImageIndex}.png`;
  };

  useEffect(() => {
    setBackgroundImageUrl(getRandomImageUrl());
  }, []);

  useEffect(() => {
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.setView([
        location.coordinates.lat,
        location.coordinates.lng,
      ]);
    }
  }, [location, mapRef.current]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/pictures/artworks`)
      .then((res) => {
        setArtworks(res.data);
        console.info(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    height: 844,
  };

  const center = {
    lat: 0,
    lng: 0,
  };
  const ZOOM_LEVEL = 13;

  const showMyLocation = () => {
    if (location.loaded && !location.error && mapRef.current) {
      mapRef.current.setView([
        location.coordinates.lat,
        location.coordinates.lng,
      ]);
    }
  };

  const LATITUDE_OFFSET = 0.00008;
  const LONGITUDE_OFFSET = 0.00008;

  return (
    <div className="home-contenair" style={backgroundStyle}>
      <MapContainer
        className="leaflet-container-visitor"
        center={center}
        zoom={ZOOM_LEVEL}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {location.loaded && !location.error && (
          <Marker
            position={[location.coordinates.lat, location.coordinates.lng]}
          >
            <Popup>
              <p>ma localisation</p>
            </Popup>
          </Marker>
        )}
        {artworks.map((artwork, index) => (
          <Marker
            key={artwork.photo_id}
            icon={
              new L.Icon({
                iconUrl: `${import.meta.env.VITE_BACKEND_URL}/${
                  artwork.photo_src
                }`,
                iconSize: [50, 50],
              })
            }
            position={[
              parseFloat(artwork.latitude) + index * LATITUDE_OFFSET,
              parseFloat(artwork.longitude) - index * LONGITUDE_OFFSET,
            ]}
          >
            <Popup>
              <p>{artwork.title}</p>
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/${artwork.photo_src}`}
                alt={artwork.title}
                height="250px"
                width="250px"
              />
              <p>{artwork.title}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      <div className="button_l-p-visitor">
        <button type="button" className="location" onClick={showMyLocation}>
          <div className="button-text-map-visitor">Me</div>
        </button>
        <div>
          <Link to="/" className="connexion-button-visitor">
            <div className="button-connexion-map-visitor">Connexion</div>
          </Link>
          <button type="button" className="register-button-visitor">
            <Link to="/inscription">Register</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapVisitor;
