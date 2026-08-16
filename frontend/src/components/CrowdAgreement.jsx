import "./CrowdAgreement.css";

/**
 * Displays crowd verification stats for a facility. Purely presentational
 * — the agreement percentage and counts always come from the backend,
 * which is responsible for deciding who "agrees" with whom.
 *
 * Usage:
 * <CrowdAgreement
 *   agreementPercent={82}
 *   agreeCount={41}
 *   disagreeCount={9}
 *   recentReportCount={50}
 *   lastReportTime="12 minutes ago"
 * />
 */
export default function CrowdAgreement({
  agreementPercent,
  agreeCount,
  disagreeCount,
  recentReportCount,
  lastReportTime,
}) {
  return (
    <div className="crowd-agreement">
      <span className="eyebrow">Crowd verification</span>
      <p className="crowd-agreement__headline">
        <strong>{agreementPercent}%</strong> of recent reports agree
      </p>

      <div className="crowd-agreement__bar">
        <div
          className="crowd-agreement__bar-fill"
          style={{ width: `${agreementPercent}%` }}
        />
      </div>

      <div className="crowd-agreement__stats">
        <div className="crowd-agreement__stat">
          <span className="crowd-agreement__stat-value crowd-agreement__stat-value--agree">
            {agreeCount}
          </span>
          <span className="crowd-agreement__stat-label">Agree</span>
        </div>
        <div className="crowd-agreement__stat">
          <span className="crowd-agreement__stat-value crowd-agreement__stat-value--disagree">
            {disagreeCount}
          </span>
          <span className="crowd-agreement__stat-label">Disagree</span>
        </div>
        <div className="crowd-agreement__stat">
          <span className="crowd-agreement__stat-value">{recentReportCount}</span>
          <span className="crowd-agreement__stat-label">Recent reports</span>
        </div>
      </div>

      <p className="crowd-agreement__last-report">
        Last reported: <strong>{lastReportTime}</strong>
      </p>
    </div>
  );
}
