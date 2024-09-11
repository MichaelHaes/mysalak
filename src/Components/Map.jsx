import React, { useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Styles/Map.css";

const MapComponent = (props) => {
  const mapRef = useRef(null);
  const latitude = -7.6081624308551445;
  const longitude = 110.40267984934648;

  const sebaran = props.sebaran;

  const markerBahaya = new L.divIcon({
    html: "<div class='custom-marker status-bahaya'></div>",
    iconSize: [50, 50],
  });

  const markerWaspada = new L.divIcon({
    html: "<div class='custom-marker status-waspada'></div>",
    iconSize: [50, 50],
  });

  const markerAman = new L.divIcon({
    html: "<div class='custom-marker status-aman'></div>",
    iconSize: [50, 50],
  });

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={16}
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

      {sebaran.map((item) => (
        <Marker
          icon={item.jumlah > 50 ? markerBahaya
                : item.jumlah > 10 ? markerWaspada
                : markerAman
          }
          position={[item.lat, item.lng]}
          eventHandlers={{
            click: () => {
              // console.log("click");
              props.handleDetail(item);
            },
          }}
        ></Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
