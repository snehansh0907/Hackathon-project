import { useRef, useState } from "react";
import "./PhotoUpload.css";

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Optional photo evidence uploader.
 *
 * Kept independent of any backend — it only ever hands the raw File
 * object back to the parent via `onChange(file)`. Later, whatever
 * submits the report can send that File to Cloudinary (or wherever)
 * without this component needing to change.
 */
export default function PhotoUpload({ onChange }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Please choose a JPG, PNG, or WEBP image.");
      onChange(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`Image is too large. Please choose one under ${MAX_FILE_SIZE_MB}MB.`);
      onChange(null);
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setFileName(file.name);
      setIsProcessing(false);
      onChange(file);
    };
    reader.onerror = () => {
      setIsProcessing(false);
      setError("Couldn't read that image. Please try another file.");
      onChange(null);
    };
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    setPreview(null);
    setFileName("");
    setError("");
    if (inputRef.current) inputRef.current.value = "";
    onChange(null);
  }

  return (
    <div className="photo-upload">
      <label className="photo-upload__label">
        <span>Photo evidence</span>
        <span className="photo-upload__optional">Optional</span>
      </label>

      {!preview && (
        <button
          type="button"
          className="photo-upload__dropzone"
          onClick={() => inputRef.current?.click()}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing image…" : "Tap to choose a photo"}
        </button>
      )}

      {preview && (
        <div className="photo-upload__preview">
          <img src={preview} alt="Selected evidence preview" />
          <div className="photo-upload__preview-meta">
            <span className="photo-upload__filename">{fileName}</span>
            <button
              type="button"
              className="btn btn-secondary photo-upload__remove"
              onClick={handleRemove}
            >
              Remove
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileSelect}
        className="photo-upload__input"
      />

      {error && <p className="photo-upload__error">{error}</p>}
    </div>
  );
}
