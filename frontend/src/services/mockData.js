// ---------------------------------------------------------------------------
// Mock facility data.
//
// This stands in for the backend's /api/facilities and /api/facilities/:id
// endpoints until the real API is ready.
//
// IMPORTANT: trust_score, trust_breakdown, crowd_agreement, discrepancy,
// and priority are ALL fixed mock values here. None of them are
// calculated in the frontend — the backend owns that logic entirely.
// The frontend only ever displays whatever numbers/flags it receives.
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
    trust_breakdown: {
      recentReports: { score: 32, max: 35 },
      evidenceConfidence: { score: 18, max: 20 },
      crowdAgreement: { score: 18, max: 20 },
      officialConsistency: { score: 9, max: 10 },
      freshness: { score: 13, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 96,
      agreeCount: 48,
      disagreeCount: 2,
      recentReportCount: 50,
      lastReportTime: "10 minutes ago",
    },
    official_status: "Functional",
    citizen_status: "No problems reported",
    discrepancy: false,
    discrepancy_reason: null,
    priority: "LOW",
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
    last_verified: "12 minutes ago",
    // Breakdown matches the worked example from the product spec exactly.
    trust_breakdown: {
      recentReports: { score: 28, max: 35 },
      evidenceConfidence: { score: 17, max: 20 },
      crowdAgreement: { score: 16, max: 20 },
      officialConsistency: { score: 8, max: 10 },
      freshness: { score: 5, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 82,
      agreeCount: 41,
      disagreeCount: 9,
      recentReportCount: 50,
      lastReportTime: "12 minutes ago",
    },
    official_status: "Functional",
    citizen_status: "Working normally",
    discrepancy: false,
    discrepancy_reason: null,
    priority: "MEDIUM",
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
    last_verified: "1 hour ago",
    trust_breakdown: {
      recentReports: { score: 21, max: 35 },
      evidenceConfidence: { score: 12, max: 20 },
      crowdAgreement: { score: 11, max: 20 },
      officialConsistency: { score: 6, max: 10 },
      freshness: { score: 5, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 58,
      agreeCount: 18,
      disagreeCount: 13,
      recentReportCount: 31,
      lastReportTime: "1 hour ago",
    },
    official_status: "Functional",
    citizen_status: "Problem reported",
    discrepancy: true,
    discrepancy_reason:
      "Official records list this facility as fully functional, but at least 60% of recent citizen reports indicate a partial problem.",
    priority: "MEDIUM",
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
    // High-severity demo scenario: low trust + confirmed discrepancy + HIGH priority.
    trust_breakdown: {
      recentReports: { score: 10, max: 35 },
      evidenceConfidence: { score: 8, max: 20 },
      crowdAgreement: { score: 7, max: 20 },
      officialConsistency: { score: 3, max: 10 },
      freshness: { score: 4, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 22,
      agreeCount: 4,
      disagreeCount: 14,
      recentReportCount: 18,
      lastReportTime: "6 hours ago",
    },
    official_status: "Functional",
    citizen_status: "Problem reported",
    discrepancy: true,
    discrepancy_reason:
      "Official records list this facility as functional, but at least 3 recent citizen reports (100% of recent reports) indicate it is not working.",
    priority: "HIGH",
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
    trust_breakdown: {
      recentReports: { score: 26, max: 35 },
      evidenceConfidence: { score: 15, max: 20 },
      crowdAgreement: { score: 14, max: 20 },
      officialConsistency: { score: 7, max: 10 },
      freshness: { score: 6, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 74,
      agreeCount: 26,
      disagreeCount: 9,
      recentReportCount: 35,
      lastReportTime: "48 minutes ago",
    },
    official_status: "Functional",
    citizen_status: "No problems reported",
    discrepancy: false,
    discrepancy_reason: null,
    priority: "LOW",
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
    // Reverse discrepancy demo: official records show a problem, but
    // recent citizen reports say the facility is working again.
    trust_breakdown: {
      recentReports: { score: 16, max: 35 },
      evidenceConfidence: { score: 9, max: 20 },
      crowdAgreement: { score: 9, max: 20 },
      officialConsistency: { score: 3, max: 10 },
      freshness: { score: 4, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 45,
      agreeCount: 9,
      disagreeCount: 11,
      recentReportCount: 20,
      lastReportTime: "5 hours ago",
    },
    official_status: "Under maintenance",
    citizen_status: "Working normally",
    discrepancy: true,
    discrepancy_reason:
      "Official records indicate this facility is under maintenance, but recent citizen reports indicate it is working normally.",
    priority: "MEDIUM",
  },
  {
    id: 7,
    name: "Highway Rest Stop Toilet",
    address: "NH-8 Rest Stop",
    latitude: 26.8971,
    longitude: 75.539,
    trust_score: 81,
    functionality: "Working",
    water: "Available",
    cleanliness: "Good",
    last_verified: "18 minutes ago",
    trust_breakdown: {
      recentReports: { score: 30, max: 35 },
      evidenceConfidence: { score: 17, max: 20 },
      crowdAgreement: { score: 16, max: 20 },
      officialConsistency: { score: 8, max: 10 },
      freshness: { score: 10, max: 15 },
    },
    crowd_agreement: {
      agreementPercent: 90,
      agreeCount: 36,
      disagreeCount: 4,
      recentReportCount: 40,
      lastReportTime: "18 minutes ago",
    },
    official_status: "Functional",
    citizen_status: "No problems reported",
    discrepancy: false,
    discrepancy_reason: null,
    priority: "LOW",
  },
];

export function getMockFacilities() {
  return mockFacilities;
}

export function getMockFacilityById(id) {
  return mockFacilities.find((f) => String(f.id) === String(id));
}
