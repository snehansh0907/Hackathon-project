import { useState } from "react";
import { verifyLocation } from "../services/api";
import "./GPSVerification.css";

// step: "idle" | "locating" | "verifying" | "success" | "denied" | "failed"
const STEP_COPY = {
  locating: "Requesting your location…",
  verifying: "Checking you're near this facility…",
  success: "Location verified.",
  denied: "Location permission was denied.",
  failed: "You're too far from this facility to verify it.",
};

/**
 * Reusable GPS verification step.
 *
 * Requests browser geolocation, then sends the coordinates to the (mock)
 * backend to confirm the citizen is close enough to the facility. The
 * actual distance/radius check always happens on the backend — this
 * component never calculates distance itself.
 *
 * Calls `onVerified()` once verification succeeds.
 */
export default function GPSVerification({ facilityId, onVerified }) {
  const [step, setStep] = useState("idle");
  const [errorDetail, setErrorDetail] = useState("");

  function startVerification() {
    setErrorDetail("");

    if (!("geolocation" in navigator)) {
      setStep("denied");
      setErrorDetail("Your browser doesn't support location services.");
      return;
    }

    setStep("locating");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setStep("verifying");
        try {
          const result = await verifyLocation({
            facilityId,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });

          if (result.verified) {
            setStep("success");
            onVerified();
          } else {
            setStep("failed");
            setErrorDetail(result.message);
          }
        } catch (err) {
          setStep("failed");
          setErrorDetail(err.message || "Verification failed. Please try again.");
        }
      },
      (geoError) => {
        setStep("denied");
        setErrorDetail(
          geoError.code === geoError.PERMISSION_DENIED
            ? "You'll need to allow location access to verify this facility."
            : "Couldn't get your location. Please try again."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  const isBusy = step === "locating" || step === "verifying";
  const isError = step === "denied" || step === "failed";

  return (
    <div className="gps-card">
      <span className="eyebrow">Step 1 of 2</span>
      <h2 className="gps-title">Verify your location</h2>
      <p className="gps-subtitle">
        We use your GPS location to confirm you're actually at this
        facility before you report on it.
      </p>

      <div className={`gps-status gps-status--${step}`}>
        {step === "idle" && (
          <p className="gps-status__text">
            Tap the button below and allow location access when prompted.
          </p>
        )}

        {isBusy && (
          <div className="gps-status__row">
            <span className="gps-spinner" aria-hidden="true" />
            <p className="gps-status__text">{STEP_COPY[step]}</p>
          </div>
        )}

        {step === "success" && (
          <div className="gps-status__row">
            <span className="gps-icon gps-icon--success">✓</span>
            <p className="gps-status__text">{STEP_COPY[step]}</p>
          </div>
        )}

        {isError && (
          <div className="gps-status__row">
            <span className="gps-icon gps-icon--error">!</span>
            <div>
              <p className="gps-status__text">{STEP_COPY[step]}</p>
              {errorDetail && <p className="gps-status__detail">{errorDetail}</p>}
            </div>
          </div>
        )}
      </div>

      {(step === "idle" || isError) && (
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={startVerification}
        >
          {isError ? "Try Again" : "Verify this facility"}
        </button>
      )}

      {isBusy && (
        <button type="button" className="btn btn-secondary btn-block" disabled>
          Please wait…
        </button>
      )}
    </div>
  );
}
