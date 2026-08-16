import "./TrustScore.css";

// Score bands purely for display (color + label). Thresholds mirror the
// Priority Score bands used elsewhere so the color language is consistent
// across the app. The backend is the source of truth for the score itself.
function getTrustBand(score) {
  if (score >= 70) {
    return { label: "Generally Trusted", key: "high" };
  }
  if (score >= 40) {
    return { label: "Needs Attention", key: "mid" };
  }
  return { label: "Low Trust", key: "low" };
}

const BREAKDOWN_LABELS = {
  recentReports: "Recent reports",
  evidenceConfidence: "Evidence confidence",
  crowdAgreement: "Crowd agreement",
  officialConsistency: "Official consistency",
  freshness: "Freshness",
};

/**
 * Displays a Trust Score and its breakdown. Purely presentational — it
 * never calculates anything. Both the score and the breakdown numbers
 * always come from the backend.
 *
 * Usage:
 * <TrustScore
 *   score={74}
 *   breakdown={{
 *     recentReports: { score: 28, max: 35 },
 *     evidenceConfidence: { score: 17, max: 20 },
 *     crowdAgreement: { score: 16, max: 20 },
 *     officialConsistency: { score: 8, max: 10 },
 *     freshness: { score: 5, max: 15 },
 *   }}
 * />
 */
export default function TrustScore({ score, breakdown, size = "md" }) {
  const band = getTrustBand(score);
  // Gauge is drawn as a ring using conic-gradient; 0-100 maps to 0-360deg.
  const angle = (score / 100) * 360;

  return (
    <div className="trust-score">
      <div
        className={`trust-gauge trust-gauge--${size}`}
        role="img"
        aria-label={`Trust score ${score} out of 100, ${band.label}`}
      >
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

      {breakdown && (
        <div className="trust-breakdown">
          <span className="eyebrow trust-breakdown__title">Breakdown</span>
          <ul className="trust-breakdown__list">
            {Object.entries(breakdown).map(([key, { score: partScore, max }]) => (
              <li key={key} className="trust-breakdown__item">
                <div className="trust-breakdown__row">
                  <span>{BREAKDOWN_LABELS[key] || key}</span>
                  <span className="trust-breakdown__value">
                    {partScore}/{max}
                  </span>
                </div>
                <div className="trust-breakdown__bar">
                  <div
                    className="trust-breakdown__bar-fill"
                    style={{ width: `${(partScore / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
