import "./TrustScore.css";

// Score bands. Thresholds mirror the Priority Score bands used elsewhere
// in the product (see README) so the color language stays consistent
// across the whole app.
function getTrustBand(score) {
  if (score >= 70) {
    return { label: "Trusted", key: "high" };
  }
  if (score >= 40) {
    return { label: "Needs Attention", key: "mid" };
  }
  return { label: "Low Trust", key: "low" };
}

/**
 * Displays a Trust Score. Purely presentational — it never calculates
 * anything. The number always comes from the backend.
 *
 * Usage: <TrustScore score={74} />
 * Usage: <TrustScore score={74} size="lg" />
 */
export default function TrustScore({ score, size = "md" }) {
  const band = getTrustBand(score);
  // Gauge is drawn as a ring using conic-gradient; 0-100 maps to 0-360deg.
  const angle = (score / 100) * 360;

  return (
    <div className={`trust-gauge trust-gauge--${size}`} role="img" aria-label={`Trust score ${score} out of 100, ${band.label}`}>
      <div
        className={`trust-gauge__ring trust-gauge__ring--${band.key}`}
        style={{ "--gauge-angle": `${angle}deg` }}
      >
        <div className="trust-gauge__face">
          <span className="trust-gauge__score">{score}</span>
          <span className="trust-gauge__scale">/ 100</span>
        </div>
      </div>
      <span className={`trust-gauge__badge trust-gauge__badge--${band.key}`}>
        {band.label}
      </span>
    </div>
  );
}
