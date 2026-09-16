# EIGER Talent Quest — AI Agent Instructions

## 1. Project Context

You are working on **EIGER Talent Quest**, a gamified Talent Acquisition platform integrated with an EIGER career experience.

The platform provides:

* Job discovery
* Job applications
* Candidate profiles
* Gamified Talent Quest assessments
* Assessment results
* Application tracking
* Candidate screening
* Talent pool management
* Assessment management
* Challenge management
* Competency management
* Recruitment analytics

The project contains:

```text
frontend/
backend/
DESIGN.md
AGENTS.md
README.md
```

Read `DESIGN.md` before implementing or modifying UI.

Read `README.md` to understand the overall architecture and product scope.

---

# 2. Technology Rules

## Frontend

Use:

* Next.js
* React
* TypeScript
* Tailwind CSS

Prefer:

* Server Components where appropriate
* Client Components only when interactivity requires them
* Reusable components
* Feature-oriented organization
* Strong TypeScript typing

Do not introduce another frontend framework.

---

## Backend

Use:

* Node.js
* Express.js
* JavaScript or TypeScript according to the established backend setup
* REST API

Keep responsibilities separated:

```text
Route
↓
Controller
↓
Service
↓
Repository
↓
Prisma
↓
PostgreSQL
```

Do not put large business logic directly inside route definitions.

---

## Database

Use:

* PostgreSQL
* Prisma ORM

Do not introduce another ORM unless explicitly requested.

All database schema changes must be reflected in:

```text
backend/prisma/schema.prisma
```

Use Prisma migrations for structural changes.

---

# 3. Roles

The system has exactly two application roles:

```text
CANDIDATE
TALENT_ACQUISITION
```

Do not create another role such as:

```text
ADMIN
SUPER_ADMIN
RECRUITER
MODERATOR
STAFF
```

unless explicitly requested.

Talent Acquisition already has administrative permissions.

---

# 4. Authorization

Authorization must be based on the user's role.

Candidate users should not access TA management features.

TA users can access:

* Candidates
* Jobs
* Assessments
* Challenges
* Competencies
* Users
* Talent Pool
* Analytics

Always enforce authorization on the backend.

Frontend route protection alone is not sufficient.

---

# 5. UI/UX Rules

Before creating a new UI screen:

1. Check `DESIGN.md`.
2. Check whether an existing component can be reused.
3. Follow existing spacing and typography.
4. Follow the established color palette.
5. Maintain responsive behavior.
6. Preserve information hierarchy.

Do not create arbitrary visual styles.

---

# 6. Visual Direction

The interface should feel:

```text
Modern
Outdoor
Premium
Functional
Clean
Human-centered
Professional
Energetic
```

Use visual inspiration from:

* Forest
* Mountain
* Trail
* Earth
* Outdoor equipment

Preferred colors:

```text
Warm white
Off-white
Dark charcoal
Forest green
Olive green
Muted orange
Muted yellow
```

Avoid:

```text
Neon
Cyberpunk
Excessive gradients
Excessive glassmorphism
Child-like gaming UI
Generic SaaS dashboard
```

---

# 7. Gamification Rules

Gamification must support recruitment.

Good gamification:

* Progress
* Challenges
* Scenarios
* Decision making
* Narrative
* Completion feedback
* Assessment journey

Avoid:

* Coins
* Loot boxes
* Arcade graphics
* Character avatars
* Excessive XP systems
* Leaderboards unless explicitly requested
* Neon gaming effects

The product is a recruitment platform, not an entertainment game.

---

# 8. Candidate Experience

Candidate screens should prioritize:

* Mobile usability
* Clear instructions
* Fast navigation
* Simple forms
* Obvious next actions
* Accessible typography
* Clear feedback

Candidate experience should feel:

**Simple, engaging, adventurous.**

---

# 9. TA Experience

TA screens should prioritize:

* Data density without clutter
* Filtering
* Sorting
* Search
* Candidate comparison
* Assessment insights
* Recruitment pipeline
* Efficient actions

TA experience should feel:

**Efficient, analytical, organized.**

---

# 10. Assessment Rules

Assessment scenarios must not expose competency scoring while the candidate is completing the assessment.

During assessment show:

```text
Progress
Challenge number
Timer
Scenario
Question
Options
Confirm action
```

Do not show:

```text
Problem Solving: 85%
Adaptability: 72%
```

until the assessment has been completed.

---

# 11. Assessment Scoring

Assessment scoring should be implemented on the backend.

Do not trust competency scores submitted by the client.

The client should submit the candidate's selected answer/action.

The backend should determine:

* Score
* Competency contribution
* Behavioral signals
* Overall assessment result

The exact scoring implementation should follow the assessment configuration stored in the database.

---

# 12. Assessment Result

Candidate results should provide insights rather than employment decisions.

Use language such as:

```text
These results provide insights into your strengths.
```

Do not generate statements such as:

```text
You are hired.
You are guaranteed to pass.
You are the best candidate.
```

The platform should not automatically make employment decisions based solely on assessment scores.

---

# 13. Candidate Screening

TA actions may include:

```text
Shortlist
Move to Interview
Hold
Reject
```

Actions must update the candidate's recruitment stage through the backend.

Important actions should provide:

* Confirmation
* Loading state
* Success feedback
* Error feedback

---

# 14. API Rules

API endpoints should follow consistent REST conventions.

Example:

```text
GET    /api/jobs
GET    /api/jobs/:id
POST   /api/jobs
PATCH  /api/jobs/:id
DELETE /api/jobs/:id

GET    /api/candidates
GET    /api/candidates/:id

GET    /api/assessments
POST   /api/assessments
PATCH  /api/assessments/:id

GET    /api/competencies
POST   /api/competencies
PATCH  /api/competencies/:id
```

Use appropriate HTTP status codes.

Return consistent JSON response structures.

---

# 15. Validation

Validate all external input.

Validate:

* Authentication payloads
* Job forms
* Candidate profile
* Assessment configuration
* Challenge configuration
* Competencies
* Query parameters
* Pagination
* Filters

Never rely exclusively on frontend validation.

---

# 16. Error Handling

Backend errors should use centralized error handling.

Avoid leaking:

* Stack traces
* Database credentials
* Internal file paths
* SQL details
* Secrets

Development logs may contain additional debugging information, but production responses must remain safe.

---

# 17. Security

Follow secure development practices.

Never hardcode:

```text
Passwords
JWT secrets
Database credentials
API keys
Private tokens
```

Use environment variables.

Authentication credentials must be securely hashed.

Protect authenticated routes.

Protect TA routes with role-based authorization.

Never trust client-provided:

```text
userId
role
assessmentScore
competencyScore
recruitmentStage
```

without backend validation.

---

# 18. Database Design

Prefer normalized relational structures.

Likely entities include:

```text
User
CandidateProfile
Job
Application
Assessment
AssessmentCompetency
Challenge
ChallengeOption
Competency
BehavioralIndicator
AssessmentAttempt
AssessmentResponse
AssessmentResult
ApplicationStageHistory
TalentPool
```

Do not automatically create all entities before validating actual requirements.

Keep the schema understandable and avoid premature complexity.

---

# 19. Component Reuse

Before creating a component:

Search the project for an existing component.

Prefer:

```text
components/ui/
```

for generic UI components.

Prefer:

```text
components/assessment/
components/candidates/
components/jobs/
```

for domain-specific components.

Do not duplicate components unnecessarily.

---

# 20. Responsive Development

Every candidate screen must work on mobile.

Every TA screen must work on desktop and reasonably adapt to tablet.

Do not simply shrink desktop layouts.

Consider:

* Navigation
* Tables
* Forms
* Cards
* Charts
* Assessment options
* Modals
* Sidebars

---

# 21. Loading States

Every asynchronous operation should have a loading state.

Examples:

```text
Loading jobs...
Loading candidates...
Submitting application...
Saving profile...
Submitting assessment...
Publishing assessment...
```

Avoid leaving users wondering whether an action worked.

---

# 22. Empty States

Provide meaningful empty states.

Examples:

```text
No applications yet.

No candidates found.

No active jobs.

No assessments created.

No candidates match these filters.
```

Whenever possible, provide an appropriate next action.

---

# 23. Error States

Errors must be understandable to users.

Avoid technical messages such as:

```text
500 Internal Server Error
PrismaClientKnownRequestError
ECONNREFUSED
```

Instead provide meaningful messages.

Example:

```text
We couldn't load the candidates.
Please try again.
```

Technical details should remain in developer logs.

---

# 24. Forms

Forms must have:

* Labels
* Clear validation
* Required field indicators
* Error messages
* Loading state
* Success feedback

Do not use placeholder text as the only label.

---

# 25. Tables

TA tables should support where appropriate:

* Sorting
* Filtering
* Search
* Pagination
* Row actions

Tables should remain readable.

On smaller screens, use responsive alternatives such as cards.

---

# 26. Charts

Charts should communicate meaningful recruitment information.

Preferred:

* Bar charts
* Line charts
* Funnel charts
* Progress indicators
* Distribution charts

Avoid charts that exist only for decoration.

---

# 27. Accessibility

Follow accessible UI practices.

Ensure:

* Keyboard navigation
* Focus states
* Semantic HTML
* Form labels
* Sufficient contrast
* Screen-reader-friendly controls
* Accessible status communication

Do not communicate important information through color alone.

---

# 28. Code Quality

Prefer:

* Small components
* Clear naming
* Strong typing
* Reusable utilities
* Predictable folder structure
* Single responsibility
* Explicit interfaces/types

Avoid:

* Giant components
* Repeated code
* Magic values
* Unused dependencies
* Unnecessary abstractions
* Premature optimization

---

# 29. Dependencies

Do not install a new dependency merely to solve a problem that can reasonably be handled with the existing stack.

Before adding a package:

1. Check whether the functionality already exists.
2. Check whether the existing project already uses an equivalent package.
3. Consider bundle size and maintenance.
4. Add the dependency only when it provides meaningful value.

---

# 30. File Changes

Keep changes focused.

Do not modify unrelated files.

When implementing a feature:

```text
Understand
↓
Plan
↓
Implement
↓
Validate
↓
Test
```

Avoid broad refactors unless explicitly requested.

---

# 31. Before Implementing UI

Always check:

```text
README.md
DESIGN.md
Existing components
Existing routes
Existing API contracts
Existing types
```

The existing implementation is the source of truth when it conflicts with assumptions.

---

# 32. Before Implementing Backend

Check:

```text
Prisma schema
Existing migrations
Existing services
Existing controllers
Existing routes
Authentication middleware
Authorization middleware
```

Do not create duplicate endpoints.

---

# 33. Before Modifying Database

Consider:

* Existing relations
* Existing data
* Migration impact
* Required indexes
* Foreign keys
* Delete behavior
* Nullable fields

Use Prisma migrations.

Never manually modify production database structure without an appropriate migration.

---

# 34. Testing

When implementing functionality, test:

### Frontend

* Rendering
* User interaction
* Validation
* Loading states
* Error states
* Responsive behavior

### Backend

* Authentication
* Authorization
* Validation
* Business logic
* Database operations
* Error handling

### Assessment

Test:

* Challenge progression
* Answer submission
* Timer behavior
* Completion
* Score calculation
* Result generation

---

# 35. Git Practices

Use clear commit messages.

Examples:

```text
feat: add candidate job listing
feat: implement talent quest assessment flow
feat: add assessment builder
feat: add candidate screening
fix: validate assessment submission
fix: prevent unauthorized TA access
refactor: extract candidate service
```

Avoid commits such as:

```text
update
changes
fix stuff
final
final2
```

---

# 36. Definition of Done

A feature is not complete merely because the UI exists.

A feature should include, where applicable:

```text
UI
↓
State handling
↓
API integration
↓
Validation
↓
Loading state
↓
Error state
↓
Success feedback
↓
Authorization
↓
Responsive behavior
```

---

# 37. Priority Order

When making implementation decisions, prioritize:

1. Correctness
2. Security
3. Usability
4. Accessibility
5. Maintainability
6. Performance
7. Visual polish

Do not sacrifice correctness for visual effects.

---

# 38. Final Rule

The platform is a **Talent Acquisition product with gamification**, not a gaming product with recruitment features.

Whenever there is uncertainty, preserve:

**Recruitment workflow → usability → clarity → accessibility → gamification → visual decoration.**
