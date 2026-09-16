# EIGER Talent Quest — UI/UX Design Specification

## 1. Product Design Direction

EIGER Talent Quest is a gamified Talent Acquisition platform integrated with the EIGER career experience.

The design must balance two different experiences:

### Candidate

The experience should feel:

**Simple + Engaging + Adventurous**

### Talent Acquisition

The experience should feel:

**Efficient + Analytical + Organized**

The product should feel like a professional recruitment platform with an outdoor/adventure identity, not a conventional SaaS dashboard and not a children's game.

---

# 2. Design Principles

## 2.1 Human-Centered

Every screen should make the user's next action obvious.

Avoid unnecessary controls and information.

---

## 2.2 Clear Hierarchy

Important information must be visually prioritized.

Use:

1. Page title
2. Primary information
3. Supporting information
4. Primary action
5. Secondary actions

---

## 2.3 Minimal Cognitive Load

Candidate flows should avoid overwhelming users.

Especially during:

* Application
* Profile completion
* Assessment
* Result review

---

## 2.4 Functional First

Visual decoration must never interfere with:

* Navigation
* Reading
* Form completion
* Assessment decisions
* Data analysis

---

## 2.5 Consistency

Components must behave consistently across the application.

Buttons, badges, inputs, cards, tables, statuses, spacing, and typography must use shared design tokens.

---

# 3. Visual Identity

## 3.1 Color Direction

Primary background:

* Warm white
* Off-white

Primary text:

* Dark charcoal

Primary accent:

* Forest green
* Olive green

Secondary accent:

* Muted orange
* Warm yellow

The palette should feel inspired by:

* Forest
* Mountain
* Earth
* Trail
* Outdoor equipment

Avoid highly saturated neon colors.

---

## 3.2 Suggested Design Tokens

The exact values may be refined during implementation, but the visual hierarchy should remain consistent.

```text
Background:
#F7F5EF

Surface:
#FFFFFF

Primary:
#24352B

Primary Accent:
#3F5A43

Secondary:
#B86F32

Warm Accent:
#C7A34A

Text:
#1D211E

Muted Text:
#6C716D

Border:
#DDDCD5

Success:
#3F7D52

Warning:
#B7862D

Error:
#B64A43
```

Do not introduce additional colors without a clear semantic purpose.

---

# 4. Typography

Typography should be modern, readable, and editorial.

Recommended structure:

```text
Display
Large marketing headlines

Heading 1
Main page title

Heading 2
Section title

Heading 3
Card / subsection title

Body
Main content

Small
Supporting metadata

Caption
Secondary information
```

Typography must prioritize readability over decorative styling.

Avoid excessive uppercase text.

---

# 5. Spacing

Use a consistent spacing scale.

Recommended base:

```text
4px
8px
12px
16px
24px
32px
48px
64px
80px
96px
```

Large spacing should be used between major sections.

---

# 6. Border Radius

The interface should not rely on excessive rounded cards.

Recommended:

```text
Small components:
6px

Inputs:
8px

Cards:
10px

Large sections:
12px
```

Avoid extremely rounded interfaces such as:

```text
rounded-full
```

unless the component is intentionally circular or pill-shaped.

---

# 7. Shadows

Use subtle shadows only when needed.

Avoid:

* Heavy shadows
* Floating neon effects
* Excessive elevation

The interface should primarily rely on:

* Contrast
* Borders
* Spacing
* Typography

---

# 8. Buttons

## Primary Button

Used for the main action.

Examples:

```text
Explore Jobs
Apply Now
Start Talent Quest
Save
Publish Job
```

Primary buttons should have strong contrast and clear labels.

---

## Secondary Button

Used for supporting actions.

Examples:

```text
View Job
Preview
Cancel
Save Draft
```

---

## Destructive Button

Used for destructive actions.

Examples:

```text
Reject
Deactivate
Delete
```

Destructive actions must require clear user confirmation where appropriate.

---

# 9. Candidate Experience

## Navigation

Candidate navigation should be simple.

Recommended:

```text
EIGER CAREERS

Jobs
Talent Quest
My Applications
Profile

[Profile / Account]
```

Mobile navigation should collapse into a compact menu.

---

# 10. Candidate Screens

## Screen 01 — Career Homepage

Hero:

```text
EIGER CAREERS

Find your next adventure.

Explore opportunities, discover your potential,
and take the next step with EIGER.

[ Explore Jobs ]
[ Take Talent Quest ]
```

Sections:

* Featured Jobs
* Why EIGER
* Our Culture
* How Recruitment Works

Talent Quest must feel like part of the career journey.

It must not look like an unrelated gaming product.

---

# 11. Job Listing

Header:

```text
Find Your Opportunity
```

Filters:

* Search
* Location
* Department
* Employment Type
* Experience Level

Job cards:

```text
Job Title
Department
Location
Employment Type

Short description

Required competencies

[ View Job ]
```

Desktop may use a two-column layout.

Mobile should use a single-column list.

---

# 12. Job Detail

Hierarchy:

```text
Job Title
Department
Location
Employment Type

About the Role

Responsibilities

Requirements

Required Competencies

EIGER Talent Quest
```

Assessment information:

```text
Complete the Talent Quest assessment
as part of your application process.
```

Primary CTA:

```text
Apply Now
```

---

# 13. Authentication

Authentication screens must remain visually simple.

Login:

```text
Email
Password
Remember me

[ Login ]
```

Register:

```text
Full Name
Email
Password
Confirm Password

[ Create Account ]
```

Branding should be subtle.

Do not turn authentication into a marketing-heavy screen.

---

# 14. Candidate Profile

Sections:

```text
Personal Information
Contact Information
Education
Experience
Skills
Resume
```

Profile completion:

```text
Profile
████████░░ 80%
```

The completion indicator should clearly communicate remaining work.

---

# 15. Talent Quest Introduction

This screen acts as the transition between recruitment and assessment.

Headline:

```text
Your Adventure Starts Here
```

Description:

```text
Get to know how you think, adapt, and solve problems
through a series of interactive challenges.
```

Challenge cards:

```text
01 Problem Solving
02 Decision Making
03 Collaboration
04 Adaptability
```

Information:

```text
Estimated time
Number of challenges
Assessment rules
```

Primary CTA:

```text
Start Talent Quest
```

---

# 16. Gamified Assessment

The assessment should feel interactive but professional.

## Layout

Top:

```text
Progress
Challenge 02 / 04
Timer
```

Main:

```text
Scenario

Question / Decision

A. ...
B. ...
C. ...
D. ...
```

Bottom:

```text
[ Confirm Decision ]
```

The interface should avoid:

* Character avatars
* Coins
* Excessive animations
* XP bars
* Loot boxes
* Neon effects
* Arcade-style graphics

Gamification should come primarily from:

* Scenario progression
* Decision making
* Progress
* Feedback
* Narrative
* Challenge structure

---

# 17. Assessment Result

Header:

```text
Your Talent Profile
```

Overall score:

```text
91%
```

Competencies:

```text
Problem Solving       91
Decision Making       86
Adaptability          89
Collaboration         87
Creativity            93
```

Behavioral insights:

```text
Strong problem-solving and creative thinking.

Shows high adaptability when facing
changing situations.
```

The result must never state:

```text
You are hired.
You passed.
You failed.
```

Instead use:

```text
These results provide insights into your strengths.
```

---

# 18. Application Status

Timeline:

```text
✓ Application Submitted
        ↓
✓ Assessment Completed
        ↓
● Under Review
        ↓
○ Interview
        ↓
○ Final Decision
```

Current state must be visually distinct.

Avoid ambiguous colors.

---

# 19. Talent Acquisition Experience

The TA interface is desktop-first.

Recommended structure:

```text
┌──────────────────────────────┐
│ EIGER Talent Quest           │
├──────────────┬───────────────┤
│ Overview     │               │
│ Candidates   │ Main Content  │
│ Jobs         │               │
│ Assessments  │               │
│ Competencies │               │
│ Users        │               │
│ Talent Pool  │               │
│ Analytics    │               │
└──────────────┴───────────────┘
```

---

# 20. TA Dashboard

Header:

```text
Good morning, TA Team
```

Summary:

```text
Active Jobs             12
Total Candidates        348
Assessment Completed    251
Shortlisted             42
```

Pipeline:

```text
Applied
   ↓
Assessment
   ↓
Review
   ↓
Interview
   ↓
Hired
```

Additional sections:

* Recent candidates
* Assessment completion
* Top talent
* Open positions

---

# 21. Candidate Management

Use a data table.

Columns:

```text
Candidate
Position
Assessment
Top Competency
Status
Action
```

Example:

```text
Andi Pratama
Product Designer
91%
Creativity
Review
```

Features:

* Search
* Position filter
* Score filter
* Competency filter
* Status filter
* Sorting
* Pagination

Mobile behavior:

Convert the table into stacked candidate cards.

---

# 22. Candidate Detail

Header:

```text
ANDI PRATAMA

Product Designer Applicant
```

Assessment:

```text
Overall Assessment
91%
```

Competency profile:

```text
Problem Solving     91
Creativity          94
Adaptability        89
Collaboration       87
Decision Making     86
```

Behavioral insights:

```text
Strong creative problem solving
High adaptability
Strong collaboration
Good decision making
```

Application information:

```text
Applied Position
Application Date
Assessment Status
Current Recruitment Stage
```

TA actions:

```text
[ Shortlist ]
[ Move to Interview ]
[ Hold ]
[ Reject ]
```

Include activity timeline below the primary candidate information.

---

# 23. Job Management

Tabs:

```text
Active Jobs
Drafts
Closed Jobs
```

Table:

```text
Job Title
Department
Location
Applicants
Assessment
Status
```

Create Job:

```text
Job Title
Department
Location
Description
Requirements
Required Competencies
Assign Assessment
Application Deadline
```

Actions:

```text
[ Save Draft ]
[ Publish Job ]
```

---

# 24. Assessment Management

List:

```text
Assessment Name
Target Role
Challenges
Competencies
Status
```

Example:

```text
EIGER Explorer
Product Designer
4 Challenges
4 Competencies
Published
```

CTA:

```text
Create Assessment
```

---

# 25. Assessment Builder

Builder structure:

```text
Assessment Name

Objective

Competencies

Problem Solving       30%
Adaptability          25%
Decision Making       25%
Collaboration         20%

Challenges

01 Problem Solving
02 Decision Making
03 Collaboration
04 Adaptability
```

Actions:

```text
[ Add Challenge ]
[ Save ]
[ Preview ]
[ Publish ]
```

---

# 26. Challenge Builder

Fields:

```text
Challenge Name

Scenario

Question

Options / Actions

Behavioral Indicator

Competency

Score / Weight
```

Example:

```text
Competency:
Problem Solving

Scenario:
An unexpected issue occurs during a product launch.

Options:
A
B
C
D

Behavioral Indicators:
Analytical Thinking
Decision Quality
Prioritization
```

Actions:

```text
[ Preview Challenge ]
[ Save Challenge ]
```

---

# 27. Competency Management

Initial competencies:

```text
Problem Solving
Decision Making
Adaptability
Collaboration
Creativity
Communication
```

Detail:

```text
Name

Description

Behavioral Indicators

Assessment Mapping
```

Example:

```text
Problem Solving

Ability to analyze problems and
determine effective solutions.

Behavioral Indicators:

Analytical Thinking
Logical Reasoning
Decision Quality
```

---

# 28. User Management

Only two roles exist:

```text
Candidate
Talent Acquisition
```

Table:

```text
User
Email
Role
Status
Last Activity
```

Actions:

```text
View
Edit
Deactivate
```

Never introduce:

```text
Admin
Super Admin
Recruiter Admin
System Admin
```

as additional application roles.

---

# 29. Talent Pool

Purpose:

Find candidates using competency-based filters.

Filters:

```text
Position
Competency
Assessment Score
Experience
Status
```

Example:

```text
Product Designer

Problem Solving > 80
Creativity > 85
Adaptability > 75
```

Results:

```text
Candidate A — 94%
Candidate B — 91%
Candidate C — 87%
```

---

# 30. Analytics

Recruitment funnel:

```text
Applicants
   ↓
Assessment
   ↓
Review
   ↓
Interview
   ↓
Hired
```

Assessment analytics:

* Completion Rate
* Average Score
* Average Time
* Competency Distribution

Charts must be:

* Simple
* Readable
* Data-oriented
* Accessible

Avoid decorative charts that do not provide actionable information.

---

# 31. Responsive Rules

## Candidate

Mobile-first.

### Navigation

Desktop:

```text
Horizontal navigation
```

Mobile:

```text
Compact header
Menu / drawer
```

### Job Cards

Desktop:

```text
Horizontal / grid
```

Mobile:

```text
Single column
Full width
```

### Assessment

Mobile must preserve:

```text
Scenario
Options
Progress
Timer
CTA
```

without requiring excessive scrolling.

---

## TA

Desktop-first.

Tables may transform into cards on smaller screens.

Complex analytics should remain readable rather than simply shrinking.

---

# 32. Accessibility

Minimum requirements:

* Strong text contrast
* Visible focus states
* Keyboard-accessible controls
* Labels for form inputs
* Meaningful error messages
* Non-color-only status indicators
* Adequate touch target size
* Clear loading states

Do not rely only on green/red colors to communicate status.

---

# 33. Required Components

Create reusable components for:

```text
Button
Input
Select
Textarea
Card
JobCard
CandidateCard
Table
Badge
ProgressBar
CompetencyChart
Modal
Toast
Sidebar
Navbar
StatusIndicator
AssessmentOption
Timeline
EmptyState
LoadingState
ErrorState
```

---

# 34. Component Behavior

Components should support variants where appropriate.

Example:

```text
Button
├── primary
├── secondary
├── outline
├── destructive
└── ghost
```

Badge:

```text
success
warning
error
neutral
info
```

Status:

```text
submitted
assessment
review
interview
hired
rejected
hold
```

---

# 35. Motion

Motion should be subtle.

Allowed:

* Page transitions
* Button feedback
* Progress animation
* Assessment transitions
* Toast animation
* Modal transitions

Avoid:

* Excessive parallax
* Constant floating elements
* Game-like animations
* Distracting background effects

---

# 36. Design Rule

When a design decision conflicts with visual decoration and usability:

**Usability wins.**

When a design decision conflicts with gamification and recruitment clarity:

**Recruitment clarity wins.**

When a design decision conflicts with generic SaaS conventions and the established EIGER outdoor identity:

**Use the established EIGER Talent Quest design direction.**
