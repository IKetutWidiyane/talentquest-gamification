EIGER Talent Quest — Phase 1 Audit Report

Date: 2026-11-03
Status: Audit complete — awaiting approval before implementation

1. Project Structure Summary
talentquest-gamification/
├── frontend/            Next.js 16 / React 19 / TypeScript / Tailwind CSS v4
└── backend/             Node.js / Express.js / TypeScript / Prisma / PostgreSQL

Frontend dependencies: next@16.3.5, react@19.2.8, @phosphor-icons/react@^2.1.10, tailwindcss@^4
Backend: Express + Prisma + PostgreSQL, JWT auth via eiger_access_token stored in localStorage

2. Design Token Discrepancy

WARNING

The progress tracker (Phase 2) claims old green tokens (#24352B, #3F5A43, #B86F32) as the design baseline — but globals.css was already updated to the correct navy/amber palette matching DESIGN.md.

globals.css is correct (navy/amber). However, many page components still hardcode the old green tokens:

talent-quest/page.tsx — uses #24352B, #D8BD78
talent-quest/[id]/assessment/page.tsx — uses #24352B, #3F5A43
competency-progress/page.tsx — uses #3F5A43, #B86F32
apply-form.tsx — uses #24352B
3. Icon Library Discrepancy

IMPORTANT

DESIGN.md specifies Lucide React but the entire frontend uses @phosphor-icons/react which is installed and deeply integrated. Lucide React is NOT installed.

Recommendation: Keep Phosphor Icons. Migration to Lucide would break all existing pages and provides no functional benefit.

4. Backend API — Verified Complete (60 endpoints)

All backend endpoints are implemented and tested per progress tracker. Key details:

Auth flow:

POST /api/auth/login → { success, data: { user, token } } — JWT in data.token
Token key: eiger_access_token (confirmed from assessment-results.ts)
User roles: CANDIDATE | TALENT_ACQUISITION

Application statuses (backend enum):

SUBMITTED → ASSESSMENT_COMPLETED → UNDER_REVIEW → INTERVIEW → FINAL_DECISION → REJECTED

CAUTION

src/lib/mock-application.ts uses different statuses (IN_REVIEW, ASSESSMENT, ACCEPTED) that do not exist in the backend enum. This file must be replaced with real API integration.

5. Frontend Pages — Status
Public Pages
Page	Route	UI	API
Homepage	/	✅	N/A (static)
Jobs Listing	/jobs	✅	✅ Real backend
Job Detail	/jobs/[id]	✅	✅ Real backend
Login	/login	✅	❌ Shows placeholder message on submit
Register	/register	✅	❌ Not connected
Candidate Portal
Page	Route	UI	API
Overview	/candidate	✅	❌ Static dashes
Find Jobs	/candidate/jobs	✅	Need to verify
Apply for Job	/candidate/jobs/[id]/apply	✅	❌ Demo only, "not saved to server"
My Applications	/candidate/applications	✅	❌ Mock data from mock-application.ts
Application Detail	/candidate/applications/[id]	❓ Unverified	❌
Talent Quest Intro	/candidate/talent-quest	✅	❌ Links to hardcoded /demo-assessment ID
Assessment Instructions	/candidate/talent-quest/[id]/instructions	✅	❌ Demo
Assessment	/candidate/talent-quest/[id]/assessment	✅	❌ Hardcoded demo questions, no backend calls
Competency Progress	/candidate/competency-progress	✅	✅ Connected to /api/assessment-attempts/:id/result via ?attemptId=
Profile	/candidate/profile	✅	❓ Unverified
Profile Edit	/candidate/profile/edit	❓ Unverified	❓
Notifications	/candidate/notifications	❓ Unverified	❓
Talent Acquisition Portal
Page	Route	UI	API
Overview	/ta	⚠️ Stub	❌ "Data integration coming soon"
Candidates	/ta/candidates	✅	❌ 5 hardcoded mock candidates
Candidate Detail	/ta/candidates/[id]	❌ Page missing	❌
Jobs	/ta/jobs	✅	❌ 3 hardcoded mock jobs
Job Detail	/ta/jobs/[id]	❌ Page missing	❌
Assessments	/ta/assessments	✅	❌ 4 hardcoded mock assessments
Competencies	/ta/competencies	❓ Unverified	❓
Users	/ta/users	❓ Unverified	❓
Talent Pool	/ta/talent-pool	❓ Unverified	❓
Analytics	/ta/analytics	✅	❌ Hardcoded demo data (clearly labeled)
Settings	/ta/settings	❌ Page missing	❌ — in nav but no route
6. Authentication — Critical Gap

CAUTION

Authentication is completely unimplemented on the frontend.

login-form.tsx → on submit shows: "Form login sudah siap. Autentikasi backend perlu dihubungkan."
Both shells show hardcoded demo user info ("Candidate Demo", "TA Demo User")
Logout buttons are disabled with "Soon" label
No protected routes — any URL is accessible without login
No auth context, no auth hook, no token management
The only token code is in assessment-results.ts which reads localStorage.getItem("eiger_access_token")
7. API Service Layer — Status
Service	File	Status
Centralized API client	None	❌ Missing — each file duplicates fetch logic
Jobs	src/lib/api/jobs.ts	✅ Public endpoints only
Assessment Results	src/lib/api/assessment-results.ts	✅ Reads auth token
Auth	None	❌ Missing
Applications	None	❌ Missing
Assessment Attempts	None	❌ Missing
Candidates	None	❌ Missing
Competencies	None	❌ Missing
Challenges	None	❌ Missing
Users	None	❌ Missing
Talent Pool	None	❌ Missing
Analytics	None	❌ Missing
8. Bugs & Structural Issues
#	Issue	Severity
1	/ta/settings in nav but no page	Medium
2	Artifact directories: frontend/app/(ta)/,,/ (empty), instructions/asses/ (empty)	Low
3	competency-progress page is at app/(candidate)/competency-progress/ — outside the candidate layout group, so it renders without the candidate sidebar	High
4	Mock application statuses don't match backend enum	High
5	Talent Quest intro hardcodes /demo-assessment as assessment ID	High
6	Font variable mismatch: layout.tsx sets --font-plus-jakarta but globals.css uses --font-sans with --font-geist-sans fallback	Low
7	Green palette tokens hardcoded in pages contradict the navy/amber globals.css	Medium
9. What Is Working
✅ Complete backend with 60 tested endpoints
✅ Design tokens in globals.css (correct navy/amber per DESIGN.md)
✅ UI component library fully built
✅ Responsive shell layouts (sidebar + mobile drawer) for both roles
✅ Public homepage (static, correct brand direction)
✅ Jobs listing and detail — real backend data
✅ Competency Progress page — real backend data (via ?attemptId=)
✅ Assessment UI (excellent UX, needs backend wiring)
✅ Role-based navigation structure
10. Proposed Implementation Order
Phase 2 — Authentication (Foundation, Blocks Everything)
Create src/lib/api-client.ts — centralized fetch with Bearer token
Create src/contexts/auth-context.tsx — user + token + role state
Wire login-form.tsx to POST /api/auth/login — store token, redirect by role
Wire register-form.tsx to POST /api/auth/register
Add route guards in layouts (redirect unauthenticated users)
Wire logout to clear token and redirect
Replace hardcoded demo user in shells with real auth context data
Phase 3 — Candidate Core Flows
Connect apply-form.tsx to POST /api/applications
Connect My Applications to GET /api/applications/my
Connect Application Detail to GET /api/applications/:id
Fix competency-progress route (move inside candidate layout group)
Connect assessment flow: start attempt → save responses → complete → show result
Phase 4 — TA Dashboard & Data Pages
Connect TA overview to GET /api/analytics/dashboard
Replace mock candidates with GET /api/candidates + pagination + search
Create TA Candidate Detail page (GET /api/candidates/:id)
Connect jobs page to GET /api/jobs, implement create/edit/status change
Phase 5 — TA Management Pages
Assessments: connect to API, implement create/edit/detail/challenge management
Competencies: connect CRUD
Users: connect CRUD
Talent Pool: connect CRUD
Analytics: connect all 5 analytics endpoints
Phase 6 — Fixes & Polish
Remove /ta/settings from nav or create stub page
Remove artifact directories
Fix font variable
Align color palette in assessment/talent-quest pages
Phase 7 — QA
TypeScript check, ESLint, build
End-to-end workflow testing for both roles
Update EIGER_TALENT_QUEST_PROJECT_PROGRESS.md
11. Questions Requiring Decisions Before Implementation

Icon library: Keep @phosphor-icons/react (already implemented) or migrate to Lucide React (per DESIGN.md spec)?

Assessment page color palette: Keep the distinct forest-green (#24352B) adventure theme for assessment pages, or align to the standard navy/amber palette?

/ta/settings: Implement a settings page or remove from navigation?

Competency Progress route fix: Move to app/(candidate)/candidate/competency-progress/page.tsx so it renders inside the candidate shell?

Phase 1 complete — no source code modified.