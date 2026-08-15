import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FacilityMarker from "./FacilityMarker";
import "./Map.css";

// Default center: Bagru, Rajasthan. Falls back here if geolocation isn't
// available or the user hasn't granted permission.
const DEFAULT_CENTER = [26.9086, 75.5385];
const DEFAULT_ZOOM = 14;

/**
 * Renders the Leaflet map with a marker per facility.
 * `facilities` is an array in the mockData/api shape.
 */
export default function Map({ facilities }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="app-map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {facilities.map((facility) => (
        <FacilityMarker key={facility.id} facility={facility} />
      ))}
    </MapContainer>
  );
}
