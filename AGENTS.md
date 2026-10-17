# EIGER Talent Quest — AI Agent Instructions

## 1. Project Context

You are working on **EIGER Talent Quest**, a gamified Talent Acquisition platform integrated with an EIGER career experience.

The platform provides:

- Job discovery
- Job applications
- Candidate profiles
- Gamified Talent Quest assessments
- Assessment results
- Application tracking
- Candidate screening
- Talent pool management
- Assessment management
- Challenge management
- Competency management
- Recruitment analytics

The project structure is:

```text
talentquest-gamification/
├── frontend/
├── backend/
├── DESIGN.md
├── AGENTS.md
└── README.md
```

Read `README.md` to understand the overall architecture and product scope.

Read `DESIGN.md` before implementing or modifying UI.

Inspect the existing code before assuming a feature, route, component, API endpoint, or database model exists.

The existing implementation is the source of truth for what is currently functional. Documentation defines the intended direction but does not prove that a feature has been implemented.

---

## 2. Technology Rules

### Frontend

Use:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Lucide React for interface icons

Prefer:

- Server Components where appropriate
- Client Components only when interactivity requires them
- Reusable components
- Feature-oriented organization
- Strong TypeScript typing
- Shared design tokens
- Clear separation between presentation and business logic

The frontend uses Tailwind CSS v4.

Follow the existing configuration approach, including `@import "tailwindcss";` and `@theme inline` where already configured.

Do not introduce Tailwind CSS v3 configuration patterns unless an explicit migration is requested.

Do not introduce another frontend framework.

### Backend

Use:

- Node.js
- Express.js
- JavaScript or TypeScript according to the established backend setup
- REST API

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

Follow the actual existing architecture. Do not introduce additional layers unnecessarily.

Do not put large business logic directly inside route definitions.

### Database

Use:

- PostgreSQL
- Prisma ORM

All database schema changes must be reflected in:

`backend/prisma/schema.prisma`

Use Prisma migrations for structural changes.

Do not introduce another database or ORM unless explicitly requested.

### Dependencies

Before installing a dependency:

1. Check whether the functionality already exists.
2. Check whether an equivalent package is already installed.
3. Consider bundle size, security, and maintenance.
4. Add the dependency only when it provides meaningful value.

Do not install packages merely to avoid implementing a small feature with the existing stack.

---

## 3. Application Roles

The system has exactly two application roles:

```text
CANDIDATE
TALENT_ACQUISITION
```

Do not create additional application roles such as:

```text
ADMIN
SUPER_ADMIN
RECRUITER
MODERATOR
STAFF
```

unless explicitly requested.

Talent Acquisition already has the administrative capabilities required by the product.

Do not confuse application roles with internal organizational job titles or permission descriptions.

### Candidate

Candidates can access features intended for job seekers, including:

- Public jobs
- Job applications
- Candidate profile
- Assigned Talent Quest assessments
- Assessment results released to candidates
- Application tracking
- Relevant notifications

### Talent Acquisition

Talent Acquisition can access authorized recruitment-management features, including:

- Overview
- Candidates
- Jobs
- Assessments
- Challenges
- Competencies
- Users
- Talent Pool
- Analytics

The actual access rules must be enforced by the backend.

---

## 4. Authorization and Access Control

Authorization must be based on the authenticated user's verified role and permissions.

Candidate users must not access Talent Acquisition management features or unauthorized recruitment data.

Talent Acquisition users can access authorized recruitment operations.

Always enforce authorization on the backend.

Frontend route protection alone is not sufficient.

Never trust client-provided values for:

```text
userId
role
assessmentScore
competencyScore
recruitmentStage
applicationStatus
```

Validate these values against the authenticated identity, server-side business rules, and database state.

Do not allow users to gain permissions by changing request payloads or manipulating client-side state.

Protect both API endpoints and the data returned by them.

Do not expose sensitive candidate information through public endpoints.

---

## 5. UI/UX Rules

Before creating or modifying a UI screen:

1. Read `DESIGN.md`.
2. Inspect the existing implementation.
3. Check whether an appropriate component already exists.
4. Reuse established design tokens.
5. Follow the typography, spacing, radius, and color system.
6. Maintain responsive behavior.
7. Implement accessible interactions.
8. Include appropriate loading, empty, error, and success states.
9. Connect controls to real behavior when the relevant feature is implemented.
10. Avoid unrelated refactoring.

`DESIGN.md` is the primary reference for visual design decisions.

`AGENTS.md` defines development behavior, technical conventions, security requirements, and implementation constraints.

Use the existing `app/globals.css` as the source of truth for implemented global CSS tokens.

Do not create a separate visual system for every page.

Do not introduce arbitrary colors, typography, spacing, or button styles without a clear reason.

A UI element is not considered functional merely because it looks complete.

Do not present mock data as real recruitment data.

---

## 6. Visual Direction

The approved design direction is a **professional recruitment platform with a modern outdoor-adventure identity**.

The interface should feel:

- Modern
- Professional
- Clean
- Premium
- Outdoor-inspired
- Human-centered
- Functional
- Energetic without being distracting

### 6.1 Approved Color Palette

Use the following palette as the design baseline.

| Token | Hex | Purpose |
|---|---|---|
| Brand Navy | `#0B1B3D` | Primary brand color, headings, primary actions |
| Navy Accent | `#142952` | Hover states and dark surfaces |
| Brand Amber | `#D97706` | Secondary emphasis and highlights |
| Warm Amber | `#F59E0B` | Milestones and achievement accents |
| Background | `#F8F9FA` | Main page background |
| Surface | `#FFFFFF` | Cards, panels, and forms |
| Foreground | `#0F172A` | Primary text |
| Muted | `#64748B` | Secondary text |
| Border | `#E2E8F0` | Borders and dividers |
| Success | `#16A34A` | Successful actions and completed states |
| Warning | `#D97706` | Warnings and attention states |
| Error | `#DC2626` | Errors and destructive actions |
| Info | `#0284C7` | Informational states |

If the existing `app/globals.css` differs from this table, inspect the implementation before changing either the code or documentation.

Do not duplicate existing design tokens unnecessarily.

### 6.2 Typography

Use **Plus Jakarta Sans** as the primary font.

Do not accidentally override the global font with an unrelated default font class in `app/layout.tsx`.

Keep typography consistent across public pages, Candidate screens, and Talent Acquisition screens.

### 6.3 Outdoor Visual Language

Use outdoor-inspired elements selectively:

- Trail paths
- Challenge checkpoints
- Route markers
- Milestone indicators
- Achievement indicators
- Outdoor photography where appropriate
- Exploration-inspired illustrations

The homepage may use a custom SVG trail illustration.

Decorative elements must not interfere with text, controls, or navigation.

### 6.4 Avoid

- Forest green or olive as the dominant palette unless a redesign is explicitly approved
- Bright blue or cyan as the dominant brand color
- Purple and pink as the default dashboard palette
- Neon or cyberpunk effects
- Excessive gradients
- Excessive glassmorphism
- Child-like gaming interfaces
- Decorative charts without meaningful data
- Excessive animation
- Inconsistent component styles
- Generic styling that conflicts with the established brand direction

Gamification must support recruitment rather than turn the product into an arcade game.

---

## 7. Gamification Rules

Gamification must support recruitment and competency assessment.

Appropriate gamification elements include:

- Progress indicators
- Challenges
- Scenarios
- Decision-making tasks
- Narrative
- Completion feedback
- Assessment journeys
- Trail checkpoints
- Milestone indicators
- Achievement badges where appropriate

Avoid:

- Loot boxes
- Arcade graphics
- Excessive character avatars
- Excessive XP systems
- Leaderboards unless explicitly requested
- Neon gaming effects
- Rewards that misrepresent recruitment outcomes

Gamification should make the process more engaging without reducing professionalism, accessibility, fairness, or assessment integrity.

---

## 8. Candidate Experience

Candidate screens should prioritize:

- Mobile usability
- Clear instructions
- Fast navigation
- Simple forms
- Obvious next actions
- Accessible typography
- Clear feedback
- Consistent design
- Reliable application tracking

Candidate navigation should support:

```text
Overview
Jobs
Talent Quest
My Applications
Profile
```

The exact navigation implementation should follow the existing routing structure.

Candidate screens should feel simple, engaging, professional, and adventure-inspired.

Do not expose internal evaluation notes, private assessment content, or unauthorized recruitment information.

Do not claim that an application has advanced to another stage unless the backend confirms the state change.

---

## 9. Talent Acquisition Experience

Talent Acquisition screens should prioritize:

- Data density without clutter
- Filtering
- Sorting
- Search
- Candidate review
- Assessment insights
- Recruitment pipeline visibility
- Efficient actions
- Clear data states
- Consistent dashboard components

Talent Acquisition navigation should support:

```text
Overview
Candidates
Jobs
Assessments
Competencies
Users
Talent Pool
Analytics
```

The exact route names and layout should follow the existing implementation.

Use white surfaces, neutral borders, Navy emphasis, and selective Amber highlights.

Charts and metrics must use real data or be explicitly identified as development fixtures.

Do not introduce a separate Admin or Super Admin role.

---

## 10. Assessment Rules

Assessment scenarios must not expose competency scoring while the candidate is completing an assessment.

During an assessment, show only the information needed to complete the task, such as:

```text
Progress
Challenge number
Timer, if applicable
Scenario
Question or task
Available options
Relevant instructions
Confirmation action, when appropriate
```

Do not expose internal scoring details during an assessment, such as:

```text
Problem Solving: 85%
Adaptability: 72%
```

unless the assessment specification explicitly permits such disclosure.

### Assessment Interaction

- Display clear instructions before the assessment begins.
- Make progress visible when appropriate.
- Prevent accidental duplicate submissions.
- Warn users when leaving could result in lost progress.
- Persist answers according to the implemented backend behavior.
- Handle network failures clearly.
- Provide a clear completion state.
- Support keyboard navigation and accessible controls.

Do not implement a fake timer or fake progress indicator.

Only display a timer when the assessment actually uses a time limit.

---

## 11. Assessment Scoring

Assessment scoring must be implemented and validated on the backend.

Do not trust competency scores submitted by the client.

The client should submit the candidate's selected answer or action.

The backend should determine:

- Score
- Competency contribution
- Behavioral signals, if configured
- Overall assessment result

The exact scoring implementation must follow the assessment configuration stored in the database.

Validate assessment ownership, eligibility, attempt status, and submission rules before accepting a submission.

Do not allow candidates to modify completed results through client requests.

Do not invent scoring rules without checking the existing assessment configuration and product requirements.

---

## 12. Assessment Results

Candidate assessment results should provide insights rather than employment decisions.

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

The platform must not automatically make employment decisions solely on assessment scores.

Only display results that have been calculated and released according to the implemented workflow.

Distinguish clearly between:

- Not started
- In progress
- Submitted
- Awaiting evaluation
- Completed
- Expired
- Unavailable

Use the statuses supported by the actual backend rather than introducing inconsistent status values.

---

## 13. Candidate Screening

Talent Acquisition actions may include:

```text
Shortlist
Move to Interview
Hold
Reject
```

The available actions must follow the actual recruitment workflow.

Actions must update the candidate's recruitment stage through the backend.

Important actions should provide:

- Confirmation where appropriate
- Loading state
- Success feedback
- Error feedback

Record meaningful stage changes according to the existing data model.

Do not display a successful transition before the backend confirms it.

Do not allow an unauthorized user to modify recruitment stages.

---

## 14. API Rules

API endpoints should follow consistent REST conventions.

Example endpoint patterns:

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

These are examples, not instructions to duplicate existing endpoints.

Before creating an endpoint:

1. Inspect existing routes.
2. Inspect the controller and service layers.
3. Inspect existing API contracts.
4. Reuse or extend existing functionality when appropriate.
5. Avoid duplicate endpoints.

Use appropriate HTTP status codes.

Return consistent JSON response structures.

Do not expose stack traces, database internals, or secrets in production responses.

---

## 15. Validation

Validate all external input on the backend.

Validate, where applicable:

- Authentication payloads
- Job forms
- Candidate profiles
- Assessment configuration
- Challenge configuration
- Competencies
- Query parameters
- Pagination
- Filters
- Assessment answers
- File uploads
- User-management actions

Never rely exclusively on frontend validation.

Use the validation conventions and dependencies already established in the project.

Validation errors should be understandable to the frontend and should not expose internal implementation details.

---

## 16. Error Handling

Use centralized backend error handling where supported by the existing architecture.

Avoid leaking:

- Stack traces
- Database credentials
- Internal file paths
- SQL details
- Private tokens
- Sensitive candidate data

Development logs may contain additional debugging information, but production responses must remain safe.

Frontend errors should explain what happened and what the user can do next.

Avoid displaying raw technical errors such as:

```text
500 Internal Server Error
PrismaClientKnownRequestError
ECONNREFUSED
```

Example:

```text
We couldn't load the candidates.
Please try again.
```

Keep technical details in developer logs.

---

## 17. Security

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

Protect Talent Acquisition routes with role-based authorization.

Never trust client-provided:

```text
userId
role
assessmentScore
competencyScore
recruitmentStage
applicationStatus
```

without backend validation.

Additional requirements:

- Validate ownership before modifying user-owned resources.
- Prevent unauthorized access to candidate records.
- Validate file types and sizes where uploads are supported.
- Avoid exposing sensitive information in logs.
- Do not commit secrets or real environment files.
- Use environment variable examples without real credentials.
- Apply appropriate protections to authentication and sensitive operations.
- Validate access on the server even if the frontend hides restricted controls.

Do not weaken security to make a frontend interaction easier to implement.

---

## 18. Database Design

Prefer normalized relational structures.

Potential entities include:

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

These entities are suggestions, not a requirement to create every model.

Before modifying the schema:

1. Inspect `backend/prisma/schema.prisma`.
2. Inspect existing migrations.
3. Review current relations and constraints.
4. Identify the feature's actual data requirements.
5. Consider nullable fields, indexes, foreign keys, and deletion behavior.
6. Update the Prisma schema.
7. Create and validate the appropriate migration.
8. Test affected database operations.

Do not automatically create every suggested entity before validating requirements.

Keep the schema understandable and avoid premature complexity.

Never remove existing data or relations without understanding the impact.

---

## 19. Component Reuse

Before creating a component, search the project for an existing component with similar behavior.

Prefer:

```text
components/ui/
```

for generic UI components.

Prefer domain-specific component directories where appropriate:

```text
components/assessment/
components/candidates/
components/jobs/
components/talent-quest/
```

Follow the project's actual folder structure if it differs.

Potential shared components include:

- Button
- Input
- Select
- Textarea
- Checkbox
- Radio group
- Badge
- Card
- Modal
- Dropdown
- Tabs
- Tooltip
- Toast
- Skeleton
- Empty state
- Loading state
- Pagination
- Table
- Breadcrumb
- Progress indicator

Potential product-specific components include:

- Public Navbar
- Public Footer
- Job Card
- Job Filters
- Candidate Summary Card
- Application Status Badge
- Application Timeline
- Talent Quest Trail
- Challenge Card
- Assessment Progress
- Assessment Question
- Assessment Result Summary
- Dashboard Metric Card

Do not duplicate components unnecessarily.

Do not introduce abstractions that make simple code harder to understand.

The public homepage may use page-specific Tailwind classes and custom SVG elements when this is the clearest solution.

---

## 20. Responsive Development

Every public and Candidate screen must work on mobile, tablet, and desktop.

Talent Acquisition screens must work on desktop and adapt reasonably to tablet and mobile.

Do not simply shrink desktop layouts.

Consider:

- Navigation and sidebar behavior
- Tables
- Forms
- Cards
- Charts
- Assessment options
- Modals
- Dialogs
- Long job titles
- Candidate names
- Touch target sizes
- Primary actions

Use responsive layouts, wrapping, horizontal scrolling with clear affordances, or card-based alternatives as appropriate.

Avoid fixed widths and heights that cause overflow.

Do not hide essential functionality on mobile.

Test representative viewport sizes after significant UI changes.

---

## 21. Loading States

Every asynchronous operation should have an appropriate loading state.

Examples:

```text
Loading jobs...
Loading candidates...
Submitting application...
Saving profile...
Submitting assessment...
Publishing job...
Loading analytics...
```

Use the existing loading-state pattern where available.

Avoid leaving users uncertain whether an action worked.

Prevent duplicate submissions when necessary.

Do not display an indefinite loading state when the request has failed.

---

## 22. Empty States

Provide meaningful empty states for pages and components that can have no data.

Examples:

```text
No applications yet.

No candidates found.

No active jobs.

No assessments created.

No candidates match these filters.
```

Whenever possible, provide a relevant next action.

Distinguish between:

- A genuinely empty result
- Data that has not loaded
- A failed request
- A result set with active filters

Do not display an empty state as a substitute for error handling.

---

## 23. Error States

Errors must be understandable to users.

Avoid technical messages such as:

```text
500 Internal Server Error
PrismaClientKnownRequestError
ECONNREFUSED
```

Instead, provide meaningful messages.

Example:

```text
We couldn't load the candidates.
Please try again.
```

Keep technical details in developer logs.

Where appropriate, provide retry actions.

Do not show success feedback when an operation fails.

---

## 24. Forms

Forms must have:

- Labels
- Clear validation
- Required-field indicators where appropriate
- Error messages
- Loading states
- Success feedback
- Appropriate input types
- Accessible controls

Do not use placeholder text as the only label.

Preserve user input when validation fails where practical.

Use appropriate autocomplete attributes for authentication fields.

Prevent accidental duplicate submissions.

Do not reset forms before a successful operation unless explicitly intended.

---

## 25. Tables

Talent Acquisition tables should support, where appropriate:

- Sorting
- Filtering
- Search
- Pagination
- Row actions
- Loading states
- Empty states
- Error states

Tables should remain readable and should not expose unauthorized data.

On smaller screens, use responsive alternatives such as cards or horizontal scrolling where appropriate.

Keep row actions organized and provide clear labels for icon-only controls.

Use consistent status badges.

Do not add sorting or filtering controls that do not actually work.

---

## 26. Charts and Analytics

Charts should communicate meaningful recruitment information.

Suitable chart types include:

- Bar charts
- Line charts
- Funnel charts
- Progress indicators
- Distribution charts

Use charts only when they improve understanding.

Rules:

- Use real data where available.
- Clearly label development fixtures or mock data.
- Use meaningful titles and labels.
- Avoid misleading scales.
- Ensure readable layouts on smaller screens.
- Provide loading, empty, and error states.
- Use consistent status and brand colors.
- Do not invent metrics or trends.
- Provide accessible summaries or tabular alternatives where practical.

Avoid charts that exist only for decoration.

---

## 27. Accessibility

Follow accessible UI practices.

Ensure:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Accessible form labels
- Sufficient color contrast
- Screen-reader-friendly controls
- Accessible status communication
- Logical heading hierarchy
- Appropriate dialog focus management
- Reduced-motion support

Do not communicate important information through color alone.

Do not use hover as the only indication of interactivity.

Provide accessible names for icon-only buttons.

Ensure essential assessment instructions and controls remain usable when motion is reduced or animations are disabled.

Use buttons for actions and links for navigation.

---

## 28. Code Quality

Prefer:

- Small, focused components
- Clear naming
- Strong typing
- Reusable utilities
- Predictable folder structure
- Single responsibility
- Explicit interfaces and types
- Consistent error handling
- Readable business logic

Avoid:

- Giant components
- Repeated code
- Magic values
- Unused dependencies
- Unnecessary abstractions
- Premature optimization
- Unnecessary `any`
- Silent error suppression
- Unrelated refactoring

Follow the conventions already used in the relevant part of the project.

Do not introduce a new architectural pattern for one feature without a clear benefit.

---

## 29. Dependencies

Do not install a new dependency merely to solve a problem that can reasonably be handled with the existing stack.

Before adding a package:

1. Check whether the functionality already exists.
2. Check whether the project already uses an equivalent package.
3. Consider bundle size and maintenance.
4. Add the dependency only when it provides meaningful value.

Avoid changing major dependency versions without checking compatibility.

Do not replace an existing library solely because another library is more familiar.

---

## 30. File Changes

Keep changes focused.

Do not modify unrelated files.

Before implementing a feature:

```text
Understand
   ↓
Inspect
   ↓
Plan
   ↓
Implement
   ↓
Validate
   ↓
Test
```

When changing a file:

- Preserve unrelated working behavior.
- Follow existing naming conventions.
- Reuse existing utilities.
- Avoid unnecessary file moves.
- Avoid overwriting project configuration without inspection.
- Update relevant documentation when behavior or architecture changes.

Do not assume that a file's expected contents match the actual project. Inspect the file first.

---

## 31. Before Implementing UI

Always inspect:

```text
README.md
DESIGN.md
Existing components
Existing routes
Existing API contracts
Existing types
frontend/app/globals.css
frontend/app/layout.tsx
```

Use the actual paths if the project has a different folder structure.

`DESIGN.md` is the primary visual specification.

The existing implementation is the source of truth for what has already been built.

When documentation and code disagree:

1. Identify the conflict.
2. Determine whether the implementation is intentional or outdated.
3. Preserve working functionality.
4. Do not silently introduce a conflicting design system.
5. Update the documentation or implementation when the intended direction is clear.
6. Ask for clarification if the conflict changes product behavior or requires a significant redesign.

Do not assume that a feature is complete merely because it appears in `DESIGN.md`.

Do not assume that a planned feature already exists in the codebase.

---

## 32. Before Implementing Backend

Inspect:

```text
Prisma schema
Existing migrations
Existing services
Existing controllers
Existing routes
Authentication middleware
Authorization middleware
Existing validation
Existing API response patterns
```

Before creating an endpoint, check whether the functionality already exists.

Follow the current architecture.

Do not duplicate endpoints or bypass established authorization middleware.

Keep business logic out of route definitions.

---

## 33. Before Modifying the Database

Consider:

- Existing relations
- Existing data
- Migration impact
- Required indexes
- Foreign keys
- Nullable fields
- Delete behavior
- Unique constraints
- Transaction requirements

Use Prisma migrations.

Validate schema changes and test affected operations.

Never manually modify production database structure without an appropriate migration.

Do not make destructive schema changes without understanding their impact.

Do not remove or rename fields casually when existing data or application code depends on them.

---

## 34. Testing

Test relevant behavior whenever implementing or modifying functionality.

### Frontend

Check:

- Rendering
- User interactions
- Form validation
- Loading states
- Empty states
- Error states
- Success feedback
- Responsive behavior
- Keyboard accessibility

### Backend

Check:

- Authentication
- Authorization
- Validation
- Business logic
- Database operations
- Error handling
- HTTP status codes
- Unauthorized requests
- Invalid input

### Assessment

Check:

- Challenge progression
- Answer submission
- Timer behavior when applicable
- Progress persistence
- Completion
- Score calculation
- Result generation
- Duplicate submission handling
- Unauthorized access

Use the existing test framework and conventions.

Do not claim that tests passed unless they were actually executed.

If testing cannot be completed, clearly state what remains unverified.

---

## 35. Git Practices

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

Do not overwrite unrelated user changes.

Inspect the working tree before destructive Git operations.

Do not force-push, reset, or discard user changes unless explicitly authorized.

---

## 36. Definition of Done

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
Empty state
 ↓
Error state
 ↓
Success feedback
 ↓
Authorization
 ↓
Responsive behavior
 ↓
Accessibility
 ↓
Testing
```

### Visual Validation

Verify that:

- The approved Navy + Amber design direction is followed.
- Plus Jakarta Sans is applied consistently.
- Existing design tokens are reused.
- Buttons, inputs, cards, badges, and navigation follow the design system.
- No conflicting duplicate style definitions remain.
- Layouts work on mobile, tablet, and desktop.
- Motion respects reduced-motion preferences where applicable.

### Functional Validation

Verify that:

- Interactive controls perform their intended actions.
- API operations reflect real application state.
- Forms validate input.
- Loading, empty, error, and success states work as appropriate.
- Duplicate submissions are handled.
- Protected routes and endpoints enforce authorization.

### Quality Validation

Verify that:

- TypeScript checks pass where configured.
- Lint checks pass where configured.
- Relevant tests pass.
- No avoidable console errors remain.
- No unrelated files were modified unnecessarily.
- Documentation reflects significant changes to design, architecture, roles, or workflow.

---

## 37. Priority Order

When making implementation decisions, prioritize:

1. Correctness
2. Security
3. Usability
4. Accessibility
5. Maintainability
6. Performance
7. Visual consistency
8. Gamification
9. Decorative polish

Do not sacrifice correctness or security for visual effects.

Do not sacrifice accessibility for animation or visual novelty.

---

## 38. Final Rule

EIGER Talent Quest is a **Talent Acquisition product with gamification**, not a gaming product with recruitment features.

Whenever there is uncertainty, preserve:

**Recruitment workflow → correctness → security → usability → accessibility → maintainability → visual consistency → gamification → visual decoration.**

Follow the approved Navy + Amber design system, reuse existing components, preserve the two-role model, and ensure that visual features support the actual recruitment workflow.
