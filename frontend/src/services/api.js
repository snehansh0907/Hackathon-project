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
