Phase 2 — Frontend / Backend Integration Mapping

All backend endpoint details verified by reading actual source files (routes, controllers, validators, services, repositories). "Documented as complete" = listed as done in EIGER_TALENT_QUEST_PROJECT_PROGRESS.md. "Independently verified" = directly confirmed by code inspection in this audit.

Legend
Status	Meaning
✅ Connected	Frontend calls real API — verified in source
🔶 Partial	Calls exist but are incomplete or broken
🔴 Mock	Frontend uses hardcoded/mock data; real API exists
⛔ Missing	No frontend implementation; API exists
🚧 Demo-only	Demo mode present; must be replaced with real flow
1. Authentication
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Register	src/features/auth/register-form.tsx	POST /api/auth/register	POST	Public	{ email, password, firstName, lastName?, phone? }	{ success, data: { user: { id, email, role, status }, token } }	🔴 Mock (shows placeholder, no API call)	🔴 P0
Login	src/features/auth/login-form.tsx	POST /api/auth/login	POST	Public	{ email, password }	{ success, data: { user: { id, email, role, status }, token } }	🔴 Mock (shows placeholder, no API call)	🔴 P0
Get current user	— (not implemented)	GET /api/auth/me	GET	Bearer JWT	—	{ success, data: { id, email, role, status, candidateProfile } }	⛔ Missing	🔴 P0
Logout	candidate-shell.tsx, ta-shell.tsx	Client-side: clear token	—	—	—	—	⛔ Missing (button disabled)	🔴 P0
Route guard (Candidate)	app/(candidate)/candidate/layout.tsx	GET /api/auth/me	GET	Bearer JWT	—	role check	⛔ Missing	🔴 P0
Route guard (TA)	app/(ta)/ta/layout.tsx	GET /api/auth/me	GET	Bearer JWT	—	role check	⛔ Missing	🔴 P0
Auth context / hook	—	—	—	—	Token stored in localStorage key: eiger_access_token	—	⛔ Missing	🔴 P0

Implementation notes:

Token key: eiger_access_token (already used by assessment-results.ts — must be consistent everywhere)
Register form has a name field but the backend expects firstName (and optional lastName). The register form must be updated to split name or send firstName.
Backend auto-creates CandidateProfile on register.
After login/register, redirect: CANDIDATE → /candidate, TALENT_ACQUISITION → /ta.
2. Jobs — Public / Candidate
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Browse jobs (public listing)	app/(public)/jobs/page.tsx	GET /api/jobs	GET	Public	query params: ?status=ACTIVE (if supported)	{ success, data: Job[] }	✅ Connected (src/lib/api/jobs.ts)	✅ Done
Job detail (public)	app/(public)/jobs/[id]/page.tsx	GET /api/jobs/:id	GET	Public	—	{ success, data: Job }	✅ Connected	✅ Done
Apply to job	src/features/applications/apply-form.tsx	POST /api/applications	POST	CANDIDATE JWT	{ jobId: string }	{ success, message, data: Application }	🔴 Mock ("Demo only, not saved to server")	🔴 P1

Job schema (from validator):

{ title, department, location, employmentType (FULL_TIME|PART_TIME|CONTRACT|INTERNSHIP),
  experience?, description, responsibilities: string[], requirements: string[],
  status? (DRAFT|ACTIVE|CLOSED), competencyIds?: string[] }
3. Applications — Candidate
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
My Applications list	app/(candidate)/candidate/applications/page.tsx	GET /api/applications/my	GET	CANDIDATE JWT	—	{ success, data: Application[] }	🔴 Mock (uses mockApplications)	🔴 P1
Application detail	app/(candidate)/candidate/applications/[id]/page.tsx	GET /api/applications/:id	GET	CANDIDATE or TA JWT	—	{ success, data: Application }	🔴 Mock (looks up from mockApplications)	🔴 P1

Critical: Application status enum mismatch

Backend enum	Mock enum (WRONG)
SUBMITTED	SUBMITTED
ASSESSMENT_COMPLETED	ASSESSMENT (wrong)
UNDER_REVIEW	IN_REVIEW (wrong)
INTERVIEW	INTERVIEW
FINAL_DECISION	(missing entirely)
REJECTED	REJECTED
—	ACCEPTED (does not exist in backend)

The application detail page and timeline use the wrong enum values — they must be rewritten using real API data and the correct ApplicationStatus enum.

Timeline stage mapping for application detail page (real statuses):

SUBMITTED → ASSESSMENT_COMPLETED → UNDER_REVIEW → INTERVIEW → FINAL_DECISION

REJECTED is a terminal state at any point.

4. Assessment Attempts — Candidate
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Start assessment attempt	app/(candidate)/candidate/talent-quest/[id]/assessment/page.tsx	POST /api/assessment-attempts	POST	CANDIDATE JWT	{ assessmentId: string, applicationId: string }	{ success, data: { id, status, startedAt, expiresAt, assessment } }	🚧 Demo-only	🔴 P1
Get attempt (resume / state)	—	GET /api/assessment-attempts/:id	GET	CANDIDATE JWT	—	{ success, data: AssessmentAttempt }	⛔ Missing	🔴 P1
Submit response (per question)	app/(candidate)/candidate/talent-quest/[id]/assessment/page.tsx	POST /api/assessment-attempts/:id/responses	POST	CANDIDATE JWT	{ challengeId: string, optionId: string }	{ success, data: AssessmentResponse }	🚧 Demo-only	🔴 P1
Complete assessment	—	POST /api/assessment-attempts/:id/complete	POST	CANDIDATE JWT	(no body)	{ success, data: completionResult }	⛔ Missing	🔴 P1
Assessment result (candidate)	app/(candidate)/competency-progress/page.tsx	GET /api/assessment-attempts/:id/result	GET	CANDIDATE JWT	query: ?attemptId=	{ success, data: AssessmentResult }	🔶 Partial (API call exists but page is OUTSIDE candidate layout)	🔴 P1 (also fix route location)

Assessment flow design (real implementation):

Candidate has an existing application → TA assigns assessment → application status changes to indicate assessment available
Candidate starts attempt: POST /api/assessment-attempts with { assessmentId, applicationId }
Candidate submits each response: POST /api/assessment-attempts/:id/responses with { challengeId, optionId }
Backend enforces: attempt must be active, challenge must belong to assessment, option must belong to challenge, no duplicate answers
Candidate completes: POST /api/assessment-attempts/:id/complete — backend calculates scores
Result: GET /api/assessment-attempts/:id/result

Current demo flow is incompatible: it navigates to /demo-assessment and hardcodes questions. The real flow requires applicationId AND assessmentId. The assessment page must be redesigned to use the real attempt workflow.

5. Assessments (Candidate-facing view)
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Get published assessment by ID	Used in assessment flow	GET /api/assessments/published/:id	GET	CANDIDATE JWT	—	{ success, data: Assessment (with challenges & options) }	🚧 Demo-only (not called)	🔴 P1
Talent Quest overview (assigned assessments list)	app/(candidate)/candidate/talent-quest/page.tsx	No direct endpoint exists for "my assigned assessments"	—	—	Derive from applications + attempt status	—	🚧 Demo-only (hardcoded /demo-assessment)	🟡 P2

Note: There is no /api/assessments/my or similar endpoint for candidates to list their assessments. The Talent Quest page must derive this from GET /api/applications/my (which includes assessment attempt info embedded in the application data) or the application detail page.

6. Assessment Results — Candidate
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Competency progress / result	app/(candidate)/competency-progress/page.tsx	GET /api/assessment-attempts/:id/result	GET	CANDIDATE JWT	?attemptId=<id>	{ success, data: { attempt, competencyScores[], overallScore } }	🔶 Partial (API call exists but: wrong route group; no auth header injection; depends on URL param being set manually)	🔴 P1
7. Candidate Profile
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
View profile	app/(candidate)/candidate/profile/page.tsx	GET /api/candidate-profile	GET	CANDIDATE JWT	—	{ success, data: CandidateProfile }	🔴 Mock (hardcoded candidate object)	🔴 P1
Edit profile	app/(candidate)/candidate/profile/edit/page.tsx	PATCH /api/candidate-profile	PATCH	CANDIDATE JWT	{ firstName?, lastName?, phone?, address?, city?, province?, birthDate?, education?, experience?, skills?, resumeUrl?, profilePhotoUrl? }	{ success, data: CandidateProfile }	⛔ Missing (edit page not yet inspected, link exists from profile page)	🟡 P2
8. Candidate Dashboard
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
Candidate overview / dashboard	app/(candidate)/candidate/page.tsx	Derived from multiple endpoints	—	CANDIDATE JWT	—	Applications summary, assessment status	🔴 Mock (static/hardcoded)	🟡 P2
9. TA — Candidates Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List all candidates	app/(ta)/ta/candidates/page.tsx	GET /api/candidates	GET	TA JWT	—	{ success, data: Candidate[] }	🔴 Mock (5 hardcoded candidates)	🔴 P1
View candidate detail	(page does not exist)	GET /api/candidates/:id	GET	TA JWT	—	{ success, data: Candidate }	⛔ Missing	🔴 P1
View application result (TA)	(page does not exist)	GET /api/assessment-results/applications/:applicationId	GET	TA JWT	—	{ success, data: AssessmentResult }	⛔ Missing	🟡 P2
Update application status	(in candidate detail)	PATCH /api/applications/:id/status	PATCH	TA JWT	{ status: ApplicationStatus }	{ success, data: Application }	⛔ Missing	🔴 P1
10. TA — Jobs Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List all jobs	app/(ta)/ta/jobs/page.tsx	GET /api/jobs	GET	TA JWT	—	{ success, data: Job[] }	🔴 Mock (3 hardcoded jobs)	🔴 P1
Create job	(button disabled)	POST /api/jobs	POST	TA JWT	{ title, department, location, employmentType, experience?, description, responsibilities[], requirements[], status?, competencyIds? }	{ success, data: Job }	⛔ Missing	🔴 P1
View/edit job detail	(page does not exist)	GET /api/jobs/:id, PATCH /api/jobs/:id	GET/PATCH	TA JWT	Same as create (partial)	{ success, data: Job }	⛔ Missing	🟡 P2
Update job status	(not implemented)	PATCH /api/jobs/:id/status	PATCH	TA JWT	`{ status: DRAFT	ACTIVE	CLOSED }`	{ success, data: Job }
Delete job	(not implemented)	DELETE /api/jobs/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟠 P3
11. TA — Assessments Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List all assessments	app/(ta)/ta/assessments/page.tsx	GET /api/assessments	GET	TA JWT	—	{ success, data: Assessment[] }	🔴 Mock (4 hardcoded)	🔴 P1
Create assessment	(button disabled)	POST /api/assessments	POST	TA JWT	{ name, objective?, status? }	{ success, data: Assessment }	⛔ Missing	🔴 P1
View assessment detail	(page does not exist)	GET /api/assessments/:id	GET	TA JWT	—	{ success, data: Assessment }	⛔ Missing	🔴 P1
Update assessment	(not implemented)	PATCH /api/assessments/:id	PATCH	TA JWT	{ name?, objective? }	{ success, data: Assessment }	⛔ Missing	🟡 P2
Update assessment status	(not implemented)	PATCH /api/assessments/:id/status	PATCH	TA JWT	`{ status: DRAFT	PUBLISHED }`	{ success, data: Assessment }	⛔ Missing
Delete assessment	(not implemented)	DELETE /api/assessments/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟠 P3
12. TA — Challenges Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List challenges	(no separate page — should be in assessment detail)	GET /api/challenges	GET	TA JWT	—	{ success, data: Challenge[] }	⛔ Missing	🟡 P2
Get challenge detail	(not implemented)	GET /api/challenges/:id	GET	TA JWT	—	{ success, data: Challenge (with options) }	⛔ Missing	🟡 P2
Create challenge	(not implemented)	POST /api/challenges	POST	TA JWT	Challenge body	{ success, data: Challenge }	⛔ Missing	🟡 P2
Update challenge	(not implemented)	PATCH /api/challenges/:id	PATCH	TA JWT	Partial	{ success, data: Challenge }	⛔ Missing	🟡 P2
Delete challenge	(not implemented)	DELETE /api/challenges/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟡 P2
Create challenge option	(not implemented)	POST /api/challenges/:id/options	POST	TA JWT	Option body	{ success, data: ChallengeOption }	⛔ Missing	🟡 P2
Update challenge option	(not implemented)	PATCH /api/challenges/:id/options/:optionId	PATCH	TA JWT	Partial	{ success, data: ChallengeOption }	⛔ Missing	🟡 P2
Delete challenge option	(not implemented)	DELETE /api/challenges/:id/options/:optionId	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟡 P2
13. TA — Competencies Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List competencies	app/(ta)/ta/competencies/page.tsx	GET /api/competencies	GET	TA JWT	—	{ success, data: Competency[] }	🔴 Mock (6 hardcoded)	🔴 P1
Create competency	(alert placeholder)	POST /api/competencies	POST	TA JWT	Competency body	{ success, data: Competency }	⛔ Missing	🔴 P1
Get competency detail	(not implemented)	GET /api/competencies/:id	GET	TA JWT	—	{ success, data: Competency }	⛔ Missing	🟡 P2
Update competency	(not implemented)	PATCH /api/competencies/:id	PATCH	TA JWT	Partial	{ success, data: Competency }	⛔ Missing	🟡 P2
Delete competency	(not implemented)	DELETE /api/competencies/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟠 P3
14. TA — Users Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List users	app/(ta)/ta/users/page.tsx	GET /api/users	GET	TA JWT	—	{ success, data: User[] }	🔴 Mock (5 hardcoded users)	🔴 P1
Create user	(alert placeholder)	POST /api/users	POST	TA JWT	User body	{ success, data: User }	⛔ Missing	🔴 P1
Get user detail	(not implemented)	GET /api/users/:id	GET	TA JWT	—	{ success, data: User }	⛔ Missing	🟡 P2
Update user	(not implemented)	PATCH /api/users/:id	PATCH	TA JWT	Partial	{ success, data: User }	⛔ Missing	🟡 P2
Update user status	(toggle in list — currently client-only)	PATCH /api/users/:id/status	PATCH	TA JWT	{ status }	{ success, data: User }	🔴 Mock (local state only)	🔴 P1
Delete user	(not implemented)	DELETE /api/users/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟠 P3
15. TA — Talent Pool Management
Feature	Frontend file	Endpoint	Method	Auth	Request payload	Response shape	FE status	Priority
List talent pool	app/(ta)/ta/talent-pool/page.tsx	GET /api/talent-pool	GET	TA JWT	—	{ success, data: TalentPool[] }	🔴 Mock (5 hardcoded)	🔴 P1
Get talent pool entry	(not implemented)	GET /api/talent-pool/:id	GET	TA JWT	—	{ success, data: TalentPool }	⛔ Missing	🟡 P2
Add to talent pool	(shortlist toggle — currently local only)	POST /api/talent-pool	POST	TA JWT	Pool entry body	{ success, data: TalentPool }	🔴 Mock	🔴 P1
Update talent pool entry	(not implemented)	PATCH /api/talent-pool/:id	PATCH	TA JWT	Partial	{ success, data: TalentPool }	⛔ Missing	🟡 P2
Delete from talent pool	(not implemented)	DELETE /api/talent-pool/:id	DELETE	TA JWT	—	{ success, message }	⛔ Missing	🟠 P3
16. TA — Analytics
Feature	Frontend file	Endpoint	Method	Auth	Response shape	FE status	Priority
Dashboard analytics	app/(ta)/ta/page.tsx	GET /api/analytics/dashboard	GET	TA JWT	{ overview: { totalCandidates, totalJobs, activeJobs, totalApplications, totalAssessments, totalAssessmentAttempts, completedAssessmentAttempts, talentPoolCandidates }, applications: { submitted, assessmentCompleted, underReview, interview, finalDecision, rejected }, assessments: { inProgress, completed, expired, averageScore } }	🔴 Mock (stub page "Data integration coming soon")	🔴 P1
Application analytics	app/(ta)/ta/analytics/page.tsx	GET /api/analytics/applications	GET	TA JWT	{ totalApplications, byStatus: { submitted, assessmentCompleted, underReview, interview, finalDecision, rejected } }	🔴 Mock (hardcoded demo)	🔴 P1
Recruitment analytics	app/(ta)/ta/analytics/page.tsx	GET /api/analytics/recruitment	GET	TA JWT	{ jobs: { total, active, draft, closed }, applications: { total, byStatus } }	🔴 Mock	🔴 P1
Assessment analytics	app/(ta)/ta/analytics/page.tsx	GET /api/analytics/assessments	GET	TA JWT	{ assessments: { total, draft, published }, attempts: { total, inProgress, completed, expired }, averageScore }	🔴 Mock	🔴 P1
Talent pool analytics	app/(ta)/ta/analytics/page.tsx	GET /api/analytics/talent-pool	GET	TA JWT	{ totalCandidates, byStatus: { active, hired, inactive } }	🔴 Mock	🟡 P2
17. Structural / Navigation Issues
Issue	File	Fix	Priority
/ta/settings in sidebar nav	src/components/layout/navigation/role-navigation.ts	Remove entry (per user decision)	🔴 P0
competency-progress outside candidate layout	app/(candidate)/competency-progress/page.tsx	Move to app/(candidate)/candidate/competency-progress/page.tsx	🔴 P1
Hardcoded name in CandidateShell	src/components/layout/candidate-shell.tsx	Replace with auth context data	🔴 P0
Hardcoded name in TAShell	src/components/layout/ta-shell.tsx	Replace with auth context data	🔴 P0
Register form uses name field	src/features/auth/register-form.tsx	Backend needs firstName; split or rename	🔴 P0
Empty artifact directories	app/(ta)/,,/ and app/(candidate)/candidate/talent-quest/[id]/instructions/asses/	Delete	🟡 P2
Mock application.ts wrong enum values	src/lib/mock-application.ts	Remove; replace all usages with real API	🔴 P1
18. Summary: What Needs a New API?

Nothing. Every missing frontend feature maps to an existing backend endpoint. No new backend endpoints need to be created.

The following backend capabilities have zero frontend coverage today:

GET/POST/PATCH/DELETE /api/challenges and /options → needs UI in assessment detail
GET /api/assessment-results/applications/:applicationId → needs TA candidate detail view
PATCH /api/users/:id/status → wire to existing toggle UI
GET /api/analytics/recruitment, GET /api/analytics/assessments, GET /api/analytics/talent-pool → wire to analytics page
19. Prioritized Implementation Order
🔴 Phase A — Blockers (nothing else works without these)
Auth infrastructure
Create src/lib/api-client.ts — centralized fetch with Bearer token injection, error unwrapping
Create src/contexts/auth-context.tsx — { user, token, role } in React state + localStorage
Wire login-form.tsx → real API → store token → redirect by role
Wire register-form.tsx → real API (fix name → firstName/lastName split)
Add route guards to both layouts (/candidate, /ta)
Wire logout in both shells
Replace hardcoded demo names in shells with real auth data
Remove /ta/settings from role-navigation.ts
🔴 Phase B — Core Candidate Flows
Fix competency-progress route location (move into candidate group)
Apply form → POST /api/applications (real submission)
My Applications → GET /api/applications/my (replace mock)
Application Detail → GET /api/applications/:id (replace mock; fix status enum)
Profile page → GET /api/candidate-profile (replace hardcoded)
Assessment attempt flow:
Determine how candidate discovers assigned assessment (via application data)
POST /api/assessment-attempts (start)
GET /api/assessment-attempts/:id (get state)
POST /api/assessment-attempts/:id/responses (save each answer)
POST /api/assessment-attempts/:id/complete (finish)
Redirect to /candidate/competency-progress?attemptId=:id
Fix competency-progress page auth header injection
🔴 Phase C — TA Core Data
TA Dashboard → GET /api/analytics/dashboard
Candidates list → GET /api/candidates + create detail page
Application status update → PATCH /api/applications/:id/status (in candidate detail)
Jobs list → GET /api/jobs + create/edit form
Assessments list → GET /api/assessments + create/status form
Competencies list → GET /api/competencies + create/edit form
Users list → GET /api/users + create + toggle status wire
🟡 Phase D — TA Secondary
Analytics page → all 4+ analytics endpoints
Talent Pool → GET/POST /api/talent-pool
Profile edit page (candidate)
Challenge management (within assessment detail)
Assessment detail + result (TA view)
🟠 Phase E — Cleanup
Delete empty artifact directories
Remove src/lib/mock-application.ts entirely
Update EIGER_TALENT_QUEST_PROJECT_PROGRESS.md
TypeScript checks, lint, build
20. Key Technical Decisions Needed Before Implementation

None blocking — but flag these for awareness:

Decision	Impact
Auth state via React Context vs Zustand/Jotai	Context is simplest; no extra dep needed
Server vs Client components for protected pages	Use Client Component layouts for guards (need useEffect + router); keep content Server Components where possible
API error envelope unwrapping strategy	api-client.ts should unwrap { success, data } and throw on success: false
How candidate discovers their assessment	Via GET /api/applications/my — if the application includes an assessmentId or attempt info. Need to verify application.repository.ts include fields
Talent Quest page design with real data	Replace demo card with application-linked assessment cards