# ToiletTrust

## 1. Project Description

The ToiletTrust frontend is a React web app that lets citizens find nearby public toilets on a map and see how trustworthy each one currently is, based on Trust Score, crowd verification, and discrepancy information.

## 2. Problem

Public toilet listings (official or otherwise) often go stale — a facility marked "functional" in a government database may actually be broken, dirty, or out of water for days before anyone updates the record. Citizens have no easy way to know the *current* real-world condition of a public toilet before they go, and there's no simple way for the community to flag when official records don't match reality.

## 3. Current Solution

The current frontend lets a citizen:

- Browse public toilets on an interactive map
- Open a facility's details page to see its Trust Score, breakdown, and whether official records currently disagree with recent citizen reports
- Verify their GPS location and submit a condition report (functionality, water, cleanliness, optional notes and photo) for a facility
- See a submission result (success or error) after reporting
- Log in / sign up via Supabase Auth (when configured)

All data shown right now — facilities, Trust Scores, discrepancy results, and report submissions — comes from a **mock data/API layer**, not a live backend. See [Section 10](#10-current-dataapi-approach) and [Section 19](#19-current-limitations).

## 4. Current Features

Verified against the current source code:

- ✅ Login / signup page (Supabase Auth integration, degrades gracefully if unconfigured)
- ✅ Interactive map (Leaflet + OpenStreetMap) with trust-colored facility markers
- ✅ Facility details page (functionality, water, cleanliness, last verified)
- ✅ Trust Score display with a visual gauge and a 5-part breakdown
- ✅ Discrepancy display (flags when official records and citizen reports disagree, or shows a "consistent" state)
- ✅ GPS location verification step (browser Geolocation API + mocked backend check)
- ✅ Citizen report form (functionality / water / cleanliness / optional notes, with validation)
- ✅ Photo evidence upload UI (file picker, preview, remove, type/size validation)
- ✅ Report submission flow with loading, success, and error states

Not currently implemented in the frontend (see [Section 21](#21-future-improvements)):

- ❌ Crowd agreement display and Priority Score badge — both were built (`CrowdAgreement.jsx`, `PriorityBadge.jsx` exist in `src/components/`) but are **not currently rendered on any page**
- ❌ Authority/admin dashboard
- ❌ Maintenance workflow / re-verification flow
- ❌ Any real backend, database, or third-party API connection (Gemini, Cloudinary, etc.)

## 5. User Flow

The implemented journey:

```
Map
 → Select a facility marker
 → View Facility Details (info, Trust Score, discrepancy status)
 → Click "Verify & Report"
 → Verify location (GPS)
 → Fill out report form
 → Add photo evidence (optional)
 → Submit report
 → View result (success → View Facility / Back to Map, or error → Try Again / Edit Report)
```

## 6. Screenshots

### Map
[Add screenshot here]

### Facility Details
[Add screenshot here]

### Trust Score
[Add screenshot here]

### Discrepancy Alert
[Add screenshot here]

### Report Form
[Add screenshot here]

### Photo Evidence Upload
[Add screenshot here]

## 7. Tech Stack

Verified from `package.json`:

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite | Dev server / build tool |
| JavaScript (JSX) | Application code |
| CSS | Styling (plain CSS files, no framework) |
| React Router (`react-router-dom`) | Client-side routing |
| Leaflet + `react-leaflet` | Interactive map |
| OpenStreetMap | Map tile provider |
| `@supabase/supabase-js` | Authentication (Supabase Auth) |
| oxlint | Linting |

## 8. Frontend Architecture

- **Pages** (`src/pages/`) — one component per route: `Home`, `Login`, `FacilityDetails`, `ReportFacility`.
- **Components** (`src/components/`) — smaller, reusable pieces used by the pages (map, forms, score displays, etc.).
- **Services** (`src/services/`) — all data access. `api.js` is the only place pages/components should import facility data from; `mockData.js` is the current data source; `supabaseClient.js` sets up the Supabase Auth client.
- **Routing** — defined in `App.jsx` using `react-router-dom`'s `<Routes>`/`<Route>`.
- **Authentication** — a simple `user` state in `App.jsx`, kept in sync with Supabase Auth's session via `onAuthStateChange`.
- **Component communication** — plain React props and callbacks (e.g. `PhotoUpload` calls `onChange(file)`, `GPSVerification` calls `onVerified()`). No global state library is used.

## 9. Project Structure

```
toilettrust-frontend/
├── index.html
├── package.json
├── .env.example
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.jsx              # Mounts <App /> inside BrowserRouter
    ├── App.jsx                # Routes + auth state
    ├── index.css              # Design tokens, base styles
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Map.jsx / .css              # Leaflet map + tile layer
    │   ├── FacilityMarker.jsx          # Trust-colored map pin + popup
    │   ├── TrustScore.jsx / .css       # Gauge + breakdown (display-only)
    │   ├── DiscrepancyAlert.jsx / .css # Discrepancy warning / consistent state
    │   ├── GPSVerification.jsx / .css  # Geolocation + mock backend check
    │   ├── ReportForm.jsx / .css       # Condition report fields + validation
    │   ├── PhotoUpload.jsx / .css      # Evidence photo picker/preview
    │   ├── CrowdAgreement.jsx / .css   # Built, not currently used on any page
    │   └── PriorityBadge.jsx / .css    # Built, not currently used on any page
    ├── pages/
    │   ├── Home.jsx / .css             # Map page
    │   ├── Login.jsx / .css            # Supabase Auth login/signup
    │   ├── FacilityDetails.jsx / .css  # Facility info + Trust Score + Discrepancy
    │   └── ReportFacility.jsx / .css   # GPS → Form → Submit flow
    └── services/
        ├── api.js             # getFacilities, getFacility, verifyLocation, submitReport
        ├── mockData.js        # 7 mock facilities with all display fields
        └── supabaseClient.js  # Supabase client (safe if env vars are unset)
```

## 10. Current Data/API Approach

**The frontend currently uses mock data only.** `src/services/mockData.js` defines a fixed array of 7 sample facilities. `src/services/api.js` wraps that mock data behind four async functions — `getFacilities()`, `getFacility(id)`, `verifyLocation()`, `submitReport()` — with an artificial delay so loading states behave realistically.

Every one of these functions has a commented-out "real version" directly below it showing the intended `fetch()` call once a backend exists. No other file in the app imports mock data directly — only `api.js` does — so swapping mock data for real API calls should only require editing `api.js`.

## 11. Authentication

Authentication uses **Supabase Auth**, implemented in `src/services/supabaseClient.js` and `src/pages/Login.jsx`.

- If `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set, the Login page performs real `signInWithPassword` / `signUp` calls against Supabase.
- If those env vars are **not** set, `isSupabaseConfigured` is `false`, the Supabase client is `null`, and the Login page shows a notice instead of crashing — the form will display an error on submit rather than calling Supabase.
- There is currently no route protection — all pages are accessible whether or not a user is logged in.

## 12. Map and Location

- **Map library:** Leaflet, via `react-leaflet`.
- **Map provider:** OpenStreetMap tiles.
- **Markers:** one per mock facility, color-coded by trust band (green/amber/red based on `trust_score`). Clicking a marker opens a popup with name, score, status, and a "View Details" link.
- **Geolocation:** `GPSVerification.jsx` calls the browser's `navigator.geolocation.getCurrentPosition()` to get the user's coordinates.
- **Distance validation:** **not implemented in the frontend.** The raw coordinates are sent to a mocked `verifyLocation()` function in `api.js`, which randomly returns verified/not-verified. The actual 100m radius check is intended to happen on the backend — the frontend never calculates distance.

## 13. Reporting

The report form (`ReportForm.jsx`) currently collects:

- **Functionality** — Working / Partially working / Not working (required)
- **Water** — Available / Not available (required)
- **Cleanliness** — Excellent / Good / Average / Poor / Very Poor (required)
- **Other issue** — optional free-text (max 300 characters)
- **Evidence photo** — optional (JPG/PNG/WEBP, max 5MB, via `PhotoUpload.jsx`)

Validation blocks submission if any required field is missing, showing inline error text.

**Submission is currently mocked.** `submitReport()` in `api.js` waits ~900ms and then succeeds about 90% of the time (fails the rest, so both outcomes are demoable). No data is actually sent anywhere or persisted — nothing is uploaded to Cloudinary or any backend yet.

## 14. Trust Score

`TrustScore.jsx` displays a numeric score (0–100) as a ring gauge plus a 5-part breakdown (Recent reports, Evidence confidence, Crowd agreement, Official consistency, Freshness), each shown as a `score/max` bar.

**The frontend does not calculate the Trust Score or its breakdown.** Both the overall score and every breakdown value are fixed fields on the mock facility objects in `mockData.js`. The component only renders whatever numbers it's given as props.

## 15. Discrepancy Detection

`DiscrepancyAlert.jsx` renders one of two states based on a `discrepancy` boolean:

- **`discrepancy: true`** — a warning card showing "Official records" vs. "Recent citizen reports" side by side, plus a reason string
- **`discrepancy: false`** — a quiet "Information Consistent" card

**The frontend does not determine whether a discrepancy exists.** `discrepancy`, `official_status`, `citizen_status`, and `discrepancy_reason` are all fixed fields on the mock facility data. No threshold logic, report counting, or official/citizen comparison exists in the React code — that logic is intended to live entirely on the backend.

## 16. Setup and Installation

**Prerequisites:** Node.js (a recent LTS version) and npm.

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Then open the local URL Vite prints (typically `http://localhost:5173`).

## 17. Environment Variables

Referenced in the current code (see `.env.example`):

| Variable | Used in | Status |
|---|---|---|
| `VITE_SUPABASE_URL` | `src/services/supabaseClient.js` | Actively used — required for real Supabase Auth |
| `VITE_SUPABASE_ANON_KEY` | `src/services/supabaseClient.js` | Actively used — required for real Supabase Auth |
| `VITE_API_URL` | `src/services/api.js` (comments only) | **Not yet used at runtime** — only appears in commented-out example code for the future real API calls |

None of these have real values checked into the repo. Copy `.env.example` to `.env` and fill in your own Supabase project's URL/key if you want live login to work; the app runs fine without them (Login just shows a configuration notice).

## 18. Development

```bash
npm run dev       # Start the Vite dev server with hot reload
npm run build      # Production build (verified working)
npm run preview    # Preview the production build locally
npm run lint        # Run oxlint
```

## 19. Current Limitations

- **No backend is connected.** All facility, trust, crowd, discrepancy, and priority data is hardcoded mock data in `mockData.js`.
- **Report submission is mocked** — no data is persisted or sent anywhere; success/failure is randomized client-side to demo both states.
- **GPS verification is mocked** — the app reads the real device location, but whether it counts as "verified" is a random mock result, not a real distance check.
- **Photo upload does not send files anywhere.** It handles file selection, preview, and validation only. Cloudinary is not integrated.
- **Trust Score and breakdown values are mock data**, not calculated by any logic in this repo.
- **Discrepancy results are mock data**, not determined by any logic in this repo.
- **Crowd Agreement and Priority Score components exist in the codebase but are not currently displayed** on any page.
- **No route protection** — pages are accessible regardless of login state.
- **Gemini is not integrated anywhere in the frontend.**

## 20. Backend Integration

This frontend is being built independently while a teammate develops the backend separately. It's structured around a single service layer (`src/services/api.js`) specifically so the current mock data can be swapped for real backend calls later without changing any page or component code. No backend API endpoints have been assumed or hardcoded beyond the illustrative examples left as comments in `api.js`.

## 21. Future Improvements

Planned but **not yet implemented**:

- Connecting `api.js` to the real backend once it's available
- Displaying Crowd Agreement and Priority Score on the Facility Details page (components already built)
- Real photo upload to Cloudinary
- Real GPS distance verification via the backend
- AI-assisted evidence analysis (Gemini)
- Authority/admin dashboard
- Maintenance status workflow and re-verification flow
- Route protection based on auth state

## 22. Team

- [Team Member 1] Snehansh Tripathy
- [Team Member 2] Utsav Kumar
