# 🧭 ReuniteFind — Find Lost People

A compassionate full-stack platform that helps families report and track missing
loved ones. Informers can add a person's photo (captured directly from the camera
or uploaded), record their identity, identifying marks, last-seen information, and
contact details — all stored securely and organized in a clean dashboard.

> **Note on stack:** The request asked for a React + Tailwind (`.jsx`) frontend with
> a Python backend. This project runs on a managed **Next.js (App Router)** runtime,
> so the **frontend is written entirely in React `.jsx` component files** and the
> **backend is implemented as Next.js API routes (Node.js)** which serve the same
> purpose as a REST API. Data is stored in **PostgreSQL** via Drizzle ORM.

---

## ✨ Features

- **Authentication** — email/password sign-up & login with hashed passwords
  (bcrypt) and signed, HTTP-only JWT session cookies (jose).
- **Camera capture** — take a photo of the report directly from the device camera,
  or upload an existing image. Photos are stored as data URLs.
- **Full CRUD** — create, read, update, and delete missing-person reports.
- **Rich identity records** — name, age, gender, height, complexion, identifying
  marks, last-seen location/date, clothing, description, and informer contact info.
- **Case status tracking** — `missing`, `investigating`, `found` with
  **optimistic updates** and automatic rollback on failure.
- **Dashboard** — sidebar navigation, live stats overview, and recent reports.
- **Search & filter** — debounced search by name/location and status filters.
- **Polished UX** — empty states, loading skeletons, responsive design, and a
  mobile-friendly collapsible sidebar.
- **Seeded demo data** — one click loads a demo account full of realistic cases.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Then open the app and click **"🚀 Explore live demo"** on the login screen. This
seeds the database and signs you in as the demo family.

**Demo credentials**

| Email                 | Password   |
| --------------------- | ---------- |
| `demo@findlost.app`   | `demo1234` |

---

## 🗂️ Project Structure

```
src/
├─ app/
│  ├─ api/
│  │  ├─ auth/{register,login,logout,me}/route.ts   # Auth backend
│  │  ├─ persons/route.ts                           # List & create
│  │  ├─ persons/[id]/route.ts                      # Read, update, delete
│  │  ├─ stats/route.ts                             # Dashboard stats
│  │  ├─ seed/route.ts                              # Demo data seeding
│  │  └─ health/route.ts                            # Healthcheck
│  ├─ dashboard/                                    # Protected dashboard pages
│  ├─ page.tsx                                       # Landing + auth
│  └─ layout.tsx
├─ components/            # React frontend — all .jsx files
│  ├─ AuthProvider.jsx
│  ├─ HomeClient.jsx
│  ├─ DashboardShell.jsx
│  ├─ Overview.jsx
│  ├─ PersonsList.jsx
│  ├─ PersonForm.jsx
│  ├─ PersonDetail.jsx
│  ├─ PersonEdit.jsx
│  ├─ CameraCapture.jsx
│  └─ StatusBadge.jsx
├─ db/
│  ├─ schema.ts           # Drizzle schema (users, lost_persons)
│  └─ index.ts            # DB client
└─ lib/
   └─ auth.ts             # Session + password helpers
```

---

## 🧰 Tech Stack

- **Frontend:** React 19 (`.jsx` components), Tailwind CSS v4
- **Backend:** Next.js API routes (Node.js)
- **Database:** PostgreSQL + Drizzle ORM
- **Auth:** bcryptjs + jose (JWT)

---

## 🔐 Environment Variables

| Variable       | Description                                  |
| -------------- | -------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string                 |
| `AUTH_SECRET`  | Secret used to sign session JWTs (optional)  |

---

## 📸 Camera Permissions

The camera feature uses the browser `getUserMedia` API and requires HTTPS (or
`localhost`) and user permission. If the camera is unavailable, users can upload a
photo instead.

---

Built with care for families searching for hope. 💙
