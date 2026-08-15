import { Marker, Popup } from "react-leaflet";
import { divIcon } from "leaflet";
import { useNavigate } from "react-router-dom";

// Trust band -> color, matching the tokens in index.css.
// (Leaflet divIcon HTML can't read CSS variables directly at style-build
// time, so the hexes are repeated here — kept in sync manually since
// there are only three bands.)
function trustColor(score) {
  if (score >= 70) return "#2f8f6b";
  if (score >= 40) return "#c9861a";
  return "#bd4636";
}

function buildIcon(score) {
  const color = trustColor(score);
  return divIcon({
    className: "facility-marker",
    html: `<span style="background:${color}"></span>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10],
  });
}

/**
 * A single facility marker on the map. Clicking it opens a popup with a
 * quick summary; "View Details" navigates to the facility's full page.
 */
export default function FacilityMarker({ facility }) {
  const navigate = useNavigate();

  return (
    <Marker
      position={[facility.latitude, facility.longitude]}
      icon={buildIcon(facility.trust_score)}
    >
      <Popup>
        <div className="facility-popup">
          <strong className="facility-popup__name">{facility.name}</strong>
          <div className="facility-popup__score">
            Trust Score: <strong>{facility.trust_score}</strong> / 100
          </div>
          <div className="facility-popup__status">{facility.functionality}</div>
          <button
            className="btn btn-primary btn-block facility-popup__btn"
            onClick={() => navigate(`/facility/${facility.id}`)}
          >
            View Details
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
