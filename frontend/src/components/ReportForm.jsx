import { useState } from "react";
import PhotoUpload from "./PhotoUpload";
import "./ReportForm.css";

const FUNCTIONALITY_OPTIONS = ["Working", "Partially working", "Not working"];
const WATER_OPTIONS = ["Available", "Not available"];
const CLEANLINESS_OPTIONS = ["Excellent", "Good", "Average", "Poor", "Very Poor"];

/**
 * The report form itself. Purely a controlled form + validation —
 * submission (loading/success/error) is handled by the parent page,
 * which is what actually calls the API.
 *
 * Calls `onSubmit(formData)` once the form passes validation.
 */
export default function ReportForm({ onSubmit, submitting }) {
  const [functionality, setFunctionality] = useState("");
  const [water, setWater] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [otherIssue, setOtherIssue] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!functionality) nextErrors.functionality = "Please select the facility's functionality.";
    if (!water) nextErrors.water = "Please select water availability.";
    if (!cleanliness) nextErrors.cleanliness = "Please select a cleanliness rating.";
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSubmit({
      functionality,
      water,
      cleanliness,
      otherIssue: otherIssue.trim() || null,
      photoFile,
    });
  }

  return (
    <form className="report-form" onSubmit={handleSubmit} noValidate>
      <span className="eyebrow">Step 2 of 2</span>
      <h2 className="report-form__title">Report facility condition</h2>

      <fieldset className="report-field">
        <legend>Functionality</legend>
        <div className="report-options">
          {FUNCTIONALITY_OPTIONS.map((option) => (
            <label key={option} className="report-radio">
              <input
                type="radio"
                name="functionality"
                value={option}
                checked={functionality === option}
                onChange={(e) => setFunctionality(e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.functionality && <p className="report-field__error">{errors.functionality}</p>}
      </fieldset>

      <fieldset className="report-field">
        <legend>Water</legend>
        <div className="report-options">
          {WATER_OPTIONS.map((option) => (
            <label key={option} className="report-radio">
              <input
                type="radio"
                name="water"
                value={option}
                checked={water === option}
                onChange={(e) => setWater(e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.water && <p className="report-field__error">{errors.water}</p>}
      </fieldset>

      <fieldset className="report-field">
        <legend>Cleanliness</legend>
        <div className="report-options">
          {CLEANLINESS_OPTIONS.map((option) => (
            <label key={option} className="report-radio">
              <input
                type="radio"
                name="cleanliness"
                value={option}
                checked={cleanliness === option}
                onChange={(e) => setCleanliness(e.target.value)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        {errors.cleanliness && <p className="report-field__error">{errors.cleanliness}</p>}
      </fieldset>

      <label className="report-field">
        <span className="report-field__label">
          Other issue <span className="report-field__optional">Optional</span>
        </span>
        <textarea
          className="report-textarea"
          rows={3}
          value={otherIssue}
          onChange={(e) => setOtherIssue(e.target.value)}
          placeholder="Describe anything else worth noting…"
          maxLength={300}
        />
      </label>

      <div className="report-field">
        <PhotoUpload onChange={setPhotoFile} />
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit Report"}
      </button>
    </form>
  );
}
