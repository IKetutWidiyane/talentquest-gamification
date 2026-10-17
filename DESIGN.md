# EIGER Talent Quest — UI/UX Design Specification

**Project:** EIGER Talent Quest  
**Product Type:** Gamified Talent Acquisition Platform  
**Design Version:** 2.0  
**Status:** Public Homepage — Design Baseline; Other Pages — Implementation Planned / In Progress  
**Primary Brand:** EIGER Adventure  
**Primary Font:** Plus Jakarta Sans  
**Frontend:** Next.js App Router, TypeScript, Tailwind CSS v4, Lucide React

---

## Table of Contents

1. Product Overview
2. Product Goals
3. Design Principles
4. User Roles and Permissions
5. Information Architecture
6. Design Direction
7. Color System
8. Typography
9. Spacing System
10. Layout and Grid
11. Border Radius
12. Shadows and Elevation
13. Iconography
14. Photography and Visual Assets
15. Buttons
16. Form Elements
17. Cards and Surfaces
18. Navigation and Footer
19. Public Homepage
20. Jobs Listing
21. Job Detail
22. Authentication
23. Candidate Profile
24. Candidate Portal
25. Talent Quest Experience
26. Assessment Results
27. Application Tracking
28. Talent Acquisition Portal
29. Dashboard and Analytics
30. Tables and Data Views
31. Feedback and Notifications
32. Responsive Design
33. Accessibility
34. Motion and Interaction
35. Component Architecture
36. Design Tokens
37. Implementation Rules
38. Definition of Done

---

# 1. Product Overview

EIGER Talent Quest is a recruitment platform that combines conventional job applications with gamified assessments.

The platform helps candidates explore career opportunities, complete competency-based challenges, and monitor their recruitment progress. It also helps the Talent Acquisition team manage vacancies, evaluate applicants, organize assessments, and identify potential talent.

The product combines three core concepts:

- **Career discovery:** Candidates can browse and apply for relevant opportunities.
- **Gamified assessment:** Candidates complete structured challenges that help demonstrate their abilities.
- **Recruitment management:** Talent Acquisition can review candidate profiles, applications, assessment outcomes, and talent pools.

The visual experience should communicate EIGER's outdoor-adventure identity while maintaining the clarity, professionalism, and accessibility expected from a recruitment platform.

## Product Positioning

EIGER Talent Quest is not a conventional job board and not a game-only experience.

It is a professional recruitment platform with an adventure-inspired assessment journey.

The interface must remain practical and professional even when it uses trails, checkpoints, progress indicators, badges, and challenge cards.

---

# 2. Product Goals

## 2.1 Candidate Goals

- Discover job opportunities.
- Understand job requirements and responsibilities.
- Apply for available positions.
- Complete Talent Quest challenges.
- Review assessment results and feedback when available.
- Track application progress.
- Maintain an up-to-date professional profile.

## 2.2 Talent Acquisition Goals

- View recruitment activity through a dashboard.
- Manage candidate records and applications.
- Create and maintain job postings.
- Configure assessments and challenge content.
- Manage competencies and assessment criteria.
- Manage platform users within authorized permissions.
- Organize and review the talent pool.
- Analyze recruitment metrics and assessment performance.

## 2.3 Business Goals

- Improve candidate engagement.
- Make recruitment workflows easier to manage.
- Present a consistent employer brand.
- Support structured and competency-based evaluation.
- Provide a scalable foundation for future recruitment features.

---

# 3. Design Principles

## 3.1 Professional First

Although the platform uses gamification, it must look like a professional recruitment product.

Avoid childish game graphics, excessive gradients, oversized emojis, and unnecessary decorative elements.

## 3.2 Adventure Inspired

Use subtle visual references to outdoor exploration:

- Trail lines.
- Checkpoints.
- Route markers.
- Milestone indicators.
- Exploration-inspired illustrations.
- Achievement badges.

These elements should support the interface rather than compete with its content.

## 3.3 Clear Information Hierarchy

Every screen should communicate its primary purpose immediately.

Use typography, spacing, contrast, and grouping to distinguish primary actions from secondary information.

## 3.4 Consistent Components

Shared elements must use consistent styling across the homepage, job pages, authentication screens, candidate portal, and Talent Acquisition portal.

## 3.5 Accessible by Default

Maintain readable text, visible focus states, keyboard accessibility, sufficient color contrast, and reduced-motion support.

## 3.6 Responsive by Design

Every page must work on desktop, tablet, and mobile devices.

Desktop layouts should not simply be scaled down. They must adapt to smaller screens with appropriate navigation and content arrangements.

## 3.7 Functional Before Decorative

Visual elements must not interfere with usability.

Progress bars, filters, buttons, navigation links, assessment controls, and status indicators must represent real interface states rather than decorative placeholders.

---

# 4. User Roles and Permissions

The application has exactly two roles.

## 4.1 Candidate

The Candidate role represents job seekers who use the platform to explore opportunities and participate in recruitment.

Candidate capabilities:

- Browse published jobs.
- View job details.
- Submit applications.
- Manage personal and professional profile information.
- Access assigned Talent Quest assessments.
- Complete available challenges.
- View assessment results when released.
- Track application status.
- View relevant notifications.

## 4.2 Talent Acquisition

The Talent Acquisition role represents authorized recruitment personnel.

Talent Acquisition capabilities:

- Access the recruitment dashboard.
- Review and manage candidate records.
- Review and manage job applications.
- Create, update, publish, and close job postings according to permissions.
- Configure assessments and challenges.
- Manage competency definitions and assessment criteria.
- Manage platform users and their authorized access.
- Maintain the talent pool.
- Review recruitment analytics and reports.

**Important:** Talent Acquisition is the only recruitment-management role. Do not introduce separate `ADMIN` or `SUPER_ADMIN` application roles.

Administrative capabilities are represented by the `TALENT_ACQUISITION` role and enforced by the backend authorization layer.

## 4.3 Authorization Principles

- A Candidate must not access Talent Acquisition routes or data.
- Talent Acquisition must not be restricted to Candidate-facing navigation.
- Hiding a navigation item is not sufficient authorization.
- Protected pages and APIs must enforce permissions independently.
- Sensitive user and recruitment data must not be exposed through public routes.

---

# 5. Information Architecture

## 5.1 Public Pages

- Homepage
- Jobs Listing
- Job Detail
- Login
- Register
- Talent Quest Landing / Introduction

Public pages should provide a clear path from discovering the platform to applying for a job or signing in.

## 5.2 Candidate Portal

Primary navigation:

1. Overview / Dashboard
2. Jobs
3. Talent Quest
4. My Applications
5. Profile

The navigation may be adapted for mobile, but all essential functions must remain accessible.

## 5.3 Talent Acquisition Portal

Primary navigation:

1. Overview
2. Candidates
3. Jobs
4. Assessments
5. Competencies
6. Users
7. Talent Pool
8. Analytics

Do not create a separate Admin navigation or role.

## 5.4 Navigation Rules

- Public navigation should be lightweight and focused on discovery.
- Candidate navigation should prioritize applications and assessments.
- Talent Acquisition navigation should prioritize recruitment operations.
- The current route should have a clear active state.
- Destructive or sensitive actions must not be placed ambiguously beside routine navigation actions.

---

# 6. Design Direction

## 6.1 Visual Identity

The current design direction uses a clean, light interface with deep navy and amber accents.

The navy palette communicates reliability, professionalism, and structure. Amber introduces energy and visual emphasis associated with exploration and achievement.

The outdoor identity should appear through the composition, trail graphics, route markers, and carefully selected imagery—not through excessive decorative styling.

## 6.2 Visual Characteristics

- Light gray page backgrounds.
- White content surfaces.
- Deep navy primary actions and headings.
- Amber accents for highlighted actions and milestones.
- Thin neutral borders.
- Soft, restrained shadows.
- Medium-to-large rounded corners.
- Clear typography and comfortable whitespace.
- Minimal gradients.
- Consistent iconography.

## 6.3 Avoid

- Reverting to a forest-green-dominant palette without an explicit redesign decision.
- Using bright blue or cyan as the dominant brand color.
- Using purple and pink as the default dashboard palette.
- Applying glassmorphism to every card.
- Excessive animation or parallax.
- Inconsistent button colors between pages.
- Large decorative illustrations that push essential content below the fold.
- Fake metrics or assessment results presented as real data.

---

# 7. Color System

The following palette is the design baseline for the current homepage and future application pages.

## 7.1 Brand Colors

| Token | Hex | Usage |
|---|---|---|
| Brand Navy | `#0B1B3D` | Primary brand color, headings, primary buttons |
| Brand Navy Accent | `#142952` | Hover states, dark surfaces, secondary emphasis |
| Brand Amber | `#D97706` | Secondary emphasis, selected indicators |
| Warm Amber | `#F59E0B` | Highlighted milestones, achievement accents |

## 7.2 Neutral Colors

| Token | Hex | Usage |
|---|---|---|
| Background | `#F8F9FA` | Main application background |
| Surface | `#FFFFFF` | Cards, panels, forms, modals |
| Foreground | `#0F172A` | Main text and headings |
| Muted | `#64748B` | Secondary text and descriptions |
| Border | `#E2E8F0` | Dividers, input borders, card outlines |

## 7.3 Semantic Colors

| Token | Hex | Usage |
|---|---|---|
| Success | `#16A34A` | Completed actions and positive outcomes |
| Warning | `#D97706` | Pending actions and attention states |
| Error | `#DC2626` | Validation errors and destructive-action warnings |
| Info | `#0284C7` | Informational messages and neutral notices |

Semantic colors must be used consistently.

Amber is part of the brand palette and can also communicate warnings, but its meaning must be clear from labels and context. Do not rely on color alone to convey status.

## 7.4 Color Usage Rules

- Use navy for primary actions and important headings.
- Use amber selectively for milestones, highlights, and secondary emphasis.
- Use white for content surfaces.
- Use the background token for page-level separation.
- Use muted text for supporting information, not essential instructions with insufficient contrast.
- Use semantic colors only when the corresponding meaning applies.
- Do not introduce arbitrary colors without documenting their purpose.

---

# 8. Typography

## 8.1 Primary Typeface

**Plus Jakarta Sans**

Use Plus Jakarta Sans consistently across the application.

The font should be loaded through the existing application layout or global stylesheet and should not be overridden by an unrelated default font class.

## 8.2 Type Scale

| Element | Desktop | Mobile | Weight |
|---|---|---|---|
| Hero heading | 48–64 px | 36–44 px | 700–800 |
| Page heading | 32–40 px | 28–32 px | 700 |
| Section heading | 24–32 px | 22–26 px | 600–700 |
| Card heading | 18–22 px | 18–20 px | 600–700 |
| Body text | 15–16 px | 14–16 px | 400–500 |
| Supporting text | 13–14 px | 13–14 px | 400–500 |
| Labels | 12–14 px | 12–14 px | 500–600 |
| Button text | 14–16 px | 14–16 px | 600 |

These sizes are guidelines. Long-form job descriptions and dense tables should prioritize readability over strict adherence to the scale.

## 8.3 Typography Rules

- Headings should use a clear, concise hierarchy.
- Body text should use comfortable line height.
- Use bold text to emphasize meaningful information.
- Avoid long paragraphs with excessive line length.
- Use sentence case for most headings and buttons.
- Do not use uppercase text for long descriptions.
- Avoid mixing multiple font families without a clear reason.

---

# 9. Spacing System

Use a consistent spacing scale based on 4 px increments.

| Token | Value | Typical Usage |
|---|---:|---|
| `space-1` | 4 px | Tight icon gaps |
| `space-2` | 8 px | Compact control spacing |
| `space-3` | 12 px | Form field internals |
| `space-4` | 16 px | Standard component spacing |
| `space-5` | 20 px | Card content gaps |
| `space-6` | 24 px | Standard card padding |
| `space-8` | 32 px | Section element spacing |
| `space-10` | 40 px | Large component separation |
| `space-12` | 48 px | Section spacing |
| `space-16` | 64 px | Large section separation |
| `space-20` | 80 px | Hero and major page spacing |

Use consistent spacing instead of assigning unrelated margin and padding values to every component.

---

# 10. Layout and Grid

## 10.1 Main Container

Use a centered content container with a maximum width suitable for the page.

Recommended maximum width: approximately `1200–1280 px`.

Use responsive horizontal padding:

- Mobile: 16–20 px.
- Tablet: 24–32 px.
- Desktop: 32–48 px.

## 10.2 Public Pages

Public pages should prioritize visual hierarchy, clear content flow, and accessible calls to action.

Use full-width section backgrounds only when they support the design.

## 10.3 Dashboard Pages

Dashboard layouts should use:

- Sidebar navigation on sufficiently wide screens.
- A compact mobile navigation pattern.
- A consistent page header.
- A primary content area.
- Responsive cards and tables.
- Clear empty, loading, and error states.

## 10.4 Grid Guidelines

- Two-column layouts are appropriate for detail pages and split-screen authentication.
- Three-column grids are suitable for value propositions and summary cards.
- Four-column grids are suitable for compact dashboard metrics on wide screens.
- Reduce the number of columns as available space decreases.
- Never allow important text or controls to overflow horizontally.

---

# 11. Border Radius

Use rounded corners consistently.

| Element | Recommended Radius |
|---|---|
| Small badges | 6–8 px |
| Inputs | 8–12 px |
| Buttons | 8–12 px |
| Standard cards | 12–16 px |
| Large feature cards | 16–20 px |
| Modals | 16–20 px |
| Pills | Fully rounded |

Avoid mixing sharp, rounded, and pill-shaped components without a defined hierarchy.

---

# 12. Shadows and Elevation

Use shadows sparingly.

## Elevation Guidelines

- Default cards: subtle border with little or no shadow.
- Hoverable cards: slightly stronger shadow or border emphasis.
- Dropdowns and popovers: visible separation from the background.
- Modals: stronger elevation and an appropriate backdrop.
- Sticky navigation: subtle bottom border or shadow.

Borders should remain the primary method of separating most content surfaces.

Avoid heavy shadows, excessive glow effects, and prominent colored shadows.

---

# 13. Iconography

Use **Lucide React** for interface icons.

## Rules

- Use a consistent icon family.
- Use 16 px icons for compact controls.
- Use 18–20 px icons for standard navigation and buttons.
- Use 24 px or larger icons only when appropriate for feature illustrations or empty states.
- Pair unfamiliar icons with labels.
- Use icons to reinforce meaning, not replace important text.
- Keep icon stroke weight and alignment consistent.

Do not mix Lucide icons with unrelated emoji-based interface icons.

---

# 14. Photography and Visual Assets

## 14.1 Brand Assets

Use approved EIGER brand assets where available.

The navbar logo should use the provided asset:

`public/images/eiger-logo.png`

Use Next.js `Image` when appropriate for optimized image rendering.

The logo should preserve its original aspect ratio and should not be recolored, distorted, or cropped improperly.

## 14.2 Image Guidelines

- Use high-quality outdoor imagery where it supports the story.
- Maintain sufficient contrast between text and image backgrounds.
- Use overlays only when required for legibility.
- Use consistent aspect ratios for repeated image cards.
- Provide meaningful alternative text for informative images.
- Use empty alternative text for purely decorative images.

## 14.3 Asset Availability

If a required image or logo is missing, use a clearly documented placeholder during development.

Do not treat a placeholder as an official EIGER asset.

---

# 15. Buttons

## 15.1 Primary Button

Purpose: The most important action in a section or page.

Style:

- Navy background.
- White text.
- Medium-to-semibold font weight.
- Comfortable horizontal padding.
- Rounded corners.
- Clear hover and focus states.

Examples:

- Explore Jobs
- Apply Now
- Start Challenge
- Save Changes
- Publish Job

## 15.2 Secondary Button

Purpose: A less prominent action that remains important.

Style:

- White or transparent background.
- Navy text.
- Neutral border.
- Similar dimensions to the primary button.

Examples:

- View Details
- View Applications
- Edit Profile
- Cancel

## 15.3 Accent Button

Purpose: Highlight a meaningful Talent Quest action or milestone.

Style:

- Amber background or amber-accented surface.
- Dark text when necessary for contrast.
- Used selectively.

Amber must not replace navy as the default primary-action color throughout the application.

## 15.4 Destructive Button

Purpose: Remove or permanently change data.

Style:

- Error-colored emphasis.
- Clear action label.
- Confirmation when the operation is destructive or difficult to reverse.

Examples:

- Delete Job
- Remove Candidate
- Delete Assessment

## 15.5 Button States

Every interactive button must support:

- Default.
- Hover.
- Focus-visible.
- Active.
- Disabled.
- Loading, when applicable.

Prevent duplicate submissions while a request is processing.

A button must perform its advertised action. Do not use inert buttons as visual placeholders in completed flows.

---

# 16. Form Elements

Form elements must be clear, consistent, and accessible.

## Supported Elements

- Text input.
- Email input.
- Password input.
- Number input.
- Select.
- Checkbox.
- Radio button.
- Textarea.
- File upload.
- Date and time controls when required.

## Form Rules

- Every input must have a visible or programmatically associated label.
- Placeholder text must not replace the label.
- Required fields must be clearly indicated.
- Validation messages must explain how to fix the problem.
- Preserve user input when validation fails where practical.
- Display loading states during submission.
- Prevent accidental duplicate submissions.
- Use appropriate autocomplete attributes for authentication fields.
- Do not expose passwords or sensitive information in logs or notifications.

## Validation States

- Default.
- Focused.
- Valid, where useful.
- Invalid.
- Disabled.
- Loading.

Use the semantic error color alongside descriptive text.

---

# 17. Cards and Surfaces

Cards group related information and actions.

## Card Types

### Standard Card

Used for general content, summaries, and grouped information.

### Feature Card

Used for value propositions, Talent Quest areas, and highlighted capabilities.

### Job Card

Displays a concise job summary, location, employment type, and a link to the job detail.

### Challenge Card

Displays the challenge title, competency, estimated duration where available, and current status.

### Metric Card

Displays a label, a verified value, and optional contextual information.

### Candidate Card

Displays candidate information appropriate to the viewer's role and permissions.

## Card Rules

- Maintain consistent padding.
- Use a clear heading and supporting information.
- Keep related actions visually grouped.
- Use consistent card heights when a repeated grid benefits from alignment.
- Avoid excessive decoration.
- Make a card clickable only when the interaction is clear.
- Do not nest multiple interactive controls inside a single clickable surface in a way that creates accessibility problems.

---

# 18. Navigation and Footer

## 18.1 Public Navbar

The public navbar should contain:

- EIGER logo.
- Jobs link.
- Talent Quest link.
- Login action.
- Register or primary call to action.

The exact arrangement may adapt to screen width.

The navbar should be lightweight and must not compete with the hero section.

## 18.2 Candidate Navigation

The Candidate portal should provide direct access to:

- Overview.
- Jobs.
- Talent Quest.
- My Applications.
- Profile.

## 18.3 Talent Acquisition Navigation

The Talent Acquisition portal should provide access to:

- Overview.
- Candidates.
- Jobs.
- Assessments.
- Competencies.
- Users.
- Talent Pool.
- Analytics.

## 18.4 Footer

The public footer should include relevant navigation, career-related links, brand information, and any approved contact or social links.

Do not invent official contact details or external social URLs.

---

# 19. Public Homepage

The homepage is the visual baseline for the current implementation.

## 19.1 Hero Section

Purpose: Introduce the product and encourage visitors to explore career opportunities.

Required content:

- A concise headline.
- Supporting description.
- Primary call to action.
- Secondary call to action when appropriate.
- Adventure-inspired trail illustration.

The headline should emphasize career discovery, exploration, and demonstrating potential.

### Trail Illustration

The current concept uses a custom SVG trail map with four challenge stops.

The illustration should:

- Use the navy and amber design palette.
- Maintain a clear path between checkpoints.
- Remain visually balanced with the hero copy.
- Scale responsively.
- Avoid blocking interactive elements.
- Respect reduced-motion preferences.

The trail is an illustrative representation of the Talent Quest experience, not a literal geographic map.

### Hero Actions

Primary action: Explore Jobs.

Secondary action: Discover Talent Quest.

Actions should navigate to their intended destinations.

## 19.2 Value Proposition Section

Display three value proposition cards.

Each card should explain a distinct benefit, such as:

1. Discover opportunities.
2. Demonstrate competencies.
3. Track recruitment progress.

Use consistent card layouts, restrained icons, and concise descriptions.

## 19.3 Recruitment Pipeline Section

Display five recruitment stages using a clear visual sequence.

The stages should reflect the actual recruitment workflow adopted by the product.

If the final workflow differs from the current illustration, update the copy and visual stages to match the implemented business logic.

Do not imply that every candidate follows an identical sequence if the backend supports different paths.

## 19.4 Talent Quest Section

Display four challenge areas that introduce the gamified assessment experience.

The exact challenge names, competencies, and availability must remain consistent with the assessment configuration.

Challenge cards on the public homepage may be introductory and should not expose private assessment content.

## 19.5 Closing CTA

The closing section should encourage users to take the next relevant step.

Examples:

- Explore career opportunities.
- Create a candidate account.
- Learn about Talent Quest.

Avoid displaying multiple competing primary actions.

## 19.6 Homepage Quality Rules

- Keep the visual hierarchy clear.
- Ensure all CTA destinations exist.
- Maintain responsive layouts.
- Use real product copy rather than repeated placeholder text.
- Use animation sparingly.
- Avoid excessive visual effects.
- Ensure the homepage communicates the product without requiring authentication.

---

# 20. Jobs Listing

The Jobs Listing page allows candidates to discover available opportunities.

## Required Content

- Page title and supporting description.
- Job search input.
- Relevant filters.
- Job count when available.
- Job cards.
- Pagination or load-more behavior where appropriate.
- Empty state.
- Loading state.
- Error state.

## Job Card Content

Show only relevant information, such as:

- Job title.
- Department or job category.
- Location.
- Employment type.
- Short description.
- Publication date when available.
- Application status or deadline where relevant.

## Interaction Rules

- Search and filters must affect the displayed results.
- Filter combinations should behave consistently.
- Clearing filters should restore the appropriate result set.
- Pagination must preserve applicable filters.
- Closed or unpublished jobs must not be presented as open opportunities.
- The application must communicate when no jobs match the search.

---

# 21. Job Detail

The Job Detail page provides the information needed to make an application decision.

## Required Content

- Job title.
- Department or team.
- Location.
- Employment type.
- Job description.
- Responsibilities.
- Qualifications.
- Application instructions.
- Deadline, if applicable.
- Application CTA.

## Interaction Rules

- The Apply action must respect authentication and application eligibility.
- If authentication is required, preserve the intended job destination when practical.
- Candidates who have already applied should receive a clear state.
- Closed jobs must not offer an active application action.
- Job content should remain readable on mobile.
- Use a clear content hierarchy for long descriptions.

---

# 22. Authentication

Authentication includes Login and Register.

## Login

Required elements:

- Email field.
- Password field.
- Submit button.
- Validation feedback.
- Loading state.
- Relevant recovery link, if supported.

## Register

Required elements:

- Name.
- Email.
- Password.
- Password confirmation where required.
- Terms acknowledgement only if applicable.
- Validation feedback.
- Submit button.

## Authentication Design

A split-screen layout may be used on desktop, with a compact single-column layout on mobile.

Outdoor imagery or an adventure-inspired visual may be used as a secondary visual element. Authentication forms must remain the primary focus.

## Security and UX Rules

- Never reveal whether a password is correct through overly detailed error messages.
- Do not store authentication tokens in insecure locations.
- Do not rely on frontend role selection to grant permissions.
- Role assignment must be validated by the backend.
- Provide clear success and error feedback.
- Avoid unnecessary form fields.

---

# 23. Candidate Profile

The Candidate Profile page allows candidates to manage relevant professional information.

## Suggested Sections

- Personal information.
- Professional summary.
- Education.
- Work experience.
- Skills and competencies.
- Portfolio or external links.
- Resume or supporting documents, if supported.

## Design Rules

- Group fields into logical sections.
- Provide an obvious edit and save flow.
- Show completion indicators only when based on defined criteria.
- Avoid forcing candidates to fill unnecessary fields.
- Make uploaded documents and external links easy to review.
- Communicate save success and failure.

Candidate information must only be visible to authorized users and systems.

---

# 24. Candidate Portal

The Candidate Portal is the authenticated workspace for job seekers.

## 24.1 Overview

The overview should summarize relevant information, such as:

- Profile completion, if calculated.
- Active applications.
- Pending assessments.
- Recent application updates.
- Recommended next steps.

Use only data that is available and authorized.

## 24.2 Jobs

Candidates should be able to browse jobs and access relevant details from the portal.

The interface should make the difference between available, applied, and closed opportunities clear.

## 24.3 Talent Quest

The Talent Quest area should show assigned assessments, challenge progress, and available next actions.

Do not show locked, expired, or unavailable assessments as though they can be started.

## 24.4 My Applications

Candidates should be able to review their submitted applications and current statuses.

Provide useful links to job details and any available next steps.

## 24.5 Profile

Candidates should be able to review and update their professional information.

## 24.6 Empty States

Every major Candidate page should explain what the user can do when no data is available.

Examples:

- No applications yet.
- No assessments assigned.
- No recent updates.
- Profile information is incomplete.

Empty states should include a relevant action when one is available.

---

# 25. Talent Quest Experience

Talent Quest is the gamified assessment experience.

Its interface should feel engaging without sacrificing clarity, fairness, or assessment integrity.

## 25.1 Talent Quest Landing

Introduce:

- The purpose of Talent Quest.
- How the assessment process works.
- Available or assigned challenges.
- Expected duration, when configured.
- Relevant instructions.
- A clear start action.

Do not promise a duration, reward, or assessment outcome that has not been configured.

## 25.2 Challenge Overview

Each challenge should communicate:

- Challenge title.
- Competency being evaluated.
- Instructions.
- Available question or task count, where appropriate.
- Time limit, if applicable.
- Current status.
- Start or continue action.

## 25.3 Assessment Screen

The assessment interface should prioritize the task itself.

Required elements depend on the assessment type and may include:

- Assessment title.
- Instructions.
- Progress indicator.
- Question or task content.
- Answer controls.
- Previous and next controls where supported.
- Submit action.
- Remaining time when a real timer is implemented.

## 25.4 Assessment States

The system should distinguish:

- Not started.
- In progress.
- Submitted.
- Completed.
- Expired.
- Unavailable.

Use clear labels and supporting explanations.

## 25.5 Assessment Integrity

- Do not fabricate timer values or progress.
- Persist progress according to the actual backend behavior.
- Warn users before leaving an assessment if unsaved progress may be lost.
- Confirm final submission where appropriate.
- Prevent duplicate submissions.
- Handle network failures without silently discarding answers.
- Ensure controls are keyboard accessible.

## 25.6 Gamification

Appropriate gamification elements include:

- Progress trails.
- Checkpoints.
- Milestone indicators.
- Completion badges.
- Challenge status.
- Achievement summaries.

Gamification must not obscure assessment instructions or encourage misleading comparisons between candidates.

---

# 26. Assessment Results

Assessment Results displays outcomes that the system has calculated and made available to the candidate.

## Suggested Content

- Assessment title.
- Completion status.
- Score, if provided.
- Competency-level feedback, if available.
- Submission date.
- Relevant next steps.

## Rules

- Do not invent scores or competency ratings.
- Do not expose internal evaluation notes unless authorized for candidate viewing.
- Clearly distinguish pending evaluation from a completed result.
- Explain unavailable results when appropriate.
- Present numeric scores with sufficient context.
- Avoid implying that a single assessment score guarantees a recruitment decision.

---

# 27. Application Tracking

Application Tracking provides candidates with a clear view of their recruitment progress.

## Status Design

The interface should use the actual application statuses supported by the backend.

Possible examples include:

- Submitted.
- Under Review.
- Assessment.
- Interview.
- Accepted.
- Rejected.
- Withdrawn.

These labels are illustrative until the backend workflow defines the official status set.

## Rules

- Keep status labels consistent across the application.
- Use both text and visual indicators.
- Provide a timestamp when reliable data is available.
- Explain the current state in plain language.
- Do not invent future milestones or completion dates.
- Do not imply a candidate has progressed to a stage without a corresponding system state.

---

# 28. Talent Acquisition Portal

The Talent Acquisition Portal is the operational workspace for recruitment personnel.

The design should emphasize information density, clarity, efficient navigation, and safe data management.

## 28.1 Overview

Provide a concise summary of recruitment activity.

Potential metrics:

- Published jobs.
- Total applications.
- Candidates in review.
- Assessments awaiting evaluation.
- Recent recruitment activity.

Only show metrics supported by real data.

## 28.2 Candidates

Features may include:

- Candidate list.
- Search.
- Filters.
- Candidate detail.
- Application history.
- Relevant assessment summaries.
- Authorized review actions.

Use pagination or another scalable loading strategy for large datasets.

## 28.3 Jobs

Features may include:

- Job list.
- Search and filters.
- Create job.
- Edit job.
- Publish or unpublish.
- Close job.
- View applications.

Destructive actions should require confirmation when appropriate.

## 28.4 Assessments

Features may include:

- Assessment list.
- Assessment detail.
- Challenge configuration.
- Competency mapping.
- Assessment availability and status.
- Result review where authorized.

Do not display a configuration as active unless it has been saved and activated successfully.

## 28.5 Competencies

Features may include:

- Competency list.
- Competency detail.
- Description.
- Assessment association.
- Criteria management, where supported.

Competency names and descriptions should remain consistent throughout the platform.

## 28.6 Users

Features may include:

- User list.
- Search and filtering.
- User detail.
- Account status.
- Role visibility and management where authorized.

The role model must remain limited to `CANDIDATE` and `TALENT_ACQUISITION`.

## 28.7 Talent Pool

The Talent Pool helps authorized recruitment personnel organize and revisit potential candidates.

Features may include:

- Candidate search.
- Relevant skills and competency summaries.
- Job or recruitment context.
- Saved candidate groups or tags, if supported.
- Access to candidate details.

Sensitive information must be handled according to authorization and applicable privacy requirements.

## 28.8 Analytics

Analytics should present recruitment information in a form that supports decisions.

Possible views include:

- Application volume.
- Recruitment stage distribution.
- Job performance.
- Assessment completion.
- Competency outcomes.
- Recruitment trends over time.

Charts must be based on real data and clearly labeled.

---

# 29. Dashboard and Analytics

## 29.1 Dashboard Hierarchy

A typical dashboard should follow this order:

1. Page title and primary action.
2. Summary metrics.
3. Main charts or operational summaries.
4. Recent activity or priority items.
5. Secondary details.

Adapt this hierarchy to the page's primary purpose.

## 29.2 Metric Cards

Each metric card should contain:

- A concise label.
- A value.
- Optional contextual description.
- An optional trend only when the comparison is meaningful and calculated.

Do not show arbitrary percentages, invented growth indicators, or unsupported comparisons.

## 29.3 Charts

- Provide meaningful titles.
- Label axes and units where applicable.
- Use consistent color semantics.
- Provide text or tabular alternatives where practical.
- Ensure the chart remains readable on smaller screens.
- Avoid misleading scales.
- Display loading, empty, and error states.

---

# 30. Tables and Data Views

Tables are appropriate for candidate, job, user, application, assessment, and competency management.

## Table Requirements

- Clear column headings.
- Consistent row spacing.
- Readable text.
- Appropriate alignment.
- Visible row or action states.
- Pagination or another scalable strategy.
- Search and filtering when needed.
- Empty, loading, and error states.

## Table Actions

Common actions may include:

- View.
- Edit.
- Review.
- Change status.
- Delete, when authorized.

Keep row actions grouped and avoid overcrowding each row with buttons.

On mobile, use responsive tables, horizontal scrolling with clear affordances, or card-based alternatives where more appropriate.

Never expose sensitive information in a table solely because it is convenient to display.

---

# 31. Feedback and Notifications

The application must communicate the result of user actions.

## Feedback Types

- Success.
- Error.
- Warning.
- Informational.
- Loading.
- Empty state.

## Rules

- Use concise, understandable messages.
- Explain what happened.
- Provide a next step when possible.
- Avoid exposing internal server errors.
- Do not display success before the operation succeeds.
- Keep important validation errors close to the affected field.
- Use toasts for brief confirmations, not for information that must remain visible.
- Use dialogs for decisions that require explicit confirmation.

Notifications must not become the only way users can access important status information.

---

# 32. Responsive Design

The platform must support mobile, tablet, and desktop layouts.

## 32.1 Mobile

Priorities:

- Single-column content where appropriate.
- Compact navigation.
- Readable typography.
- Touch-friendly controls.
- Clear form layouts.
- Minimal horizontal scrolling.
- Visible primary actions.

## 32.2 Tablet

Priorities:

- Flexible grids.
- Efficient use of available width.
- Navigation that adapts to intermediate screen sizes.
- Readable tables and dashboards.

## 32.3 Desktop

Priorities:

- Centered content containers.
- Sidebar navigation for dashboards.
- Multi-column content where useful.
- Efficient use of horizontal space.
- Consistent alignment and spacing.

## 32.4 Responsive Rules

- Avoid fixed widths that cause overflow.
- Avoid fixed heights for content that may wrap.
- Use responsive image dimensions.
- Test long job titles and candidate names.
- Ensure dialogs fit within the viewport.
- Ensure mobile navigation can be operated with a keyboard and screen reader.
- Do not hide essential functionality on mobile.

---

# 33. Accessibility

Accessibility is a core requirement.

## 33.1 Semantic Structure

- Use semantic HTML elements.
- Maintain a logical heading hierarchy.
- Use buttons for actions.
- Use links for navigation.
- Associate form labels with inputs.
- Provide accessible names for icon-only controls.

## 33.2 Keyboard Navigation

- All interactive elements must be keyboard accessible.
- Focus states must be clearly visible.
- Focus order must be logical.
- Dialogs must manage focus appropriately.
- Keyboard users must be able to open, operate, and close interactive components.

## 33.3 Color Contrast

- Maintain sufficient contrast for text and controls.
- Do not use color as the only status indicator.
- Check text on navy and amber surfaces separately.
- Verify disabled states remain understandable.

## 33.4 Motion

- Respect `prefers-reduced-motion`.
- Avoid flashing effects.
- Avoid motion that blocks task completion.
- Ensure important information is available even when animations are disabled.

## 33.5 Assessment Accessibility

- Instructions must be readable.
- Controls must have accessible labels.
- Validation feedback must be announced appropriately.
- Timed assessments should communicate the time limit and relevant warnings when timing is part of the assessment design.
- Do not use motion or color as the only indication of assessment progress.

---

# 34. Motion and Interaction

Motion should reinforce the experience rather than distract from it.

## 34.1 Suitable Motion

- Subtle hover transitions.
- Button state transitions.
- Small card elevation changes.
- Trail drawing in the homepage hero.
- Progress indicator updates.
- Smooth disclosure of menus and dialogs.

## 34.2 Duration

Recommended guidelines:

- Small UI transitions: approximately 120–200 ms.
- Standard transitions: approximately 180–280 ms.
- Larger decorative sequences: use sparingly and keep them short enough to avoid delaying interaction.

## 34.3 Trail Animation

The homepage trail animation should:

- Draw attention to the route without delaying access to content.
- Avoid looping indefinitely without purpose.
- Work without JavaScript where practical.
- Respect reduced-motion preferences.
- Avoid conflicting duplicate definitions.

If `.trail-draw` is defined in `app/page.tsx`, do not maintain a conflicting global definition in `app/globals.css`. Keep one authoritative definition unless a deliberate shared animation utility is required.

## 34.4 Interaction Rules

- Every interactive element needs a clear response.
- Hover effects must not be the only indication of interactivity.
- Loading animations must correspond to a real pending operation.
- Disable or guard duplicate submissions.
- Avoid motion that causes layout shifts.
- Do not sacrifice usability for decorative animation.

---

# 35. Component Architecture

The frontend should use reusable components where they provide consistency and reduce duplication.

## 35.1 Shared UI Components

Potential shared components:

- Button.
- Input.
- Textarea.
- Select.
- Checkbox.
- Radio group.
- Badge.
- Card.
- Modal / Dialog.
- Dropdown.
- Tabs.
- Tooltip.
- Toast / Notification.
- Skeleton.
- Empty State.
- Loading State.
- Pagination.
- Table.
- Breadcrumb.
- Progress Indicator.

## 35.2 Product Components

Potential product-specific components:

- Public Navbar.
- Public Footer.
- Job Card.
- Job Filters.
- Job Status Badge.
- Candidate Summary Card.
- Application Status Timeline.
- Talent Quest Trail.
- Challenge Card.
- Assessment Progress.
- Assessment Question.
- Assessment Result Summary.
- Dashboard Metric Card.
- Recruitment Activity List.

## 35.3 Reuse Rules

- Reuse components when the same interaction or visual pattern appears across pages.
- Keep component APIs small and predictable.
- Avoid creating an abstraction for a one-off decorative element unless it improves maintainability.
- Keep business logic separate from presentation where practical.
- Use shared tokens instead of duplicating color values.
- Use consistent component states.

## 35.4 Public Homepage Exception

The public homepage may use page-specific Tailwind classes and custom SVG elements where they are appropriate for the composition.

Not every decorative element needs to become a shared component.

The goal is consistent, maintainable code—not abstraction for its own sake.

---

# 36. Design Tokens

Use the existing global CSS theme as the primary source of design tokens.

The following CSS illustrates the intended palette and naming. Adapt it to the existing `app/globals.css` rather than duplicating token declarations.

```css
:root {
  --brand-navy: #0B1B3D;
  --brand-navy-accent: #142952;
  --brand-amber: #D97706;
  --warm-amber: #F59E0B;

  --background: #F8F9FA;
  --surface: #FFFFFF;
  --foreground: #0F172A;
  --muted: #64748B;
  --border: #E2E8F0;

  --success: #16A34A;
  --warning: #D97706;
  --error: #DC2626;
  --info: #0284C7;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;
}
```

## 36.1 Token Rules

- Keep the global stylesheet as the source of truth.
- Avoid redefining the same token in multiple places.
- Use semantic token names for reusable components.
- Use explicit brand colors for intentional brand-specific visuals.
- Do not create multiple tokens for the same purpose without a documented distinction.
- Verify token values against the current homepage before changing them.

## 36.2 Tailwind CSS

The project uses Tailwind CSS v4.

Keep the existing v4 configuration approach, including `@import "tailwindcss";` and the project's `@theme inline` setup, where already implemented.

Do not introduce an incompatible Tailwind v3 configuration pattern without intentionally migrating the project.

---

# 37. Implementation Rules

## 37.1 Framework

- Next.js App Router.
- TypeScript.
- Tailwind CSS v4.
- Lucide React.
- Shared global design tokens.

## 37.2 Typography

Plus Jakarta Sans is the primary application font.

Do not accidentally override the global font with an unrelated default font class in `app/layout.tsx`.

## 37.3 Images

- Store local public assets under `public/`.
- Use appropriate image optimization.
- Preserve image aspect ratios.
- Avoid broken or fabricated asset paths.
- Provide alternative text.

## 37.4 Server and Client Components

- Prefer Server Components when interactivity is unnecessary.
- Use Client Components for stateful controls and browser-dependent interaction.
- Add `"use client"` only when required.
- Keep client-side bundles focused.

## 37.5 API Integration

- Use actual API responses for production data.
- Handle loading, empty, and error states.
- Validate user input.
- Enforce authorization on the server.
- Avoid exposing secrets or sensitive configuration in client-side code.
- Do not treat frontend validation as a substitute for backend validation.

## 37.6 Data Integrity

- Do not fabricate candidates, jobs, application statuses, assessment results, or analytics.
- Clearly label development fixtures and mock data.
- Do not present mock data as real recruitment activity.
- Ensure UI states reflect successful backend operations.

## 37.7 Code Quality

- Keep TypeScript types explicit where useful.
- Avoid unnecessary `any`.
- Use predictable component props.
- Maintain consistent naming conventions.
- Remove unused code and conflicting styles.
- Keep business rules consistent across pages.

## 37.8 Design Consistency

- Use the defined color palette.
- Use Plus Jakarta Sans.
- Use consistent spacing, radius, and typography.
- Use Lucide React for interface icons.
- Avoid arbitrary visual styles that conflict with the design system.
- Update this document when a deliberate design-system change is approved.

---

# 38. Definition of Done

A page or component is considered complete when it satisfies the applicable criteria below.

## Visual Quality

- [ ] Uses the approved Navy + Amber design direction.
- [ ] Uses Plus Jakarta Sans.
- [ ] Maintains consistent spacing and typography.
- [ ] Uses the correct component and button hierarchy.
- [ ] Contains no unintended overflow or broken layout.
- [ ] Works at mobile, tablet, and desktop sizes.

## Functionality

- [ ] Interactive controls perform their intended actions.
- [ ] Navigation destinations are valid.
- [ ] Forms validate input and show understandable feedback.
- [ ] Loading, empty, and error states are handled.
- [ ] Destructive actions are appropriately guarded.
- [ ] Displayed data matches the actual application state.

## Accessibility

- [ ] Semantic HTML is used appropriately.
- [ ] Interactive elements support keyboard navigation.
- [ ] Focus states are visible.
- [ ] Inputs have accessible labels.
- [ ] Status information is not communicated through color alone.
- [ ] Reduced-motion preferences are respected where applicable.

## Security and Permissions

- [ ] Candidate and Talent Acquisition permissions are enforced.
- [ ] Protected data is not exposed to unauthorized users.
- [ ] Frontend role checks are not treated as the only security layer.
- [ ] Sensitive information is not unnecessarily displayed.

## Code Quality

- [ ] TypeScript checks pass.
- [ ] Lint checks pass where configured.
- [ ] No avoidable console errors remain.
- [ ] No conflicting duplicate style definitions remain.
- [ ] Components are reused where appropriate.
- [ ] Design tokens are used consistently.

## Documentation

- [ ] Implemented features are distinguished from planned features.
- [ ] Any intentional deviation from the design system is documented.
- [ ] New shared components follow the established conventions.
- [ ] Changes to roles, navigation, or application workflow are reflected in this document.

---

# Final Design Rule

EIGER Talent Quest should feel like a professional recruitment platform with an adventure-inspired identity.

**Navy establishes trust. Amber highlights progress. Clear typography and structured layouts keep the experience professional. Trail-inspired visuals make Talent Quest distinctive without compromising usability.**

Every new page should follow this design system unless a deliberate, documented design decision changes it.
