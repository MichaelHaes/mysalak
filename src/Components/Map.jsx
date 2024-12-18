import React, { useState, useEffect, useRef } from "react";
import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Styles/Map.css";
import axios from "axios";
import env from "react-dotenv";

const MapComponent = (props) => {
  const mapRef = useRef(null);
  const latitude = -7.621672504970947;
  const longitude = 110.39189700526022;
  const [polygons, setPolygons] = useState([]);
  const sebaran = props.sebaran;

  const getKelompokTani = async () => {
    const response = await axios.get(`${env.API_URL}/kelompok-tani`);
    setPolygons(response.data);
  };

  useEffect(() => {
    getKelompokTani();
  }, []);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      ref={mapRef}
      zoomControl={false}
      style={{
        height: "96vh",
        width: "inherit",
        zIndex: 1,
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {polygons.map((item) => (
        <Polygon
          positions={item.coordinates}
          pathOptions={{
            color:
              sebaran[item.id - 1]?.jumlah > 50
                ? "rgba(255, 105, 0)"
                : sebaran[item.id - 1]?.jumlah > 10
                ? "rgba(244, 240, 145)"
                : "rgba(235, 181, 181)",
          }}
          eventHandlers={{
            click: () => {
              props.handleDetail(item.id - 1);
            },
          }}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
