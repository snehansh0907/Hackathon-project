# Hackathon-project
# ToiletTrust

> **A real-time trust index for public toilets and sanitation facilities.**

## 1. Project Title

**ToiletTrust**

## 2. One-line Description

A public toilet and sanitation platform that combines citizen reports, facility information, and recent conditions into a transparent Trust Score to help users find reliable facilities and authorities identify problems.

## 3. Problem

Public toilet information can become outdated, while the actual condition of a facility may change quickly.

ToiletTrust addresses the gap between:

- what official records say about a public toilet, and
- what citizens are currently experiencing.

The project focuses on making facility condition more transparent and helping authorities identify facilities that may require attention.

## 4. Solution

ToiletTrust provides:

1. A map of public toilet facilities.
2. Facility details and a Trust Score.
3. Citizen verification and reporting.
4. Recent-condition information.
5. Detection of potential discrepancies between official records and citizen reports.
6. An authority dashboard for prioritizing issues.

The Trust Score is intended to be transparent and rule-based rather than dependent on a machine-learning model.

## 5. Key Features

- Public toilet map
- Toilet/facility details
- Trust Score
- Citizen condition reports
- Functionality reporting
- Water-availability reporting
- Cleanliness rating
- Location/proximity verification
- Recent-report information
- Potential discrepancy detection
- Authority/admin dashboard
- Issue priority and status workflow

### Nice-to-have features

The following are optional and may not be part of the MVP:

- Photo evidence
- AI-assisted complaint summarization/categorization
- Notifications
- User reputation
- Advanced analytics

## 6. Demo

> **Placeholder:** Add the deployed demo URL here.

`[Live Demo URL]`

## 7. Screenshots

### Home / Map

`[Screenshot placeholder]`

### Toilet Details

`[Screenshot placeholder]`

### Report Form

`[Screenshot placeholder]`

### Admin Dashboard

`[Screenshot placeholder]`

## 8. Tech Stack

### Frontend

- React
- Vite
- CSS / Tailwind CSS *(depending on the final implementation)*

### Backend / Database

- Supabase
- PostgreSQL
- Supabase Authentication

### Maps and Location

- Leaflet
- OpenStreetMap
- Browser Geolocation API

### Deployment

- Vercel

### Version Control

- GitHub

### Optional AI

An AI service may be used for optional complaint categorization or summarization if implemented.

> **Note:** The final AI provider/API has not been specified.

## 9. Architecture Overview

The application uses a simple architecture designed for a hackathon.

```text
                    USER
                      |
                      v
             +------------------+
             | React + Vite     |
             | Frontend         |
             +--------+---------+
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
      Leaflet     Browser GPS   Supabase
      + OSM                       |
                                  |
                     +------------+------------+
                     |                         |
                     v                         v
                PostgreSQL              Authentication
                     |
          +----------+----------+
          |          |           |
          v          v           v
       Toilets    Reports    Maintenance
                     |
                     v
               Trust Score
                     |
             +-------+-------+
             |               |
             v               v
       Discrepancy       Priority
        Detection       Calculation
             |               |
             +-------+-------+
                     |
                     v
              Admin Dashboard
```

The project does not require a separate custom Node.js/Express backend for the planned MVP. Supabase provides the database, authentication, and backend services.

## 10. Project Structure

The planned project structure is:

```text
toilet-trust/
|
├── public/
|
├── src/
|   |
|   ├── components/
|   |   ├── Navbar.jsx
|   |   ├── Map.jsx
|   |   ├── ToiletCard.jsx
|   |   ├── TrustScore.jsx
|   |   ├── StatusBadge.jsx
|   |   └── ReportForm.jsx
|   |
|   ├── pages/
|   |   ├── Home.jsx
|   |   ├── ToiletDetails.jsx
|   |   ├── Report.jsx
|   |   ├── Login.jsx
|   |   └── AdminDashboard.jsx
|   |
|   ├── services/
|   |   ├── supabase.js
|   |   ├── toiletService.js
|   |   ├── reportService.js
|   |   └── trustScore.js
|   |
|   ├── hooks/
|   |   └── useLocation.js
|   |
|   ├── utils/
|   |   ├── distance.js
|   |   └── priority.js
|   |
|   ├── App.jsx
|   ├── main.jsx
|   └── index.css
|
├── .env
├── package.json
└── README.md
```

> **Note:** This is the planned structure. Update it if the final implementation differs.

## 11. Prerequisites

The exact prerequisites for the final project have not been formally specified.

Expected prerequisites for the planned architecture include:

- Node.js
- npm
- Git
- A GitHub account
- A Supabase project
- A modern web browser

> **Placeholder:** Add exact Node.js/npm versions once finalized.

## 12. Installation

Clone the repository:

```bash
git clone <REPOSITORY_URL>
```

Enter the project directory:

```bash
cd toilet-trust
```

Install frontend dependencies:

```bash
npm install
```

Create the environment file:

```text
.env
```

Add the required environment variables described below.

Then start the development server:

```bash
npm run dev
```

> **Note:** Replace `<REPOSITORY_URL>` with the actual repository URL.

## 13. Environment Variables

The planned application requires Supabase connection information.

Create a `.env` file in the project root.

```env
VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
```

> **Important:** Do not commit private/secret keys to GitHub.

> **Placeholder:** Add any additional environment variables if external AI services or other services are implemented.

## 14. How to Run Frontend

From the project root:

```bash
npm install
npm run dev
```

Vite will provide a local development URL.

> **Placeholder:** Add the exact local URL after the project is configured.

Example:

```text
http://localhost:<PORT>
```

## 15. How to Run Backend

There is no separate custom backend server in the planned MVP architecture.

Supabase acts as the backend service and provides:

- PostgreSQL database
- Authentication
- Database access/API
- Security policies

Therefore, there is no separate command such as:

```bash
npm run server
```

for the planned architecture.

> **Placeholder:** If a separate backend is added later, document its setup and start command here.

## 16. Database Setup

The planned database uses Supabase PostgreSQL.

### Main tables

```text
profiles
toilets
reports
maintenance_records
issues
```

### Relationships

```text
profiles
   |
   +---- reports
            |
            +---- toilets
                    |
                    +---- maintenance_records
                    |
                    +---- issues
```

### Setup

> **Placeholder:** Add the final Supabase SQL schema/migration file path here.

For example:

```text
supabase/schema.sql
```

Once the schema is finalized, run/apply the SQL in the Supabase SQL Editor or through the project's chosen migration workflow.

### Demo data

The MVP is expected to use a limited set of realistic public toilet/facility records for demonstration.

> **Placeholder:** Add the final seed-data file or instructions here.

## 17. API Documentation

The planned architecture does not include a custom REST API server.

The frontend communicates with Supabase for database and authentication operations.

### Main data operations

#### Toilets

Used to:

- Fetch public toilet/facility information
- Display facilities on the map
- Display facility details

#### Reports

Used to:

- Submit citizen reports
- Retrieve recent reports
- Support Trust Score calculations

#### Maintenance Records

Used to:

- Store official maintenance/status information
- Support discrepancy detection

#### Issues

Used to:

- Store identified issues
- Track priority
- Track issue status

#### Authentication

Supabase Authentication is used for user authentication.

> **Placeholder:** Add exact Supabase queries/API references once the implementation is finalized.

## 18. Testing

> **Placeholder:** Add the final testing approach once implemented.

At minimum, the MVP should be manually tested for the following flow:

```text
Open application
      |
      v
View toilet map
      |
      v
Open toilet details
      |
      v
View Trust Score
      |
      v
Submit citizen report
      |
      v
Report is stored
      |
      v
Trust Score updates
      |
      v
Potential discrepancy is detected
      |
      v
Admin sees the issue
```

Also test:

- Invalid report values
- Location/proximity verification
- Citizen access
- Admin access
- Database permissions
- Empty/failed data requests
- Mobile/responsive layout

## 19. Deployment

The planned frontend deployment platform is **Vercel**.

Expected deployment flow:

```text
GitHub
   |
   v
Vercel
   |
   v
React/Vite application
   |
   v
Supabase
```

### Deployment steps

> **Placeholder:** Add the final deployment URL and exact Vercel configuration after deployment.

At a high level:

1. Push the project to GitHub.
2. Connect the repository to Vercel.
3. Configure the required environment variables.
4. Deploy the application.
5. Verify the deployed application can communicate with Supabase.

## 20. Future Improvements

Potential future improvements include:

- Photo evidence for reports
- AI-assisted complaint categorization
- AI-generated report summaries
- Notifications
- User reputation
- Advanced analytics
- More extensive facility coverage
- Additional authority/maintenance workflows

These should be considered after the core MVP is stable.

## 21. Team Members

> **Placeholder — add team information here.**

| Name | Role |
|---|---|
| `<TEAM MEMBER 1>` | `<ROLE>` |
| `<TEAM MEMBER 2>` | `<ROLE>` |

---

## MVP Focus

The core product flow is:

```text
Find
  ↓
Verify
  ↓
Report
  ↓
Trust Score changes
  ↓
Discrepancy detected
  ↓
Authority prioritizes repair
```

The MVP should prioritize getting this complete end-to-end flow working reliably before adding optional features.
