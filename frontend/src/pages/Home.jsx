import { useEffect, useState } from "react";
import Map from "../components/Map";
import { getFacilities } from "../services/api";
import "./Home.css";

/**
 * Home / Map page — the app's landing screen.
 * Loads facilities through the API service layer (mock data for now)
 * and hands them to the map to render as markers.
 */
export default function Home() {
  const [facilities, setFacilities] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;

    getFacilities()
      .then((data) => {
        if (cancelled) return;
        setFacilities(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="page home-page">
      <div className="home-intro">
        <div className="container home-intro__inner">
          <div>
            <span className="eyebrow">Public Sanitation Trust Index</span>
            <h1 className="home-title">Can you trust this toilet right now?</h1>
            <p className="home-subtitle">
              ToiletTrust combines recent citizen reports with official
              records to show the real, current condition of public
              toilets near you.
            </p>
          </div>
          <button className="btn btn-primary" type="button">
            Find toilets near me
          </button>
        </div>
      </div>

      <div className="home-map-wrap">
        {status === "loading" && (
          <p className="state-message">Loading nearby facilities…</p>
        )}
        {status === "error" && (
          <p className="state-message">
            Couldn't load facilities right now. Please try again shortly.
          </p>
        )}
        {status === "ready" && facilities.length === 0 && (
          <p className="state-message">No facilities found nearby yet.</p>
        )}
        {status === "ready" && facilities.length > 0 && (
          <Map facilities={facilities} />
        )}
      </div>
    </div>
  );
}
