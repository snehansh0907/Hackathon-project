import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TrustScore from "../components/TrustScore";
import DiscrepancyAlert from "../components/DiscrepancyAlert";
import { getFacility } from "../services/api";
import "./FacilityDetails.css";

/**
 * Facility Details page — /facility/:id
 *
 * Layout order (per product spec):
 * Facility info → Trust Score → Discrepancy status → GPS/Verify → Report.
 *
 * Every score/flag below comes straight from the facility object
 * returned by the API layer — nothing on this page is calculated here.
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

        {/* Facility information */}
        <div className="facility-header">
          <h1 className="facility-name">{facility.name}</h1>
          <p className="facility-address">{facility.address}</p>
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

        {/* Trust Score + breakdown */}
        <section className="facility-section">
          <h2 className="facility-section__title">Trust Score</h2>
          <TrustScore
            score={facility.trust_score}
            breakdown={facility.trust_breakdown}
            size="lg"
          />
        </section>

        {/* Discrepancy status */}
        <section className="facility-section">
          <DiscrepancyAlert
            discrepancy={facility.discrepancy}
            official_status={facility.official_status}
            citizen_status={facility.citizen_status}
            discrepancy_reason={facility.discrepancy_reason}
          />
        </section>

        {/* GPS / Verify + Report */}
        <div className="facility-actions">
          <Link to={`/facility/${facility.id}/report`} className="btn btn-primary">
            Verify &amp; Report
          </Link>
        </div>
        <p className="facility-actions-note">
          You'll verify your location first, then report on current conditions.
        </p>
      </div>
    </div>
  );
}
