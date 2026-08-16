import "./PriorityBadge.css";

const PRIORITY_COPY = {
  HIGH: "Needs urgent attention",
  MEDIUM: "Should be reviewed soon",
  LOW: "No immediate action needed",
};

/**
 * Displays the facility's current Priority Score band. Purely
 * presentational — the backend decides HIGH/MEDIUM/LOW, this component
 * just renders it.
 *
 * Usage: <PriorityBadge priority="HIGH" />
 */
export default function PriorityBadge({ priority }) {
  const key = priority?.toLowerCase();

  return (
    <div className={`priority-badge priority-badge--${key}`}>
      <span className="priority-badge__label">
        <span className="priority-badge__dot" />
        {priority} priority
      </span>
      <span className="priority-badge__copy">{PRIORITY_COPY[priority]}</span>
    </div>
  );
}
