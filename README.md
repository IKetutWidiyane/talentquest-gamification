# EIGER Talent Quest

A gamified talent acquisition platform designed to support the recruitment process through interactive assessments and behavioral insights.

EIGER Talent Quest is designed as an extension of the EIGER career experience. Candidates can discover job opportunities, apply for positions, complete their profile, participate in Talent Quest assessments, and track their application status.

Talent Acquisition teams can manage candidates, job vacancies, assessments, challenges, competencies, talent pools, and recruitment analytics from a centralized dashboard.

---

## Overview

EIGER Talent Quest combines recruitment workflows with gamified assessment experiences to provide additional behavioral signals during candidate screening.

The platform has only two roles:

### Candidate

Candidates can:

* Browse job vacancies
* View job details
* Apply for jobs
* Manage their profile
* Upload resumes
* Complete Talent Quest assessments
* View assessment results
* Track application status

### Talent Acquisition

Talent Acquisition users have administrative access to recruitment features.

They can:

* Manage candidates
* Manage job vacancies
* Manage users
* Manage assessments
* Manage challenges
* Manage competencies
* Screen candidates
* Manage talent pools
* View recruitment analytics

There is intentionally **no separate Admin role**.

---

## Product Goals

The platform aims to:

1. Create a modern and engaging recruitment experience.
2. Reduce friction during candidate applications.
3. Introduce gamified assessment into the recruitment workflow.
4. Provide Talent Acquisition with additional behavioral signals.
5. Centralize candidate screening and assessment data.
6. Support competency-based talent discovery.
7. Provide recruitment analytics for decision support.

The assessment is intended to provide additional insights and does not independently determine whether a candidate is hired.

---

## Core User Journey

### Candidate

```text
Career Website
      ↓
Jobs
      ↓
Job Detail
      ↓
Apply
      ↓
Candidate Profile
      ↓
Talent Quest Introduction
      ↓
Gamified Assessment
      ↓
Assessment Result
      ↓
Application Status
```

### Talent Acquisition

```text
Login
  ↓
Dashboard
  ↓
Candidates
  ↓
Candidate Detail
  ↓
Assessment Results
  ↓
Screening
  ↓
Shortlist / Interview / Hold / Reject
```

### Configuration

```text
TA Dashboard
     ↓
Assessments
     ↓
Challenges
     ↓
Competencies
     ↓
Jobs
     ↓
Assign Assessment
     ↓
Publish
```

---

## Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Modern responsive UI architecture

### Backend

* Node.js
* Express.js
* REST API

### Database

* PostgreSQL
* Prisma ORM

### Development

* Git
* GitHub
* ESLint
* Prettier
* Environment variables

---

## Project Structure

```text
talentquest-gamification/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   └── public/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── utils/
│   │   ├── validators/
│   │   └── app.js
│   │
│   └── prisma/
│       ├── schema.prisma
│       ├── migrations/
│       └── seed.js
│
├── DESIGN.md
├── AGENTS.md
├── README.md
└── .gitignore
```

---

## Frontend Architecture

The frontend uses Next.js and follows a feature-oriented structure.

```text
frontend/
├── app/
│   ├── (candidate)/
│   │   ├── jobs/
│   │   ├── application/
│   │   ├── talent-quest/
│   │   ├── profile/
│   │   └── status/
│   │
│   ├── (ta)/
│   │   ├── dashboard/
│   │   ├── candidates/
│   │   ├── jobs/
│   │   ├── assessments/
│   │   ├── competencies/
│   │   ├── users/
│   │   ├── talent-pool/
│   │   └── analytics/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── assessment/
│   ├── candidates/
│   └── jobs/
│
├── features/
│   ├── auth/
│   ├── jobs/
│   ├── applications/
│   ├── assessments/
│   ├── candidates/
│   ├── competencies/
│   └── analytics/
│
├── services/
├── hooks/
├── lib/
└── types/
```

---

## Backend Architecture

The backend uses Express.js with a layered architecture.

```text
backend/
└── src/
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── routes/
    ├── services/
    ├── repositories/
    ├── validators/
    ├── utils/
    └── app.js
```

Responsibilities:

### Routes

Define API endpoints.

### Controllers

Handle HTTP requests and responses.

### Services

Contain business logic.

### Repositories

Handle database operations through Prisma.

### Validators

Validate request payloads.

### Middlewares

Handle:

* Authentication
* Authorization
* Error handling
* Request validation
* Logging

---

## Main Functional Modules

### Authentication

* Candidate registration
* Candidate login
* TA login
* Session/token management
* Password security
* Role-based authorization

### Jobs

* Job listing
* Job detail
* Job creation
* Job editing
* Job publishing
* Job closing
* Assessment assignment

### Applications

* Apply to job
* Application tracking
* Recruitment stages
* Application history

### Candidate Profile

* Personal information
* Contact information
* Education
* Experience
* Skills
* Resume

### Talent Quest

* Assessment introduction
* Challenge sequence
* Scenario-based decisions
* Progress tracking
* Timer
* Assessment submission

### Assessment

* Assessment creation
* Assessment builder
* Challenge builder
* Competency mapping
* Scoring configuration
* Assessment publishing

### Competencies

Examples:

* Problem Solving
* Decision Making
* Adaptability
* Collaboration
* Creativity
* Communication

### Talent Pool

Candidates can be discovered based on:

* Position
* Competencies
* Assessment score
* Experience
* Recruitment status

### Analytics

Examples:

* Candidate funnel
* Assessment completion rate
* Average assessment score
* Average completion time
* Competency distribution

---

## Assessment Concept

Talent Quest uses scenario-based challenges.

Example:

> You are part of a team preparing a product launch. An unexpected issue occurs one day before launch.

Possible actions:

```text
A. Solve the issue independently
B. Discuss with the team
C. Ask the manager for direction
D. Change the launch plan
```

Each option may
