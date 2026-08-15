// ---------------------------------------------------------------------------
// Mock facility data.
//
// This stands in for the backend's /api/facilities and /api/facilities/:id
// endpoints until the real API is ready. Trust scores here are fixed
// numbers only — the frontend never calculates a Trust Score itself.
// That logic belongs entirely to the backend.
// ---------------------------------------------------------------------------

export const mockFacilities = [
  {
    id: 1,
    name: "Central Market Public Toilet",
    address: "Central Market Road, Bagru",
    latitude: 26.9086,
    longitude: 75.5385,
    trust_score: 90,
    functionality: "Working",
    water: "Available",
    cleanliness: "Excellent",
    last_verified: "10 minutes ago",
  },
  {
    id: 2,
    name: "Bus Stand Sulabh Complex",
    address: "State Highway Bus Stand",
    latitude: 26.9142,
    longitude: 75.5502,
    trust_score: 74,
    functionality: "Working",
    water: "Available",
    cleanliness: "Good",
    last_verified: "32 minutes ago",
  },
  {
    id: 3,
    name: "Railway Station Toilet Block",
    address: "Bagru Railway Station",
    latitude: 26.9019,
    longitude: 75.5461,
    trust_score: 55,
    functionality: "Partially working",
    water: "Available",
    cleanliness: "Average",
    last_verified: "2 hours ago",
  },
  {
    id: 4,
    name: "Community Park Facility",
    address: "Nehru Park, Sector 4",
    latitude: 26.9163,
    longitude: 75.5327,
    trust_score: 32,
    functionality: "Not working",
    water: "Not available",
    cleanliness: "Poor",
    last_verified: "6 hours ago",
  },
  {
    id: 5,
    name: "Textile Market Toilet",
    address: "Dyeing Cluster Road",
    latitude: 26.9105,
    longitude: 75.5449,
    trust_score: 68,
    functionality: "Working",
    water: "Available",
    cleanliness: "Good",
    last_verified: "48 minutes ago",
  },
  {
    id: 6,
    name: "Government School Public Block",
    address: "Near Govt. Sr. Sec. School",
    latitude: 26.9224,
    longitude: 75.5411,
    trust_score: 41,
    functionality: "Partially working",
    water: "Not available",
    cleanliness: "Poor",
    last_verified: "5 hours ago",
  },
  {
    id: 7,
    name: "Highway Rest Stop Toilet",
    address: "NH-8 Rest Stop",
    latitude: 26.8971,
    longitude: 75.5390,
    trust_score: 81,
    functionality: "Working",
    water: "Available",
    cleanliness: "Good",
    last_verified: "18 minutes ago",
  },
];

export function getMockFacilities() {
  return mockFacilities;
}

export function getMockFacilityById(id) {
  return mockFacilities.find((f) => String(f.id) === String(id));
}
