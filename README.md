# Reflex

> **Reflex** is a real-time observability and reaction platform built specifically for Chrome extension developers. It helps you catch errors, detect user complaints, and react instantly when things break — all with developer-first tooling and a simple SDK.

---

## 🧭 Project Overview

Reflex is the **Sentry for Chrome extensions**, offering lightweight SDK integration, an intuitive dashboard, automated alerts, and eventual support for full-stack apps. Built with:

* **Frontend**: Next.js + Tailwind (Vercel)
* **Backend**: FastAPI + Kafka + Celery (Fly.io)
* **Database/Auth**: Supabase (Postgres, JWT auth)
* **Billing**: Stripe (Pro and Team tiers)
* **Async/Eventing**: Redpanda (Kafka-compatible), Celery

This monorepo uses a modern scalable structure with `apps/web` and `apps/backend`, supported by Docker, GitHub Actions, and design-first AI development using [Cursor](https://cursor.so) and [Tempo](https://usetempo.co).

---

## 📁 Project Structure

```bash
reflex/
├── apps/
│   ├── web/         # Next.js frontend (dashboard)
│   └── backend/     # FastAPI API, Kafka, Celery workers
├── reflex-landing/  # Public marketing site (Vercel-hosted)
├── infra/           # Docker Compose, Fly.io config
├── docs/
│   ├── ui-guidelines.md
│   └── ai-prompts.md
├── prompts/         # Prompt templates for Cursor & Tempo (optional)
├── README.md
└── .gitignore
```

---

## 🎯 Core Features

* **SDK-based log ingestion** for Chrome extensions
* **Logs dashboard** with metadata filtering
* **AI-driven complaint clustering**
* **Zapier-style Reactions builder** (e.g., alert on event spikes)
* **Slack/webhook/email alerts**
* **Usage-based pricing tiers via Stripe**

---

## 🛣 Roadmap

### ✅ MVP 1.0 – Core Observability for Chrome Extensions

* [x] Log ingestion API & SDK
* [x] Reactions: spike detection
* [x] Complaint reporting & grouping
* [x] Supabase auth + project scoping
* [x] Dashboard UI
* [x] Stripe billing

### 🔜 MVP 1.2 – Alerts + Docs

* [ ] Email/webhook alert delivery
* [ ] Project settings UI
* [ ] Usage quota meter
* [ ] Stripe Pro/Team upgrade flow
* [ ] Hosted docs with SDK usage examples

### 🔜 MVP 1.5 – Smart Reactions + Feedback Loop

* [ ] Session replay (Pro+)
* [ ] Feature flag toggles (via webhook)
* [ ] DOM mutation detection (for extensions interacting with web apps)

### 🔮 Reflex 2.0 – Full App Observability Support

* [ ] Support `sourceType = web-app` or mobile
* [ ] Prometheus/Grafana integration
* [ ] Kubernetes metrics ingestion
* [ ] Multi-signal UI (logs + metrics + alerts)

---

## 💰 Monetization Strategy

Reflex will monetize via SaaS tiers:

| Tier | Price      | Features                                                     |
| ---- | ---------- | ------------------------------------------------------------ |
| Free | \$0/month  | Log dashboard, complaints                                    |
| Pro  | \$10/month | Reactions, email/webhook alerts                              |
| Team | \$25/month | Slack integration, session replay, clustering, feature flags |

Additional revenue opportunities:

* Dogfood Reflex inside [AutoNote](https://github.com/your/autonote-extension)
* Bundled observability + QA tools for small dev teams
* Open-core SDK with hosted plan upsells

---

## 🚀 Deployment & Development

### Local Development

1. **Clone repo:**
   ```bash
   git clone https://github.com/your/reflex
   cd reflex
   ```
2. **Copy and fill env files:**
   - Copy `.env.template` to `.env` in both `apps/web/` and `apps/backend/`.
   - Fill in Supabase keys and any test user credentials.
3. **Run Supabase migrations:**
   ```bash
   supabase db reset --project-ref <your-project-ref> --file supabase/migrations/0001_initial.sql
   # Optionally seed data
   supabase db execute --file supabase/seed.sql
   ```
4. **Start local stack:**
   ```bash
   docker-compose up --build
   ```
   - This runs frontend, backend, Postgres, and Redis (for Celery).

### CI/CD Deployment

- **Frontend:**
  - Lint, test, and coverage enforced in `.github/workflows/ci-frontend.yml`.
  - Deploys to Vercel via `.github/workflows/cd-frontend.yml`.
- **Backend:**
  - Lint, test, and coverage enforced in `.github/workflows/ci-backend.yml`.
  - Deploys to Fly.io via `.github/workflows/cd-backend.yml`.
- **Secrets:**
  - All secrets (Supabase, Vercel, Fly.io) are managed in GitHub repo settings.

### Redis for Celery
- Redis is included in Docker Compose for Celery background jobs (even if stubbed for now).
- You can add Celery workers as you implement background processing.

---

## 🚀 Getting Started

1. Clone repo: `git clone https://github.com/your/reflex`
2. Copy `.env.template` → `.env`
3. Run dev stack:

```bash
cd infra && docker-compose up --build
```

4. Launch frontend via Vercel (from `apps/web/`)

---

## 🧠 AI-Assisted Development

Reflex uses design-first collaboration with:

* [Cursor](https://cursor.so) → for backend scaffolding, logic, workers
* [Tempo](https://usetempo.co) → for dashboard + landing UI scaffolding

📄 See [`docs/ai-prompts.md`](./docs/ai-prompts.md) for complete Tempo + Cursor prompts.

---

## 🗺 Next Steps

* [ ] Add live dashboard preview to landing page
* [ ] Run internal beta using AutoNote
* [ ] Launch on Product Hunt
* [ ] Outreach to top Chrome extension devs on Reddit/GitHub

---

## 📫 Contact / Follow

* GitHub: [@yourhandle](https://github.com/yourhandle)
* Twitter: [@reflex\_dev](https://twitter.com/reflex_dev)
* Email: `founder@reflex.dev`





# Reflex Frontend UI Design Guidelines (for Cursor)

This file is intended to guide Cursor through **design-first collaboration** while developing the Reflex UI.  
Reflex is a real-time observability tool for Chrome extension developers, and its UI must reflect speed, clarity, and developer-first intent.

---

## 🧠 Design-First Collaboration Mode (Required)

When working on any Reflex UI component:

- 🛑 **DO NOT write JSX or Tailwind code until:**
  1. You've described the layout in plain language
  2. You've provided a basic wireframe or component outline (Markdown or ASCII is fine)
  3. You've asked for confirmation or feedback

- ✅ Once approved, begin writing clean, reusable Tailwind components following the guidelines below.

---

### Example UI Prompt Format (for Cursor)

# 🧠 Reflex AI-Driven Dev Prompts (Frontend & Backend)

This section defines the exact prompts used with **Tempo** (frontend UI) and **Cursor** (backend logic).  
These are optimized for building Reflex as a fast, developer-first observability tool.

---

## 🧩 Frontend Prompt (Tempo)

Use this prompt in **Tempo** to scaffold or iterate the Reflex frontend UI (`apps/web/`):

```txt
Build a Next.js frontend for a dashboard-based observability app called Reflex. Include:

- Sidebar nav: Projects, Logs, Reactions, Complaints, Billing
- Project selector dropdown
- Logs viewer with table + filters
- Reactions config UI (Zapier-style builder: event, threshold, action)
- Complaint grouping UI (clustered view)
- Billing tab with Free, Pro, Team plans (Stripe)
- Supabase auth: email/password login/signup
- TailwindCSS, dark mode, responsive layout

Context: Backend is a FastAPI app with REST endpoints. Each route is protected by Supabase auth tokens and scoped to the user's projects.

API Routes:
- GET /api/projects
- GET /api/logs?projectId=...
- GET /api/complaints?projectId=...
- POST /api/reactions
- GET /api/reactions

Use fetch or useSWR to query APIs. Do not hardcode responses. Keep layout developer-focused like Supabase or Sentry.


[Cursor Prompt – Reflex Backend MVP]

Build the backend for Reflex, a real-time observability tool for Chrome extensions. Use FastAPI as the web framework. The backend handles log ingestion, user project management, reactions, and complaint grouping.

Key requirements:

- POST /api/log  
  Accepts: projectId, event, sourceType, timestamp, metadata  
  Pushes raw log into Kafka topic: logs_raw

- GET /api/logs  
  Returns logs from Postgres, filtered by projectId, eventType, time range, sourceType  
  Auth required via Supabase token

- POST /api/reactions  
  Save a reaction rule: "if event X happens Y times in Z minutes → trigger action"

- GET /api/reactions  
  List all saved reaction rules for a project

- GET /api/complaints  
  Returns grouped user complaints (clustered by content similarity)

- POST /api/stripe/webhook  
  Stripe webhook endpoint to update user billing tier in Supabase

- Use Kafka (Redpanda) to ingest logs, Postgres to store structured logs
- Use Celery to run background workers for:
  - reaction triggering
  - complaint clustering

- Use Supabase to manage:
  - Auth (via JWTs)
  - users, projects, logs, reactions, subscriptions tables

All API routes are authenticated. Use dependency injection for user/project scoping.

Reflex's frontend (already built in apps/web) uses the following API routes:

- GET /api/projects
- GET /api/logs?projectId=...
- GET /api/complaints?projectId=...
- POST /api/reactions
- GET /api/reactions

All responses are expected to be JSON, with Supabase JWT-authenticated users.
The frontend uses fetch or SWR to query the API.

This backend must fulfill those needs, with proper project scoping and error handling.


Please generate the initial file structure for the Reflex backend using FastAPI + Kafka + Supabase. It should include:

- /routers (API route modules: logs, reactions, complaints)
- /schemas (Pydantic models for request/response)
- /services (business logic, Kafka producers)
- /workers (Celery tasks for reactions and clustering)
- main.py (entrypoint)
- Dockerfile for FastAPI
- requirements.txt
- utils/auth.py (decode Supabase JWT)

Make it compatible with the frontend in apps/web.

📁 Folder structure:
All backend code goes in `apps/backend/`.

Create these folders:
- `routers/`: FastAPI route modules
- `schemas/`: Pydantic request/response models
- `services/`: Kafka logic and DB interfaces
- `workers/`: Celery tasks (reactions, clustering)
- `utils/`: auth utils (JWT decoding, Supabase verification)

Also include:
- `main.py` as the FastAPI entrypoint
- `Dockerfile` to run the API
- `requirements.txt` with all dependencies

The frontend (`apps/web/`) will call these endpoints, so match the data contracts and enforce Supabase auth on every route.



help for improving front end health for app:


Convert any component that uses `onClick`, `useState`, or other browser events into a proper Client Component.

Wrap them with `"use client"` at the top and move them into the `components/` directory inside `apps/web/`.

Check all components generated by Tempo for this issue and ensure they are compatible with Next.js App Router.
