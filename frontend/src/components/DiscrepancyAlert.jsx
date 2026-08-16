import "./DiscrepancyAlert.css";

/**
 * Shows whether official records and recent citizen reports agree about
 * a facility's condition.
 *
 * IMPORTANT: this component never decides whether a discrepancy exists —
 * that determination is made entirely by the backend. This component
 * only renders whatever it's told, for both the "flagged" and
 * "consistent" states.
 *
 * Usage:
 * <DiscrepancyAlert
 *   discrepancy={true}
 *   official_status="Functional"
 *   citizen_status="Problem reported"
 *   discrepancy_reason="Multiple recent citizen reports indicate a functionality problem."
 * />
 */
export default function DiscrepancyAlert({
  discrepancy,
  official_status,
  citizen_status,
  discrepancy_reason,
}) {
  if (discrepancy) {
    return (
      <div className="discrepancy-alert discrepancy-alert--warning" role="alert">
        <div className="discrepancy-alert__header">
          <span className="discrepancy-alert__icon discrepancy-alert__icon--warning">⚠</span>
          <h3 className="discrepancy-alert__title">Information Discrepancy</h3>
        </div>

        <div className="discrepancy-alert__compare">
          <div className="discrepancy-alert__col">
            <span className="eyebrow">Official records</span>
            <p>{official_status}</p>
          </div>
          <div className="discrepancy-alert__col">
            <span className="eyebrow">Recent citizen reports</span>
            <p>{citizen_status}</p>
          </div>
        </div>

        {discrepancy_reason && (
          <div className="discrepancy-alert__reason-block">
            <span className="eyebrow">Why this was flagged</span>
            <p className="discrepancy-alert__reason">{discrepancy_reason}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="discrepancy-alert discrepancy-alert--consistent">
      <div className="discrepancy-alert__header">
        <span className="discrepancy-alert__icon discrepancy-alert__icon--consistent">✓</span>
        <h3 className="discrepancy-alert__title">Information Consistent</h3>
      </div>
      <p className="discrepancy-alert__consistent-copy">
        Official records and recent citizen reports are currently consistent.
      </p>
    </div>
  );
}
