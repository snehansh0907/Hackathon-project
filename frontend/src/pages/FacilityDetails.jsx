import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TrustScore from "../components/TrustScore";
import { getFacility } from "../services/api";
import "./FacilityDetails.css";

/**
 * Facility Details page — /facility/:id
 * Shows the full picture of one facility. The "Report an Issue" and
 * "Verify This Facility" buttons are placeholders for a later milestone;
 * they intentionally do nothing yet.
 */
export default function FacilityDetails() {
  const { id } = useParams();
  const [facility, setFacility] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | not_found | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    getFacility(id)
      .then((data) => {
        if (cancelled) return;
        setFacility(data);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("not_found");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (status === "loading") {
    return <p className="state-message">Loading facility details…</p>;
  }

  if (status === "not_found" || status === "error") {
    return (
      <div className="state-message">
        <p>We couldn't find that facility.</p>
        <Link to="/" className="btn btn-secondary" style={{ marginTop: 16 }}>
          Back to map
        </Link>
      </div>
    );
  }

  return (
    <div className="page facility-page">
      <div className="container facility-layout">
        <Link to="/" className="facility-back">
          ← Back to map
        </Link>

        <div className="facility-header">
          <div>
            <h1 className="facility-name">{facility.name}</h1>
            <p className="facility-address">{facility.address}</p>
          </div>
          <TrustScore score={facility.trust_score} size="lg" />
        </div>

        <div className="facility-grid">
          <div className="facility-stat">
            <span className="eyebrow">Functionality</span>
            <p>{facility.functionality}</p>
          </div>
          <div className="facility-stat">
            <span className="eyebrow">Water</span>
            <p>{facility.water}</p>
          </div>
          <div className="facility-stat">
            <span className="eyebrow">Cleanliness</span>
            <p>{facility.cleanliness}</p>
          </div>
          <div className="facility-stat">
            <span className="eyebrow">Last verified</span>
            <p>{facility.last_verified}</p>
          </div>
        </div>

        <div className="facility-actions">
          <button className="btn btn-primary" type="button" disabled>
            Report an Issue
          </button>
          <button className="btn btn-secondary" type="button" disabled>
            Verify This Facility
          </button>
        </div>
        <p className="facility-actions-note">
          Reporting and verification are coming in a later milestone.
        </p>
      </div>
    </div>
  );
}
