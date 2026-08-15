# ToiletTrust

> **A real-time trust index for public toilets and sanitation facilities.**

## 1. Project Title

**ToiletTrust**

## 2. One-line Description

A public toilet and sanitation platform that combines citizen reports, location verification, evidence analysis, recent conditions, and official maintenance records into a transparent Trust Score.

---

## 3. Problem

Public toilet information can become outdated, while the actual condition of a facility may change quickly.

ToiletTrust addresses the gap between:

- what official records say about a public toilet, and
- what citizens are currently experiencing.

The system also needs to distinguish genuine, recent reports from duplicate, recycled, or potentially unreliable evidence.

---

## 4. Solution

ToiletTrust provides:

1. A map of public toilet facilities.
2. Facility details and a Trust Score.
3. Citizen verification and reporting.
4. Location-based check-in.
5. Granular condition reporting.
6. Evidence submission through the camera.
7. Multi-signal evidence confidence.
8. Detection of potential discrepancies between official records and citizen reports.
9. Automatic repair-priority calculation.
10. An authority dashboard for prioritizing issues.
11. Post-maintenance community re-verification.

The Trust Score remains transparent and rule-based. AI is used for evidence analysis and issue detection, not as the sole source of truth.

---

## 5. Key Features

### Citizen Features

- Public toilet map
- Toilet/facility details
- Trust Score
- Citizen condition reports
- Location/proximity verification
- Check-in timestamp
- Functionality reporting
- Water-availability reporting
- Cleanliness rating
- Flush/functionality rating
- Lighting rating
- Hygiene rating
- Recent-report information
- Current facility status

### Evidence Verification

Evidence is treated as supporting evidence rather than absolute proof.

The MVP can combine:

- Camera-based capture during a report
- GPS consistency
- Check-in timestamp
- Evidence timestamp
- Image issue detection
- Image/perceptual-hash duplicate detection
- Facility/evidence visual consistency
- Multiple independent reports

The system produces an **Evidence Confidence Score** instead of claiming that an image is definitely real or fake.

### Crowd Verification

Multiple independent reports about the same issue increase confidence.

For example:

```text
1 recent report
      ↓
Low confidence

Multiple independent reports
      ↓
Higher confidence

Multiple reports + consistent evidence
      ↓
High confidence
```

Repeated reports of the same issue should be treated as multiple confirmations of one incident rather than blindly counting them as separate problems.

### Trust & Discrepancy Engine

- Aggregates recent citizen reports
- Calculates crowd confidence
- Calculates facility Trust Score
- Compares crowd reports with official maintenance records
- Detects potential discrepancies
- Calculates repair priority
- Tracks issue status

### Municipality Features

- View facilities and current status
- View citizen reports
- View evidence confidence
- View high-priority facilities
- Compare citizen reports with official maintenance records
- Track reported/resolved issues
- Mark maintenance progress
- Trigger/review post-maintenance verification

### Re-Verification

When an official maintenance record is marked as resolved, the facility can be re-verified by citizens.

If the same issue continues to receive recent, credible reports, the issue can be flagged again.

---

## 6. Demo

> **Placeholder:** Add the deployed demo URL here.

`[Live Demo URL]`

---

## 7. Screenshots

### Home / Map

`[Screenshot placeholder]`

### Toilet Details / Trust Score

`[Screenshot placeholder]`

### Report Form / Evidence

`[Screenshot placeholder]`

### Admin Dashboard

`[Screenshot placeholder]`

### Discrepancy / Priority View

`[Screenshot placeholder]`

---

## 8. Tech Stack

### Frontend

**Existing frontend remains unchanged.**

- React
- Vite
- CSS / Tailwind CSS *(depending on the existing implementation)*

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL
- PostGIS for location-based queries

### Authentication

- JWT

### Evidence / AI Service

- Python
- FastAPI
- Computer Vision / image-analysis model: `[FINAL MODEL TO BE SELECTED]`

### Maps and Location

- Leaflet
- OpenStreetMap
- Browser Geolocation API

### Image Storage

`[IMAGE STORAGE PROVIDER]`

### Deployment

- Frontend: `[FRONTEND HOST]`
- Backend: `[BACKEND HOST]`
- AI Service: `[AI SERVICE HOST]`
- Database: `[DATABASE HOST]`

### Version Control

- GitHub

---

## 9. Architecture Overview

The existing React/Vite frontend is kept unchanged from a UI perspective. The backend layer is moved to a dedicated Node.js/Express API.

```text
                         USER
                           |
                           v
                 +---------------------+
                 | Existing React/Vite |
                 |      Frontend       |
                 +----------+----------+
                            |
                         REST API
                            |
                            v
                 +---------------------+
                 | Node.js + Express   |
                 |      Backend        |
                 +----------+----------+
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
        PostgreSQL       Evidence       Auth
         + PostGIS       Service        / JWT
              |          FastAPI
              |             |
              |             v
              |       Evidence Analysis
              |             |
              +------+------+
                     |
                     v
            Trust / Discrepancy Engine
                     |
             +-------+-------+
             |               |
             v               v
        Trust Score      Priority Score
             |               |
             +-------+-------+
                     |
                     v
              Admin Dashboard
```

### Evidence Verification Flow

```text
Camera Capture
      |
      v
GPS + Check-in Validation
      |
      v
Image Analysis
      |
      +----> Issue Detection
      |
      +----> Duplicate Detection
      |
      +----> Facility Consistency
      |
      v
Evidence Confidence
      |
      v
Crowd Verification
      |
      v
Trust / Discrepancy Engine
```

### Important Design Principle

The system does **not** attempt to determine whether a single image is absolutely genuine.

Instead, it combines several signals:

```text
GPS
+
Timestamp
+
Camera Capture
+
Image Analysis
+
Duplicate Detection
+
Facility Consistency
+
Independent Reports
+
Official Records
```

to calculate confidence.

---

## 10. Project Structure

The existing frontend structure should remain unchanged.

```text
toilet-trust/
|
├── frontend/                    # Existing frontend — unchanged
|   └── [EXISTING FRONTEND STRUCTURE]
|
├── backend/
|   ├── src/
|   |   ├── controllers/
|   |   ├── routes/
|   |   ├── models/
|   |   ├── services/
|   |   ├── middleware/
|   |   ├── utils/
|   |   └── app.[js/ts]
|   |
|   ├── .env.example
|   └── package.json
|
├── ai-service/
|   ├── app/
|   |   ├── routes/
|   |   ├── services/
|   |   └── models/
|   |
|   ├── requirements.txt
|   └── main.py
|
└── README.md
```

---

## 11. Prerequisites

Expected prerequisites:

- Node.js
- npm
- PostgreSQL
- PostGIS
- Python 3.x
- pip
- Git
- A modern web browser
- `[IMAGE STORAGE REQUIREMENT]`
- `[MAP API / CONFIGURATION REQUIREMENT IF APPLICABLE]`

> Add exact versions once the implementation is finalized.

---

## 12. Installation

### Clone the Repository

```bash
git clone <REPOSITORY_URL>
cd toilet-trust
```

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Install AI Service Dependencies

```bash
cd ../ai-service
pip install -r requirements.txt
```

### Install Existing Frontend Dependencies

```bash
cd ../frontend
npm install
```

The frontend UI/components are not being replaced. Only its backend data/API integration should point to the new backend where required.

---

## 13. Environment Variables

### Backend

Create `backend/.env`:

```env
PORT=<BACKEND_PORT>
DATABASE_URL=<POSTGRESQL_CONNECTION_STRING>
JWT_SECRET=<JWT_SECRET>
AI_SERVICE_URL=<AI_SERVICE_URL>
IMAGE_STORAGE_URL=<IMAGE_STORAGE_URL>
IMAGE_STORAGE_API_KEY=<IMAGE_STORAGE_API_KEY>
```

### Frontend

Keep the existing frontend environment variables required by the current implementation.

```env
[EXISTING_FRONTEND_ENVIRONMENT_VARIABLES]
```

### AI Service

```env
PORT=<AI_SERVICE_PORT>
```

Add model/provider-specific variables if the final implementation requires them.

> Never commit private secrets to GitHub.

---

## 14. How to Run Frontend

From the existing frontend directory:

```bash
cd frontend
npm install
npm run dev
```

> If the current repository keeps the React/Vite app in the project root instead of `/frontend`, use the existing project command/location.

---

## 15. How to Run Backend

```bash
cd backend
npm install
npm run dev
```

Expected backend URL:

```text
http://localhost:<BACKEND_PORT>
```

The backend provides REST endpoints for:

- Authentication
- Facilities
- Reports
- Evidence
- Maintenance
- Trust Scores
- Discrepancies
- Priority issues

---

## 16. Database Setup

The MVP uses **PostgreSQL + PostGIS**.

Enable PostGIS:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Simplified MVP Schema

The database intentionally uses only **six main tables**.

### 1. `users`

Stores citizens, officials, and contractors.

```text
users
----------------
id                  PK
name
email
password_hash
role                citizen / official / contractor / admin
reputation_score
created_at
```

### 2. `facilities`

Stores public toilet information.

```text
facilities
----------------
id                  PK
name
address
latitude
longitude
ward
contractor_id       FK -> users.id
is_active
created_at
```

### 3. `reports`

Stores check-ins, citizen ratings, and issue reports.

```text
reports
----------------
id                  PK
user_id             FK -> users.id
facility_id         FK -> facilities.id

latitude
longitude
checkin_time

cleanliness
water
flush
lighting
hygiene

issue_type
description
status
created_at
```

### 4. `evidence`

Stores evidence metadata and evidence-analysis results.

```text
evidence
----------------
id                  PK
report_id           FK -> reports.id
image_url
captured_at
image_hash
detected_issue
ai_confidence
gps_match
duplicate_flag
created_at
```

### 5. `maintenance`

Stores official maintenance information.

```text
maintenance
----------------
id                  PK
facility_id         FK -> facilities.id
issue_type
description
status              reported / repairing / resolved
contractor_id       FK -> users.id
reported_at
resolved_at
official_note
```

### 6. `trust_scores`

Stores the calculated facility-level results.

```text
trust_scores
----------------
id                  PK
facility_id         FK -> facilities.id

trust_score
discrepancy_score
priority_score
crowd_confidence
official_status
score_breakdown
last_updated
```

### Relationship Overview

```text
users
  |
  +---- reports ---- facilities
  |         |
  |         +---- evidence
  |
  +---- maintenance ---- facilities
                              |
                              v
                         trust_scores
```

> `[ADD FINAL SQL MIGRATION/SCHEMA FILE PATH HERE]`

---

## 17. API Documentation

### Base URL

```text
<BACKEND_BASE_URL>
```

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

---

### Facilities

#### Get Nearby Facilities

```http
GET /api/facilities/nearby?latitude=<LAT>&longitude=<LONG>
```

#### Get Facility

```http
GET /api/facilities/:id
```

#### Get Facility Trust Score

```http
GET /api/facilities/:id/trust-score
```

---

### Reports

#### Create Report

```http
POST /api/reports
```

Example:

```json
{
  "facility_id": "<FACILITY_ID>",
  "latitude": "<LATITUDE>",
  "longitude": "<LONGITUDE>",
  "cleanliness": 2,
  "water": 1,
  "flush": 5,
  "lighting": 4,
  "hygiene": 2,
  "issue_type": "water_unavailable",
  "description": "Water is currently unavailable."
}
```

#### Get Facility Reports

```http
GET /api/facilities/:id/reports
```

---

### Evidence

#### Submit Evidence

```http
POST /api/reports/:id/evidence
```

The backend should validate the report/check-in context and send the evidence to the AI service for analysis.

Possible analysis output:

```json
{
  "detected_issue": "water_unavailable",
  "ai_confidence": 0.91,
  "gps_match": true,
  "duplicate_flag": false
}
```

---

### Maintenance

#### Get Maintenance Records

```http
GET /api/facilities/:id/maintenance
```

#### Update Maintenance Status

```http
PATCH /api/maintenance/:id
```

---

### Trust & Discrepancy

#### Get Trust Score

```http
GET /api/facilities/:id/trust-score
```

#### Get High-Priority Facilities

```http
GET /api/admin/priority-facilities
```

#### Get Discrepancies

```http
GET /api/admin/discrepancies
```

> Add the final request/response schemas once the backend implementation is complete.

---

## 18. Testing

### Backend

```bash
cd backend
npm test
```

### AI Service

```bash
cd ai-service
pytest
```

### Core MVP Test Cases

- Valid user authentication
- Invalid authentication
- Valid facility check-in
- Check-in outside facility radius
- Valid report submission
- Invalid rating values
- Evidence upload
- GPS/evidence consistency
- Duplicate/recycled evidence
- Issue detection confidence
- Multiple independent reports
- Crowd confidence calculation
- Official vs crowd discrepancy
- Trust Score calculation
- Priority Score calculation
- Maintenance resolution
- Post-maintenance re-verification
- Admin authorization
- Database permissions

### End-to-End Demo Flow

```text
Open Application
       |
       v
View Toilet Map
       |
       v
Open Facility
       |
       v
Check In
       |
       v
Submit Rating + Issue
       |
       v
Capture Evidence
       |
       v
Evidence Analysis
       |
       v
Trust Score Updates
       |
       v
Official Record Comparison
       |
       v
Discrepancy Detected
       |
       v
Priority Score Generated
       |
       v
Admin Dashboard
       |
       v
Maintenance
       |
       v
Community Re-Verification
```

---

## 19. Deployment

### Planned Deployment

```text
GitHub
  |
  +--------------------+
  |                    |
  v                    v
Frontend              Backend
Vercel                [BACKEND HOST]
                           |
                 +---------+---------+
                 |                   |
                 v                   v
             PostgreSQL          AI Service
             + PostGIS           [AI HOST]
```

### Frontend

The existing React/Vite frontend can continue to be deployed on Vercel.

### Backend

Deploy the Node.js/Express API to:

```text
[BACKEND HOST]
```

### AI Service

Deploy the FastAPI service to:

```text
[AI SERVICE HOST]
```

### Database

Use:

```text
[POSTGRESQL HOST]
```

Configure production environment variables and verify:

- Frontend → Backend connectivity
- Backend → PostgreSQL connectivity
- Backend → AI service connectivity
- Backend → Image storage connectivity

---

## 20. Future Improvements

Potential future improvements include:

- More advanced computer vision models
- Improved evidence authenticity analysis
- Advanced duplicate/recycled-image detection
- Better complaint clustering
- Predictive maintenance
- IoT-based toilet sensors
- Automatic water availability monitoring
- Multi-language citizen interface
- SMS/WhatsApp notifications
- User reputation improvements
- Ward-level sanitation heatmaps
- Historical sanitation trends
- Advanced municipality analytics
- Larger facility coverage

---

## 21. Team Members

> **Placeholder — add team information here.**

| Name | Role |
|---|---|
| `<TEAM MEMBER 1>` | `<ROLE>` |
| `<TEAM MEMBER 2>` | `<ROLE>` |
| `<TEAM MEMBER 3>` | `<ROLE>` |
| `<TEAM MEMBER 4>` | `<ROLE>` |

---

## MVP Focus

The core product flow is:

```text
Find
  ↓
Location Check-in
  ↓
Report
  ↓
Capture Evidence
  ↓
Evidence Confidence
  ↓
Crowd Verification
  ↓
Trust Score
  ↓
Official Record Comparison
  ↓
Discrepancy Detection
  ↓
Repair Priority
  ↓
Authority Action
  ↓
Community Re-Verification
```

The MVP should prioritize completing this end-to-end flow reliably before adding optional features.

## Design Principle

**The system does not claim that AI can perfectly identify a fake image.**

Instead, it makes fraudulent or unreliable reporting harder by combining:

**live camera capture + GPS + timestamps + image analysis + duplicate detection + facility consistency + independent reports + official records.**

This makes the Trust Score an evidence-based confidence measure rather than a simple average of user ratings.
