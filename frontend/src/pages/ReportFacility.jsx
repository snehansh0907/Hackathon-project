import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import GPSVerification from "../components/GPSVerification";
import ReportForm from "../components/ReportForm";
import { getFacility, submitReport } from "../services/api";
import "./ReportFacility.css";

// stage: "loading" | "gps" | "form" | "submitting" | "success" | "submit_error"
export default function ReportFacility() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [facility, setFacility] = useState(null);
  const [stage, setStage] = useState("loading");
  const [submitError, setSubmitError] = useState("");
  const [pendingReport, setPendingReport] = useState(null);

  useEffect(() => {
    let cancelled = false;

    getFacility(id)
      .then((data) => {
        if (cancelled) return;
        setFacility(data);
        setStage("gps");
      })
      .catch(() => {
        if (cancelled) return;
        setStage("not_found");
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleFormSubmit(formData) {
    setPendingReport(formData);
    setSubmitError("");
    setStage("submitting");

    try {
      await submitReport({ facilityId: id, ...formData });
      setStage("success");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setStage("submit_error");
    }
  }

  function handleRetrySubmit() {
    if (pendingReport) {
      handleFormSubmit(pendingReport);
    }
  }

  if (stage === "loading") {
    return <p className="state-message">Loading facility…</p>;
  }

  if (stage === "not_found") {
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
    <div className="page report-page">
      <div className="container report-layout">
        <div className="report-header">
          <Link to={`/facility/${id}`} className="report-back">
            ← Back to {facility.name}
          </Link>
        </div>

        {stage === "gps" && (
          <GPSVerification facilityId={id} onVerified={() => setStage("form")} />
        )}

        {stage === "form" && (
          <ReportForm onSubmit={handleFormSubmit} submitting={false} />
        )}

        {stage === "submitting" && (
          <ReportForm onSubmit={() => {}} submitting />
        )}

        {stage === "submit_error" && (
          <div className="report-result report-result--error">
            <span className="report-result__icon">!</span>
            <h2>Report submission failed</h2>
            <p>{submitError}</p>
            <div className="report-result__actions">
              <button className="btn btn-primary" onClick={handleRetrySubmit}>
                Try Again
              </button>
              <button className="btn btn-secondary" onClick={() => setStage("form")}>
                Edit Report
              </button>
            </div>
          </div>
        )}

        {stage === "success" && (
          <div className="report-result report-result--success">
            <span className="report-result__icon">✓</span>
            <h2>Report submitted successfully!</h2>
            <p>Thanks for helping keep {facility.name}'s status accurate.</p>
            <div className="report-result__actions">
              <button className="btn btn-primary" onClick={() => navigate(`/facility/${id}`)}>
                View Facility
              </button>
              <button className="btn btn-secondary" onClick={() => navigate("/")}>
                Back to Map
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
