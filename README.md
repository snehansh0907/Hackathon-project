# ToiletTrust 🚻

> **A real-time trust and accountability layer for public toilets and sanitation facilities.**

ToiletTrust combines recent, location-verified citizen observations, photographic evidence, crowd consensus, facility information, and official/demo maintenance records to show whether a public toilet can be trusted **right now** — and helps authorities identify and prioritize problems.

---

# 1. Project Title

**ToiletTrust**

# 2. One-line Description

A real-time public sanitation platform that verifies toilet conditions through citizen reports, evidence, crowd consensus, and an explainable Trust Score.

# 3. Problem

Information about public toilets can become outdated very quickly.

A toilet may be marked as functional in an official record while, in reality:

- Water is unavailable.
- The toilet is not functional.
- The facility is dirty.
- Lighting or other facilities are not working.
- Accessibility-related problems exist.
- Multiple recent visitors are experiencing the same problem.

Traditional ratings are also not very useful for a real-time question such as:

> **"Can I trust this public toilet right now?"**

ToiletTrust addresses this by combining **freshness, location verification, evidence, crowd agreement, and official information** instead of relying on a static rating.

# 4. Solution

ToiletTrust creates a feedback loop between citizens and sanitation authorities:

```text
Find Facility
     ↓
Location Verification
     ↓
Citizen Report
     ↓
Photo / Evidence
     ↓
Evidence Analysis
     ↓
Crowd Verification
     ↓
Trust Score
     ↓
Discrepancy Detection
     ↓
Priority / Issue
     ↓
Authority Action
     ↓
Maintenance Completed
     ↓
Citizen Re-verification
     ↓
Trust Score Updated
```

The platform does not assume that one report is automatically true.

Instead, it evaluates multiple signals:

- How recent the report is
- Whether the citizen was near the facility
- Whether evidence was provided
- Whether multiple reports agree
- Whether reports conflict with official/demo records
- Whether the issue has been resolved and re-verified

The Trust Score is intentionally **transparent and explainable**.

# 5. Key Features

## 5.1 Public Toilet Map 🗺️

An interactive map displays public toilet facilities.

Users can:

- See nearby facilities.
- Open a facility.
- View its Trust Score.
- See its current status.
- Start a verification/report.

Technology:

- Leaflet
- OpenStreetMap

---

## 5.2 Facility Profile 🚻

Each facility has a dedicated profile showing:

- Facility name
- Address
- Latitude/longitude
- Accessibility information
- Current Trust Score
- Current status
- Water availability
- Cleanliness condition
- Functionality
- Recent reports
- Last verification time
- Crowd confidence
- Open issues
- Maintenance information

Example:

```text
Central Market Public Toilet

Trust Score: 74 / 100
🟢 Generally Trusted

Water:       ✓ Available
Function:    ✓ Working
Cleanliness: ⚠️ Moderate

Last verified: 12 minutes ago

Crowd confidence: 82%
```

---

## 5.3 Location Verification 📍

Before submitting a verification, the browser requests the user's location.

The application calculates the approximate distance between:

```text
User Location
      +
Facility Location
      ↓
Distance Check
```

Example:

```text
Distance: 43 metres
Required range: 100 metres

✓ Location verified
```

If the user is too far away:

```text
Distance: 1.4 km

✕ You need to be closer to verify this facility.
```

The MVP uses a simple latitude/longitude distance calculation and does not require complex geospatial infrastructure.

---

## 5.4 Citizen Reporting 📝

A citizen can quickly report the current condition of a facility.

Possible fields:

### Functionality

```text
✓ Working
⚠️ Partially working
✕ Not working
```

### Water

```text
✓ Available
✕ Not available
```

### Cleanliness

```text
Excellent
Good
Average
Poor
Very Poor
```

### Other issues

Examples:

- Broken flush
- No lighting
- Bad smell
- Damaged door
- Accessibility problem
- Other

The report is timestamped automatically.

---

## 5.5 Photo Evidence 📷

Users can attach a photo as evidence.

The system stores:

- Image
- Report ID
- Timestamp
- Verification location
- Evidence confidence
- Duplicate/similarity information
- Optional AI analysis

The browser can allow:

- Camera capture
- Image upload

---

## 5.6 Evidence Confidence 🔍

Evidence confidence is a simple score that explains how strong the submitted evidence is.

Example factors:

```text
GPS verified             +25
Recent timestamp         +20
Photo provided           +20
No duplicate detected    +15
Crowd agreement          +20
                         ----
                         100
```

The exact weights can be tuned during implementation.

Example:

```text
Evidence Confidence: 85%

✓ Location verified
✓ Recent report
✓ Photo attached
✓ No duplicate detected
✓ Similar reports found
```

This is deliberately rule-based so that it is easy to explain and debug.

---

## 5.7 Duplicate / Similar Evidence Detection 🔍

The system attempts to identify whether the same or very similar evidence has already been submitted.

Basic implementation can use:

- Image hashing
- File metadata
- Basic image similarity

If a likely duplicate is detected:

```text
⚠️ Similar evidence has already been submitted.
```

This does not automatically reject the report; it can lower evidence confidence or flag it for review.

---

## 5.8 AI-Assisted Evidence Analysis 🤖

An existing AI vision API can analyze submitted photographs for visible issues.

Example:

```text
Citizen Photo
     ↓
AI Vision API
     ↓
Possible issues:
- Poor cleanliness
- Possible water-related issue
- Damaged fixture
     ↓
Confidence
```

The AI output is stored as supporting evidence.

### Important principle

AI does **not** decide whether a report is true by itself.

Instead:

```text
Citizen Report
+
GPS
+
Timestamp
+
Photo
+
AI Analysis
+
Crowd Agreement
+
Official Data
       ↓
Overall Assessment
```

No custom model training is required.

---

## 5.9 Crowd Verification 👥

Recent reports from multiple users can reinforce each other.

Example:

```text
10 recent reports

8 → No water
1 → Water available
1 → Not sure

Crowd agreement = 80%
```

The system can display:

> **80% of recent reports agree that water is unavailable.**

The calculation can be kept simple:

```text
matching recent reports
-----------------------
total relevant reports
```

Reports should be weighted toward recent observations.

---

## 5.10 Trust Score ⭐

The Trust Score is a 0–100 indicator of how trustworthy the current facility information is.

The score should be explainable rather than being a mysterious AI number.

Possible components:

```text
Recent citizen reports
Evidence confidence
Crowd agreement
Official status consistency
Freshness
Current issue severity
```

Example UI:

```text
             TRUST SCORE

                74 / 100
             🟢 Trusted

Recent reports          28 / 35
Evidence confidence     17 / 20
Crowd agreement         16 / 20
Official consistency     8 / 10
Freshness                5 / 15
                       ----------
                         74
```

The final weights should be agreed by the team before implementation.

---

## 5.11 Trust Score Freshness 🕐

A score should not appear equally trustworthy forever.

The UI therefore displays:

```text
Last verified:
12 minutes ago
```

Older information can gradually contribute less to the current assessment.

Example:

```text
2 minutes ago  → Very fresh
30 minutes ago → Fresh
3 hours ago    → Aging
2 days ago     → Stale
```

The exact freshness rules can be tuned during implementation.

---

## 5.12 Official vs Citizen Discrepancy Detection 🚨

The system compares official/demo facility status with recent citizen reports.

Example:

```text
Official status:
✓ Functional

Recent citizen reports:

✕ No water
✕ Broken flush
✕ Not functional

        ↓

⚠️ DISCREPANCY DETECTED
```

Another example:

```text
Official:
Maintenance completed

Recent citizen reports:
✕ Problem still exists

        ↓

⚠️ Re-verification required
```

This is one of the central features of ToiletTrust.

---

## 5.13 Issue and Priority Detection 🔴

The system converts important problems into issues for authorities.

Possible priority factors:

```text
Repeated negative reports
Low Trust Score
High crowd agreement
Severe problem
Official/citizen disagreement
Accessibility-related issue
Recent evidence
```

Example:

```text
Priority Score: 82 / 100

🔴 HIGH PRIORITY
```

Possible thresholds:

```text
70–100 → HIGH
40–69  → MEDIUM
0–39   → LOW
```

These thresholds are configurable.

---

## 5.14 Authority Dashboard 🏛️

Authorities/admins can view:

- Total facilities
- Current Trust Scores
- Low-trust facilities
- High-priority issues
- Discrepancies
- Recent reports
- Evidence
- Maintenance status
- Re-verification requests

Example:

```text
ADMIN DASHBOARD

Facilities              24
High Priority            4
Open Issues              7
Discrepancies             3
Recently Verified        12
```

---

## 5.15 Issue Management 🔧

Authorities can manage reported issues.

Example workflow:

```text
OPEN
  ↓
UNDER REVIEW
  ↓
MAINTENANCE
  ↓
MARKED RESOLVED
  ↓
WAITING FOR RE-VERIFICATION
  ↓
VERIFIED FIXED
```

If the problem still exists:

```text
Re-verification
      ↓
Problem still exists
      ↓
Issue reopened
```

---

## 5.16 Maintenance Records 🛠️

Authorities can record:

- Maintenance status
- Date
- Notes
- Issue addressed
- Resolution information

Example:

```text
Issue:
No water

Status:
Maintenance completed

Date:
16 Aug 2026

Note:
Water supply restored.

Status:
Waiting for citizen verification
```

---

## 5.17 Citizen Re-verification 🔄

After an authority marks an issue as repaired, a citizen can verify the facility again.

Flow:

```text
Issue reported
      ↓
Authority repairs
      ↓
Maintenance marked completed
      ↓
Citizen visits facility
      ↓
Location verified
      ↓
Citizen re-checks condition
      ↓
Problem fixed?
```

If yes:

```text
✓ Resolution confirmed
```

If no:

```text
✕ Issue still exists
→ Reopen issue
```

This closes the loop between reporting and actual resolution.

---

# 6. Demo

> **Placeholder:** Add the deployed demo URL.

```text
Live Demo:
<DEMO_URL>
```

## Recommended demo story

The strongest demonstration is a complete real-world scenario:

```text
1. User opens map
        ↓
2. Selects a public toilet
        ↓
3. Sees Trust Score = 72
        ↓
4. User physically verifies it
        ↓
5. Reports "No water"
        ↓
6. Adds photo
        ↓
7. AI identifies possible issue
        ↓
8. Other recent reports agree
        ↓
9. Trust Score falls
        ↓
10. Official record still says "Functional"
        ↓
11. Discrepancy detected
        ↓
12. Issue becomes HIGH priority
        ↓
13. Authority marks maintenance completed
        ↓
14. Citizen re-verifies
        ↓
15. Trust Score improves
```

This demonstrates the complete product rather than isolated screens.

# 7. Screenshots

## Home / Map

`[Screenshot placeholder]`

## Facility Details

`[Screenshot placeholder]`

## Location Verification

`[Screenshot placeholder]`

## Citizen Report

`[Screenshot placeholder]`

## Evidence / AI Analysis

`[Screenshot placeholder]`

## Trust Score Breakdown

`[Screenshot placeholder]`

## Discrepancy Alert

`[Screenshot placeholder]`

## Authority Dashboard

`[Screenshot placeholder]`

## Maintenance

`[Screenshot placeholder]`

## Re-verification

`[Screenshot placeholder]`

# 8. Tech Stack

The project remains intentionally understandable for beginner developers, while the extended deadline allows us to implement the full feature set.

## Frontend

- React
- Vite
- JavaScript
- CSS
- Leaflet

## Backend

- Node.js
- Express

The backend handles:

- Authentication/authorization integration
- Reports
- Evidence processing
- Trust Score calculation
- Crowd verification
- Discrepancy detection
- Priority calculation
- Issue management
- Maintenance workflow
- Re-verification
- Database operations
- AI API communication

## Database

- PostgreSQL

The initial implementation can avoid PostGIS and use a simple Haversine distance calculation for proximity verification.

If the team later finds a genuine need for advanced geospatial queries, PostGIS can be introduced without changing the core product.

## Authentication

- Managed authentication such as Supabase Auth

This avoids building a complete authentication system from scratch.

Roles:

```text
Citizen
Authority/Admin
```

## Maps

- Leaflet
- OpenStreetMap

## Location

- Browser Geolocation API

## Evidence Storage

- Selected object/image storage service

> **Placeholder:** Final storage provider.

## AI

- Existing AI vision API

> **Placeholder:** Final AI provider/model.

## Version Control

- Git
- GitHub

## Deployment

- Vercel or equivalent frontend hosting
- Node-compatible backend hosting
- Managed PostgreSQL
- Managed authentication/storage

# 9. Architecture Overview

```text
                              USER
                                |
                                v
                     +----------------------+
                     | React + Vite Frontend|
                     +----------+-----------+
                                |
              +-----------------+-----------------+
              |                 |                 |
              v                 v                 v
          Leaflet          Browser GPS       Auth Service
        OpenStreetMap
                                |
                                v
                     +----------------------+
                     | Node.js + Express    |
                     |       Backend        |
                     +----------+-----------+
                                |
       +------------------------+------------------------+
       |            |            |          |            |
       v            v            v          v            v
   PostgreSQL   Image Store   AI Vision  Trust Logic  Auth
                              API
       |
       +------------------------------------------------+
       |             |            |          |            |
       v             v            v          v            v
 facilities       reports     evidence   maintenance    issues
       |
       +------------------------+
       |            |           |
       v            v           v
 trust_scores  verifications  discrepancies
```

## Request flow: Citizen report

```text
Citizen
  ↓
React Report Form
  ↓
Browser gets GPS
  ↓
POST /api/reports
  ↓
Express validates request
  ↓
Check distance from facility
  ↓
Store report
  ↓
Store evidence
  ↓
Optional AI analysis
  ↓
Calculate evidence confidence
  ↓
Calculate crowd confidence
  ↓
Recalculate Trust Score
  ↓
Check discrepancy
  ↓
Calculate priority
  ↓
Create/update issue
  ↓
Return updated facility state
  ↓
React updates UI
```

## Request flow: Re-verification

```text
Authority marks maintenance completed
        ↓
Issue status = WAITING_FOR_VERIFICATION
        ↓
Citizen opens facility
        ↓
Citizen submits new verification
        ↓
GPS check
        ↓
New report
        ↓
Compare with previous issue
        ↓
Problem fixed?
   ↙             ↘
 YES              NO
 ↓                 ↓
Resolve          Reopen
 ↓                 ↓
Update Trust     Increase priority
```

# 10. Project Structure

```text
toilet-trust/
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Map.jsx
│       │   ├── FacilityCard.jsx
│       │   ├── FacilityStatus.jsx
│       │   ├── TrustScore.jsx
│       │   ├── TrustBreakdown.jsx
│       │   ├── StatusBadge.jsx
│       │   ├── ReportForm.jsx
│       │   ├── EvidenceUpload.jsx
│       │   ├── EvidenceAnalysis.jsx
│       │   ├── CrowdVerification.jsx
│       │   ├── DiscrepancyAlert.jsx
│       │   ├── PriorityBadge.jsx
│       │   ├── IssueCard.jsx
│       │   ├── MaintenancePanel.jsx
│       │   ├── ReverificationForm.jsx
│       │   └── DashboardCard.jsx
│       │
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── FacilityDetails.jsx
│       │   ├── Report.jsx
│       │   ├── Login.jsx
│       │   ├── Profile.jsx
│       │   └── AdminDashboard.jsx
│       │
│       ├── services/
│       │   ├── api.js
│       │   ├── auth.js
│       │   ├── map.js
│       │   └── storage.js
│       │
│       ├── utils/
│       │   ├── distance.js
│       │   ├── formatting.js
│       │   └── validation.js
│       │
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── facilities.js
│   │   │   ├── reports.js
│   │   │   ├── evidence.js
│   │   │   ├── issues.js
│   │   │   ├── maintenance.js
│   │   │   └── verification.js
│   │   │
│   │   ├── services/
│   │   │   ├── trustScore.js
│   │   │   ├── crowdVerification.js
│   │   │   ├── discrepancy.js
│   │   │   ├── priority.js
│   │   │   ├── evidence.js
│   │   │   ├── duplicateDetection.js
│   │   │   ├── aiAnalysis.js
│   │   │   └── reverification.js
│   │   │
│   │   ├── db/
│   │   │   └── database.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── admin.js
│   │   │   └── validation.js
│   │   │
│   │   └── server.js
│   │
│   └── package.json
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
├── .env.example
└── README.md
```

# 11. Prerequisites

Expected:

- Node.js
- npm
- Git
- GitHub account
- PostgreSQL
- Authentication provider account
- Image storage account if required
- AI API key
- Modern browser with geolocation support

> **Placeholder:** Add exact versions after the environment is finalized.

# 12. Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
cd toilet-trust
```

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

Create environment files using `.env.example`.

Set up PostgreSQL using the database schema.

Configure authentication, storage, and AI API credentials.

# 13. Environment Variables

## Frontend

```env
VITE_API_URL=<BACKEND_API_URL>
VITE_AUTH_URL=<AUTH_PROVIDER_URL>
VITE_STORAGE_URL=<STORAGE_URL_IF_NEEDED>
```

## Backend

```env
PORT=<PORT>
DATABASE_URL=<POSTGRES_CONNECTION_STRING>
AUTH_SECRET=<AUTH_SECRET>
AI_API_KEY=<AI_API_KEY>
IMAGE_STORAGE_URL=<IMAGE_STORAGE_URL>
```

> **Important:** Never commit real secrets or API keys to GitHub.

> **Placeholder:** Replace these names with the exact variables used by the final implementation.

# 14. How to Run Frontend

```bash
cd frontend
npm install
npm run dev
```

> **Placeholder:** Add final local frontend URL/port.

# 15. How to Run Backend

```bash
cd backend
npm install
npm run dev
```

> **Placeholder:** Add final local backend URL/port.

# 16. Database Setup

The project uses PostgreSQL.

## Main tables

```text
users
facilities
reports
evidence
maintenance
trust_scores
issues
verifications
```

## `users`

Stores application users and their roles.

```text
id
name
email
role
created_at
```

Roles:

```text
citizen
authority
admin
```

## `facilities`

Stores public toilet information.

```text
id
name
address
latitude
longitude
accessibility
official_status
created_at
updated_at
```

## `reports`

Stores citizen observations.

```text
id
facility_id
user_id
functionality
water
cleanliness
other_problem
latitude
longitude
created_at
```

## `evidence`

Stores submitted evidence.

```text
id
report_id
image_url
timestamp
evidence_confidence
duplicate_flag
ai_analysis
ai_confidence
created_at
```

## `maintenance`

Stores authority maintenance information.

```text
id
facility_id
issue_id
status
maintenance_date
notes
created_at
```

## `trust_scores`

Stores calculated Trust Score information.

```text
id
facility_id
trust_score
crowd_confidence
evidence_confidence
freshness_score
official_consistency
discrepancy_score
priority_score
score_breakdown
calculated_at
```

## `issues`

Stores problems requiring attention.

```text
id
facility_id
source_report_id
priority
status
reason
created_at
updated_at
```

## `verifications`

Stores explicit verification/re-verification events.

```text
id
facility_id
report_id
user_id
verification_type
result
created_at
```

Possible verification types:

```text
initial
reverification
```

Possible results:

```text
verified_fixed
still_problematic
```

## Relationships

```text
users
  |
  +---- reports
  |       |
  |       +---- evidence
  |
  +---- verifications
            |
            +---- facilities
                    |
                    +---- maintenance
                    |
                    +---- trust_scores
                    |
                    +---- issues
                    |
                    +---- reports
```

## Indexes

Useful indexes can be added for:

- `facilities(latitude, longitude)`
- `reports(facility_id, created_at)`
- `issues(facility_id, status)`
- `trust_scores(facility_id, calculated_at)`
- `evidence(report_id)`

The exact indexing strategy can be finalized after implementation.

## Demo seed data

The project should use a small, clearly labelled dataset suitable for the hackathon demonstration.

# 17. API Documentation

The application uses a REST API through Node.js + Express.

> **Placeholder:** Final endpoint names and schemas should be updated after implementation.

## Authentication

```http
POST /api/auth/profile
```

Returns/creates the application profile after authentication.

## Facilities

```http
GET /api/facilities
```

Returns facilities for the map.

```http
GET /api/facilities/:id
```

Returns facility details.

```http
GET /api/facilities/:id/reports
```

Returns recent reports.

```http
GET /api/facilities/:id/trust-score
```

Returns the current Trust Score and breakdown.

## Reports

```http
POST /api/reports
```

Creates a citizen report.

Conceptual request:

```json
{
  "facility_id": 1,
  "functionality": "non_functional",
  "water": false,
  "cleanliness": "poor",
  "other_problem": "No water available",
  "latitude": 20.2963,
  "longitude": 85.8247
}
```

Backend flow:

```text
Validate request
      ↓
Validate authentication
      ↓
Check proximity
      ↓
Store report
      ↓
Process evidence
      ↓
Calculate evidence confidence
      ↓
Calculate crowd confidence
      ↓
Recalculate Trust Score
      ↓
Check discrepancy
      ↓
Calculate priority
      ↓
Create/update issue
      ↓
Return updated state
```

## Evidence

```http
POST /api/evidence
```

Uploads/associates evidence with a report.

Possible processing:

```text
Upload image
    ↓
Store image
    ↓
Generate basic image identifier
    ↓
Check possible duplicate
    ↓
Optional AI analysis
    ↓
Calculate evidence confidence
    ↓
Store evidence result
```

## Issues

```http
GET /api/issues
```

Returns issues for authorized users.

```http
GET /api/issues/:id
```

Returns issue details.

```http
PATCH /api/issues/:id
```

Updates issue status/priority.

Possible statuses:

```text
OPEN
UNDER_REVIEW
MAINTENANCE
WAITING_FOR_VERIFICATION
RESOLVED
REOPENED
```

## Maintenance

```http
POST /api/maintenance
```

Creates a maintenance update.

Conceptual request:

```json
{
  "facility_id": 1,
  "issue_id": 5,
  "status": "completed",
  "notes": "Water supply restored."
}
```

## Re-verification

```http
POST /api/verifications
```

Creates a citizen verification/re-verification event.

Conceptual request:

```json
{
  "facility_id": 1,
  "verification_type": "reverification",
  "result": "verified_fixed",
  "latitude": 20.2963,
  "longitude": 85.8247
}
```

# 18. Testing

Testing should focus on complete user journeys rather than only individual functions.

## Citizen journey

```text
Login
 ↓
Open map
 ↓
Select facility
 ↓
View Trust Score
 ↓
Verify location
 ↓
Submit report
 ↓
Upload evidence
 ↓
See updated status
```

## Crowd verification

Test:

- One report
- Multiple matching reports
- Conflicting reports
- Old reports
- Recent reports

## Trust Score

Test:

- Healthy facility
- Low-trust facility
- Multiple negative reports
- High evidence confidence
- Low evidence confidence
- Stale information
- Official/citizen disagreement

## AI

Test:

- Successful AI response
- AI detects possible issue
- AI returns low confidence
- AI API failure
- Invalid image

The application should still work if the AI service is unavailable.

## Duplicate evidence

Test:

- Same image submitted twice
- Different images
- Similar images
- Duplicate flag handling

## Location

Test:

- User within verification radius
- User outside verification radius
- Location permission denied
- Location unavailable

## Authority workflow

```text
Issue created
    ↓
Priority calculated
    ↓
Open
    ↓
Under Review
    ↓
Maintenance
    ↓
Waiting for Verification
    ↓
Citizen verifies
    ↓
Resolved OR Reopened
```

## Security

Test that:

- Citizens cannot modify Trust Scores directly.
- Citizens cannot access authority-only operations.
- Authority routes require the correct role.
- Invalid report data is rejected.
- Users cannot submit arbitrary facility IDs without validation.
- API keys are not exposed in frontend code.
- Authentication tokens are handled securely.

# 19. Deployment

Planned deployment:

```text
                       GitHub
                          |
             +------------+------------+
             |                         |
             v                         v
        React/Vite                 Node/Express
         Frontend                    Backend
             |                         |
             |                         |
             +------------+------------+
                          |
                          v
                     PostgreSQL
                          |
             +------------+------------+
             |            |            |
             v            v            v
         Auth Service  Image Store   AI API
```

## Frontend

Deploy the React/Vite application to Vercel or an equivalent service.

## Backend

Deploy the Node/Express application to a Node-compatible hosting service.

> **Placeholder:** Final provider.

## Database

Use managed PostgreSQL.

## Production URLs

```text
Frontend:
<FRONTEND_URL>

Backend:
<BACKEND_URL>
```

# 20. Future Improvements

After the hackathon, the product could be extended with:

- Trusted reporter reputation
- Advanced image similarity
- Better AI evidence analysis
- AI-generated report summaries
- Push notifications
- SMS notifications
- Real municipal/government APIs
- Live municipal maintenance systems
- Advanced accessibility information
- Historical Trust Score graphs
- Predictive maintenance
- More advanced geospatial search
- Nationwide facility coverage
- Offline reporting
- Multi-language support
- Public sanitation analytics

# 21. Team Members

> **Placeholder — add actual team information.**

| Name | Role |
|---|---|
| `<TEAM MEMBER 1>` | `<ROLE>` |
| `<TEAM MEMBER 2>` | `<ROLE>` |

---

# Development Priority

Because the deadline has been extended to **6:00 PM on 16 August**, the project is no longer restricted to a minimal feature set.

The team should implement the **full planned feature set**, while still keeping the underlying engineering understandable.

## Priority 1 — Foundation

```text
React + Vite
Node + Express
PostgreSQL
Authentication
GitHub
```

## Priority 2 — Main Citizen Experience

```text
Map
 ↓
Facility Details
 ↓
GPS Verification
 ↓
Report
 ↓
Photo Evidence
```

## Priority 3 — Intelligence Layer

```text
Evidence Confidence
 ↓
Crowd Verification
 ↓
Trust Score
 ↓
Freshness
 ↓
Discrepancy Detection
 ↓
Priority Score
```

## Priority 4 — Authority Experience

```text
Admin Dashboard
 ↓
Issue Management
 ↓
Maintenance
 ↓
Resolution
```

## Priority 5 — Closed-Loop Verification

```text
Maintenance Completed
 ↓
Citizen Re-verification
 ↓
Issue Resolved / Reopened
 ↓
Trust Score Updated
```

## Priority 6 — AI and Polish

```text
AI Evidence Analysis
 ↓
Duplicate Detection
 ↓
Better UI
 ↓
Loading/Error states
 ↓
Demo polish
```

---

# Implementation Philosophy

The project has enough development time to implement the features, but **more time does not mean we should make the architecture unnecessarily complicated**.

The guiding principle is:

> **Build all the product features, but implement each one with the simplest reliable technology.**

We intentionally avoid:

- Training our own AI model
- Building a custom computer-vision pipeline
- Building a separate AI backend
- Unnecessary microservices
- Continuous location tracking
- Over-engineered authentication
- Nationwide infrastructure
- Complex contractor management

We do use:

- Existing APIs/services
- Explainable formulas
- A single Node/Express backend
- PostgreSQL
- Managed authentication
- Managed image storage
- Browser GPS
- Existing AI vision APIs
- Simple image similarity/deduplication
- A small but convincing demo dataset

This gives the team enough room to build the **complete ToiletTrust experience** without turning the hackathon into a production infrastructure project.

---

# Core Product Loop

The complete product loop is:

```text
                 ┌───────────────┐
                 │ Find Facility │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Verify Nearby │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Submit Report │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │    Evidence   │
                 └───────┬───────┘
                         ↓
              ┌──────────┴──────────┐
              ↓                     ↓
       Crowd Verification      AI Analysis
              └──────────┬──────────┘
                         ↓
                 ┌───────────────┐
                 │  Trust Score  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Discrepancy?  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Issue/Priority│
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │  Maintenance  │
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Re-verification│
                 └───────┬───────┘
                         ↓
                 ┌───────────────┐
                 │ Updated Trust │
                 │     Score     │
                 └───────────────┘
```

This is the **full feature set** we intend to build for the hackathon.

---

# Demo Dataset

The MVP/demo should use a small, clearly labelled set of public toilet facilities and maintenance records.

The dataset should intentionally contain different states, for example:

```text
Facility A → Healthy / High Trust
Facility B → Low water availability
Facility C → Official/citizen discrepancy
Facility D → Maintenance completed / awaiting verification
Facility E → Multiple conflicting reports
```

This allows the judges to see the important features without requiring nationwide real-world data.

> **Placeholder:** Add final facilities and locations once selected.

# License

> **Placeholder:** Add the project's license if one is selected.
