// ---------------------------------------------------------------------------
// API service layer.
//
// This is the ONLY place the rest of the app should import facility data
// from. Right now every function returns mock data. When the backend is
// ready, swap the function bodies below for real fetch() calls — nothing
// else in the app needs to change.
// ---------------------------------------------------------------------------

import { getMockFacilities, getMockFacilityById } from "./mockData";

// Simulates network latency so loading states can be tested honestly.
function delay(ms = 250) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFacilities() {
  await delay();
  return getMockFacilities();

  // Real version, once the backend exists:
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facilities`);
  // if (!res.ok) throw new Error("Failed to load facilities");
  // return res.json();
}

export async function getFacility(id) {
  await delay();
  const facility = getMockFacilityById(id);
  if (!facility) {
    throw new Error("Facility not found");
  }
  return facility;

  // Real version, once the backend exists:
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/facilities/${id}`);
  // if (!res.ok) throw new Error("Failed to load facility");
  // return res.json();
}

/**
 * Sends the citizen's GPS coordinates to the backend to confirm they're
 * actually near the facility (the real 100m radius check happens on the
 * backend — the frontend never calculates distance itself).
 *
 * Mocked here: succeeds most of the time so the happy path is easy to
 * demo, but sometimes reports "too far" so the error state is testable
 * without needing to physically move.
 */
export async function verifyLocation({ facilityId, latitude, longitude }) {
  await delay(700);

  const verified = Math.random() > 0.15; // ~85% success rate

  if (!verified) {
    return {
      verified: false,
      message: "You appear to be too far from this facility to verify it.",
    };
  }

  return {
    verified: true,
    message: "Location verified.",
    checkedAt: new Date().toISOString(),
  };

  // Real version, once the backend exists:
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reports/verify-location`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ facilityId, latitude, longitude }),
  // });
  // if (!res.ok) throw new Error("Location verification failed");
  // return res.json();
}

/**
 * Submits a citizen report. `reportData` also carries the raw evidence
 * File object (if any) under `photoFile` — once the backend exists this
 * function is where that file gets uploaded (e.g. to Cloudinary) as part
 * of the same submission.
 *
 * Mocked here: usually succeeds, occasionally fails so the error state
 * (with retry) can be tested.
 */
export async function submitReport(reportData) {
  await delay(900);

  const ok = Math.random() > 0.1; // ~90% success rate
  if (!ok) {
    throw new Error("Couldn't submit your report. Please try again.");
  }

  return {
    success: true,
    reportId: `mock-${Date.now()}`,
  };

  // Real version, once the backend exists:
  // const formData = new FormData();
  // Object.entries(reportData).forEach(([key, value]) => {
  //   if (value !== null && value !== undefined) formData.append(key, value);
  // });
  // const res = await fetch(`${import.meta.env.VITE_API_URL}/api/reports`, {
  //   method: "POST",
  //   body: formData,
  // });
  // if (!res.ok) throw new Error("Failed to submit report");
  // return res.json();
}
