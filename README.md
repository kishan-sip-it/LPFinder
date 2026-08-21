<div align="center">

# 🔎 LFPFinder / ReuniteFind

### A missing-person reporting platform built to help people find, report, and reunite.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-LFPFinder-6d5dfc?style=for-the-badge)](https://lpfinder.onrender.com/)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.6-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169e1?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/Drizzle-ORM-C5F74F?style=for-the-badge)](https://orm.drizzle.team/)

<br />

**🌐 [Open the Live Application](https://lpfinder.onrender.com/)**

</div>

---

## ✨ What is LFPFinder?

**LFPFinder (ReuniteFind)** is a full-stack web application for reporting and finding missing people.

The experience is built around two simple actions:

- 📝 **Report someone** — create and manage a missing-person report.
- 🔎 **Looking for someone** — browse public reports and look for a person.

The project combines a public discovery experience with authenticated report management and server-side role-based authorization.

---

## 🚀 Live Demo

### **[👉 Visit LFPFinder](https://lpfinder.onrender.com/)**

The application is deployed on **Render** with PostgreSQL hosted on **Supabase**.

> **Note:** The live deployment is a demo/production environment. Do not submit real sensitive personal information unless the deployment is explicitly configured for that purpose.

---

## 🎯 Core Features

| Feature | Status |
| --- | :---: |
| Custom landing page | ✅ |
| Public report browsing | ✅ |
| Public report details | ✅ |
| User registration & login | ✅ |
| JWT cookie authentication | ✅ |
| Finder / Reporter / Admin roles | ✅ |
| My Reports | ✅ |
| Ownership-based permissions | ✅ |
| Server-side authorization | ✅ |
| Admin-only case status changes | ✅ |
| Report creation / editing / deletion | ✅ |
| Production deployment | ✅ |

---

## 🛡️ Role-Based Access Control

LFPFinder uses three roles:

| Role | Access |
| --- | --- |
| 🔍 **Finder** | Browse and read reports only |
| 📝 **Reporter** | Create reports and edit/delete their own reports |
| 👑 **Admin** | Full report management + official status changes |

### Security rules

- Reporters **cannot** edit or delete another user's report.
- Finders **cannot** create, edit, or delete reports.
- Only admins can directly change the official case status.
- Authorization is enforced on the **server/API**, not just by hiding frontend buttons.
- Public registration creates a `reporter` account; users cannot register themselves as `admin`.

---

## 📌 Case Statuses

Every case can have one of three official statuses:

```text
🟡 missing
🔵 investigating
🟢 found
```

Only an administrator can directly change the official status.

---

## 🧰 Tech Stack

### Frontend

- **Next.js 16.2.6** — App Router
- **React 19.2.6**
- **TypeScript 5.9.3**
- **Tailwind CSS 4**

### Backend

- **Next.js Route Handlers / API routes**
- **JWT authentication** with `jose`
- **HTTP-only cookies**
- **bcryptjs** for password hashing

### Database

- **PostgreSQL**
- **Drizzle ORM 0.45.2**
- **pg** PostgreSQL driver
- **Supabase PostgreSQL** for the deployed database

### Deployment

- **Render** — Next.js application
- **Supabase** — PostgreSQL database

---

## 🗺️ Application Routes

### Public

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/browse` | Browse public reports |
| `/browse/[id]` | View a public report |
| `/login` | Login |

### Authenticated

| Route | Purpose |
| --- | --- |
| `/my-reports` | View the current user's reports |
| `/dashboard` | Dashboard |
| `/dashboard/persons/new` | Create a report |
| `/dashboard/persons/[id]` | Private report management |
| `/dashboard/persons/[id]/edit` | Edit an authorized report |

The redundant `/dashboard/persons` listing route has been removed.

---

## 🔌 API

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
POST /api/auth/logout
```

### Private reports

```text
GET    /api/persons
POST   /api/persons
GET    /api/persons/[id]
PATCH  /api/persons/[id]
DELETE /api/persons/[id]
```

### Public reports

```text
GET /api/public/persons
GET /api/public/persons/[id]
```

Additional endpoints include:

```text
GET /api/health
GET /api/stats
GET /api/seed
```

---

## 🗄️ Database Model

The main application tables are:

### `users`

Stores user accounts and roles.

```text
id
name
email
password_hash
role
created_at
```

### `lost_persons`

Stores missing-person reports and their ownership.

```text
id
user_id
full_name
age
gender
height
complexion
identifying_marks
photo_url
last_seen_location
last_seen_date
clothing_description
status
description
reporter_name
reporter_relation
contact_phone
contact_email
created_at
updated_at
```

The `user_id` field connects each report to its owner and is used for server-side ownership checks.

---

## 🔐 Authorization Flow

```text
                    ┌──────────────┐
                    │   User Login │
                    └──────┬───────┘
                           │
                           ▼
                  HTTP-only JWT Cookie
                           │
                           ▼
                    ┌──────────────┐
                    │ Auth / Server│
                    │ Authorization│
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             ▼             ▼             ▼
          FINDER       REPORTER        ADMIN
             │             │             │
        Read only     Own reports    Full access
                                      + status
```

The client is never trusted for ownership. The API checks the authenticated user's database ID against the report's `user_id`.

---

## 🏗️ Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── persons/
│   │   ├── public/
│   │   ├── health/
│   │   ├── seed/
│   │   └── stats/
│   ├── browse/
│   ├── dashboard/
│   ├── login/
│   └── my-reports/
│
├── components/
│
├── db/
│   ├── index.ts
│   └── schema.ts
│
└── lib/
    └── auth.ts
```

---

## 💻 Run Locally

### Requirements

- Node.js 20+
- npm
- PostgreSQL

### 1. Clone

```bash
git clone https://github.com/kishan-sip-it/LPFinder.git
cd LPFinder
```

### 2. Install

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@127.0.0.1:5432/find_db
AUTH_SECRET=replace-with-a-long-random-secret
```

Never commit `.env.local`, database passwords, or production secrets.

### 4. Start development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Production build

```bash
npm run build
npm run start
```

---

## 📜 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Create production build
npm run start     # Start production server
npm run lint      # Run ESLint
npm run typecheck # Run TypeScript checks
```

---

## 🌍 Deployment Architecture

```text
                    GitHub
              kishan-sip-it/LPFinder
                       │
                       ▼
                  ┌─────────┐
                  │  Render │
                  │ Next.js │
                  └────┬────┘
                       │
                       │ DATABASE_URL
                       ▼
                ┌────────────┐
                │  Supabase  │
                │ PostgreSQL │
                └────────────┘
```

**Live application:** https://lpfinder.onrender.com/

---

## 🧪 Current Project Status

The current milestone is complete:

- ✅ Public browse and detail pages
- ✅ Authentication
- ✅ RBAC foundation
- ✅ Finder / Reporter / Admin roles
- ✅ Ownership access control
- ✅ Server-side authorization
- ✅ Admin-only case status changes
- ✅ My Reports
- ✅ Redundant dashboard listing removed
- ✅ Production build verified
- ✅ Supabase production database configured
- ✅ Render deployment configured

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run the build and type checks.
5. Open a pull request.

Before submitting changes:

```bash
npm run build
npm run typecheck
```

---

## 📂 Repository

**GitHub:**
https://github.com/kishan-sip-it/LPFinder

**Live Demo:**
https://lpfinder.onrender.com/

---

<div align="center">

### ❤️ Built with the goal of helping people find missing loved ones and reunite families.

**[🔎 Open LFPFinder](https://lpfinder.onrender.com/)**

</div>
